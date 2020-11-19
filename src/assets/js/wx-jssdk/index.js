/**
 * @description 微信 jssdk 配置
 * @author 双越
 */

import setWxShare from './share'

const { location, wx, WX_JSSDK_MAIN_CONF } = window

// 配置
function main() {
    // 有些页面不用微信 jssdk ，如 404 error
    if (WX_JSSDK_MAIN_CONF == null || wx == null) return

    // 配置
    wx.config({
        debug: location.search.indexOf('wx_js_sdk_debug') > 0, // query 中有 wx_js_sdk_debug ，则为 debug 模式
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
        ...WX_JSSDK_MAIN_CONF,
    })

    // 错误监控
    wx.error(err => {
        console.error('wx jssdk error', err)
    })

    // 各个功能
    wx.ready(() => {
        setWxShare(wx) // 设置分享
    })
}

main()
