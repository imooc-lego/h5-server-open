/**
 * @description 跳转事件
 * @author 双越
 */

const { location } = window

/**
 * 生成 url 拼接 querystring
 * @param {string} url url
 * @param {string} querystring querystring
 */
function genUrlWithQuery(url, querystring) {
    // 当前页面没有 url 参数
    if (!querystring) {
        return url
    }

    // 考虑 hash
    const [urlWithoutHash, hash = ''] = url.split('#')

    // 当前页面有 url 参数
    let urlWithQuery = ''
    if (urlWithoutHash.indexOf('?') < 0) {
        // 目标 url 无参数
        urlWithQuery = `${urlWithoutHash}?${querystring}`
    } else {
        // 目标 url 有参数
        urlWithQuery = `${urlWithoutHash}&${querystring}`
    }

    // 拼接 hash
    if (hash) return `${urlWithQuery}#${hash}`

    return urlWithQuery
}

/**
 * 跳转 url ，带着当前的 url 参数
 * @param {string} url url
 */
function jumpTo(url = '') {
    if (!url) return

    const { search } = location
    const querystring = search.slice(1) // 去掉开头的 ?

    const targetUrl = genUrlWithQuery(url, querystring)

    location.href = targetUrl
}

export default jumpTo
