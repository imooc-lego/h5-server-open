/**
 * @description 统计 PV
 * @author 双越
 */

import { getWorkId, getChannel } from '../utils'
import sendEvent from './sendEvent'

/**
 * @description 统计 pv 和渠道 pv
 */
function statPV() {
    let action = 'pv'
    if (window.PAGE_TYPE === '404') {
        action = '404'
    }
    if (window.PAGE_TYPE === 'preview') {
        action = 'preview'
    }
    if (window.PAGE_TYPE === 'template') {
        action = 'template'
    }

    // 获取 id 和 channel
    const id = getWorkId()
    const channel = getChannel()

    // 发送统计
    sendEvent({
        category: 'h5',
        action,
        label: id,
        value: channel,
    })
}

export default statPV
