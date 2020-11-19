/**
 * @description 渲染相关的逻辑
 * @author 双越
 */

const _ = require('lodash')
const { createSSRApp, h } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const LegoComponents = require('lego-components')

/**
 * props 转换为 style
 * @param {object} props props
 */
function propsToStyle(props = {}) {
    if (_.isEmpty(props)) return ''
    const keys = Object.keys(props)

    const styleArr = keys.map(key => {
        const formatKey = key.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`) // 'fontSize' -> 'font-size'
        const value = props[key]
        return `${formatKey}: ${value}`
    })

    return styleArr.join(';')
}

/**
 * 将各个组件属性中的 px 改为 vw ，为了兼容各个手机尺寸
 * 因为画布是按照宽度 320px 计算的
 * @param {Array} components 组件列表
 */
function px2vw(components = []) {
    const reg = /^(\d+(\.\d+)?)px$/ // 验证格式 '10px' '9.5px'

    // 遍历组件
    components.forEach((component = {}) => {
        const props = component.props || {}

        // 遍历一个组件的属性
        _.forEach(props, (val, key) => {
            if (typeof val !== 'string') {
                return
            }
            if (reg.test(val) === false) {
                // val 中没有 px
                return
            }
            // val 中有 pv
            const arr = val.match(reg) || [] // 如 ["9.5px", "9.5", ".5", index: 0, input: "10px"]
            const numStr = arr[1] // 取出 '9.5'
            const num = parseFloat(numStr, 10)
            // 计算出 vw ，重新赋值
            const vwNum = num / (320 / 100) // 画布宽度是 320px ，这样计算出 vw
            props[key] = `${vwNum}vw`
        })
    })
}

/**
 * 渲染 lego-components
 * @param {Array} components 组件列表
 */
async function getLegoComponentsHtml(components = []) {
    // 转换 px 到 vw ，以适应所有移动端手机尺寸
    px2vw(components)

    // vue ssr
    const app = createSSRApp({
        data: () => {
            const pageData = {
                // 页面上面一个个组件的属性
                components,
            }
            return {
                pageData,
            }
        },
        template: `<final-page :components="pageData.components"></final-page>`,
    })
    app.use(LegoComponents) // 注册组件
    const html = await renderToString(app)
    return html
}

module.exports = {
    propsToStyle,
    getLegoComponentsHtml,
}
