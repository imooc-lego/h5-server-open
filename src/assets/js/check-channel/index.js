/**
 * @description 检查 channel
 * @author 双越
 */

import { isPrd, getChannel } from '../utils'

const channel = getChannel()
const { PAGE_TYPE, alert } = window

function checkCheck() {
    if (channel) return

    if (PAGE_TYPE !== 'publish') return // 非线上的发布页面，则不检查

    const info = '页面 url 没有 channel ，会影响分渠道统计的数据'

    if (isPrd) {
        // 线上环境仅提醒，不影响页面正常浏览
        console.warn(info)
        return
    }

    // 其他情况，直接 alert
    alert(info)
}
checkCheck()
