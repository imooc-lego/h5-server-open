/**
 * @description 微信 jssdk 相关接口
 * @author 双越
 */

const axios = require('axios')
const { wxConf } = require('../config/index')

const { appId, secret } = wxConf

/**
 * 获取微信公众号 access_token
 */
async function genWxAccessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`
    const response = await axios.get(url)
    const result = response.data || {}
    // result 正确格式 { access_token: 'xxx', expires_in: 7200 } ，有效期 2h

    if (result.access_token && result.expires_in) {
        console.log('生成微信 access_token 成功')
        return result
    }

    console.error('生成微信 access_token 错误', JSON.stringify(result))
    return null
}

/**
 * 获取微信公众号 ticket
 * @param {string} accessToken access_token
 */
async function genWxTicket(accessToken) {
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
    const response = await axios.get(url)
    const result = response.data || {}
    // result 正确格式 { errcode: 0, errmsg: 'ok', ticket: 'xxx', expires_in: 7200 } 有效期 2h

    if (result.errcode === 0) {
        console.log('生成微信 ticket 成功')
        return result
    }

    console.error('生成微信 ticket 错误', JSON.stringify(result))
    return null
}

module.exports = {
    genWxAccessToken,
    genWxTicket,
}
