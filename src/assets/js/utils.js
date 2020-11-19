/**
 * @description 工具函数
 * @author 双越
 */

/**
 * 根据正则表达式来获取匹配的文字
 * @param {string} str str
 * @param {RegExp} reg reg
 */
export function getRegStr(str, reg) {
    if (!str) return ''
    const arr = str.match(reg) || []
    return arr[1] || ''
}

/**
 * @description 获取 url 参数的 id
 */
export function getWorkId() {
    const { location } = window
    const id = getRegStr(location.pathname, /\/(\w+)?-\w+/)
    return id
}

/**
 * @description 获取 url 参数的 channel
 */
export function getChannel() {
    const { location } = window
    const channel = getRegStr(location.search, /channel=(\w+)/)
    return channel
}

// ENV： webpack 配置的环境变量
export const isPrd = ENV === 'production' // eslint-disable-line
