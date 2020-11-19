/**
 * @description 微信分享
 * @author 双越
 */

const { MAIN_SHARE_CONF, location } = window

// 设置微信分享
function setWxShare(wx) {
    if (wx == null || MAIN_SHARE_CONF == null) return

    const { title, desc, imgUrl } = MAIN_SHARE_CONF

    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData({
        title,
        desc,
        link: location.href,
        imgUrl,
        // success: () => {}
    })

    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    wx.updateTimelineShareData({
        title,
        link: location.href,
        imgUrl,
        // success: () => {}
    })
}

export default setWxShare
