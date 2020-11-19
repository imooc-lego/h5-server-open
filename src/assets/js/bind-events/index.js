/**
 * @description 绑定事件
 * @author 双越
 */

import jumpTo from './jumpTo'

// 事件信息列表
const { EVENT_INFO_LIST = [] } = window

function bindEvent() {
    EVENT_INFO_LIST.forEach((eventInfo = {}) => {
        // eventInfo 数据格式 {id: "345", actionType: "to", url: "http://www.baidu.com"}
        const { id, actionType, url } = eventInfo
        if (!actionType || !url) return

        // 绑定事件
        const elemId = `component-${id}` // 元素 id 有前缀
        const elem = document.getElementById(elemId)
        elem.addEventListener('click', () => {
            if (actionType === 'to') {
                jumpTo(url) // 跳转 url
            }
            // 还可以继续扩展其他的 actionType
        })
    })
}

bindEvent()
