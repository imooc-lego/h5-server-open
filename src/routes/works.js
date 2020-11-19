/**
 * @description works router
 * @author 双越
 */

const router = require('koa-router')()
const { splitIdAndUuid } = require('../utils/util')
const { findPublishWork, findPreviewWork } = require('../controller/works')
const { propsToStyle, getLegoComponentsHtml } = require('../controller/render')
const getWxConf = require('../middlewares/getWxConf')
const { DEFAULT_SHARE_IMG } = require('../config/constant')

// 路由前缀
router.prefix('/p')

/**
 * 渲染页面
 * @param {object} ctx ctx
 * @param {object} work work 信息
 * @param {string} pageType 'publish'/'preview'
 */
async function renderPage(ctx, work, pageType) {
    const { title, desc = '', content = {} } = work
    const { props = {}, components = [], setting = {} } = content
    const { shareImg = DEFAULT_SHARE_IMG } = setting

    const bodyStyle = propsToStyle(props)
    const componentsHtml = await getLegoComponentsHtml(components)

    // 组件的事件
    const eventInfoList = []
    components.forEach(component => {
        // component 中事件的数据格式： { props: { actionType: "to", url: 'https://www.baidu.com' } }
        const { id, props: componentProps = {} } = component
        const { actionType, url } = componentProps
        if (actionType) {
            eventInfoList.push({
                id,
                actionType,
                url,
            })
        }
    })

    // 微信 jssdk 配置，参考 `middlewares/getWxConf`
    const { wxJsSdkMainConf = {} } = ctx
    const mainShareConf = {
        title,
        desc,
        imgUrl: shareImg,
    }

    // 渲染页面，用自定义的 renderWithAssets
    await ctx.renderWithAssets('work', {
        title,
        desc,
        bodyStyle,
        content: componentsHtml,
        pageType,
        eventInfoList: JSON.stringify(eventInfoList), // 事件
        wxJsSdkMainConf: JSON.stringify(wxJsSdkMainConf), // 微信 jssdk 配置
        mainShareConf: JSON.stringify(mainShareConf), // 微信分享配置
    })
}

// 线上发布的 h5
router.get('/:idAndUuid', getWxConf, async ctx => {
    const { idAndUuid } = ctx.params
    const { id, uuid } = splitIdAndUuid(idAndUuid)

    const work = await findPublishWork(id, uuid)
    if (work == null) {
        // 返回 404，用自定义的 renderWithAssets
        await ctx.renderWithAssets('404', { pageType: '404' })
        return
    }
    if (work.isTemplate) {
        // 模板
        await renderPage(ctx, work, 'template')
    } else {
        // 正常页面
        await renderPage(ctx, work, 'publish')
    }
})

// 预览 API
router.get('/preview/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params
    const { id, uuid } = splitIdAndUuid(idAndUuid)

    // 获取预览数据
    const work = await findPreviewWork(id, uuid)
    if (work == null) {
        // 返回 404，用自定义的 renderWithAssets
        await ctx.renderWithAssets('404', { pageType: '404' })
        return
    }

    // 渲染页面
    await renderPage(ctx, work, 'preview')
})

module.exports = router
