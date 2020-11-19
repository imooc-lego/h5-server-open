/**
 * @description 配置
 * @author 双越
 */

import { isPrd } from './utils'

// 自定义事件统计 server
let _eventStatServer = 'http://182.92.xxx.xxx:8083/event.png'

if (isPrd) {
    _eventStatServer = 'https://statistic.imooc-lego.com/event.png'
}

export const eventStatServer = _eventStatServer
