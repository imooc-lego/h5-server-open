/**
 * @description render 时带着统一的 js 和 css
 * @author 双越
 */

const path = require('path')
const fse = require('fs-extra')
const { isDev } = require('../utils/env')
const { aliyunOSS_CDNHost: CDNHost } = require('../config/index')

const uploadPath = 'h5-assets' // oss 中 h5 静态资源的文件夹

// 获取 public 下的静态文件。初始化时就执行，而不是每次 req 时执行！！！
const files = fse.readdirSync(path.resolve(__dirname, '..', 'public'))
const cssFiles = files.filter(f => f.lastIndexOf('.css') > 0)
const jsFiles = files.filter(f => f.lastIndexOf('.js') > 0)
let cssLinks = []
let jsLinks = []

// dev 环境，直接用本地文件
cssLinks = cssFiles.map(f => `/${f}`)
jsLinks = jsFiles.map(f => `/${f}`)

// 非 dev 环境，加载 CDN 文件
if (!isDev) {
    cssLinks = cssFiles.map(f => `//${CDNHost}/${uploadPath}/${f}`)
    jsLinks = jsFiles.map(f => `//${CDNHost}/${uploadPath}/${f}`)
}

/**
 * renderWithAssets
 * @param {object} ctx ctx
 * @param {Function} next next
 */
async function renderWithAssets(ctx, next) {
    ctx.renderWithAssets = async (...args) => {
        // args 是数组，第一个参数是 path ，第二个参数是渲染数据
        if (!Array.isArray(args)) throw new Error('ctx.renderWithAssets 参数格式错误，不是数组')
        if (!args[0]) throw new Error('ctx.renderWithAssets 参数格式错误，args[0] 为空')
        if (typeof args[1] !== 'object') args[1] = {} // eslint-disable-line

        // 添加 js css 文件，变量对应到 views/layout.pug
        Object.assign(args[1], {
            ASSETS_CSS_FILES: cssLinks,
            ASSETS_JS_FILES: jsLinks,
        })

        // 借用自带的 ctx.render 来完成渲染
        await ctx.render.apply(null, args)
    }

    await next()
}

module.exports = renderWithAssets
