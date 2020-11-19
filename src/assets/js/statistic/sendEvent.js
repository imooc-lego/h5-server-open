import { eventStatServer } from '../conf'

/**
 * 发送 event 统计
 * @param {object} data data
 */
function sendEvent(data = {}) {
    // 拼接参数
    const keys = Object.keys(data)
    const arr = keys.map(key => `${key}=${data[key]}`)
    if (arr.length === 0) {
        return // 没有参数，则不发送
    }

    // 拼接 url
    const url = `${eventStatServer}?${arr.join('&')}`

    // 发送请求
    const img = document.createElement('img')
    img.src = url
}

export default sendEvent
