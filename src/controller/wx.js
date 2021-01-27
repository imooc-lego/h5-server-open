/**
 * @description 微信 jssdk 相关
 * @author 双越
 */

/**
 * 参考文档
 * 获取微信 access token https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 * 获取 ticket，生成签名和配置 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
 */

const { isTest, isDev } = require('../utils/env')
const {
    wxAccessTokenGetCache,
    wxAccessTokenSetCache,
    wxTicketGetCache,
    wxTicketSetCache,
} = require('../cache/wx')
const { genWxAccessToken, genWxTicket } = require('../vendor/wx')
const { sha1 } = require('../utils/crypto')
const { wxConf } = require('../config/index')

const { appId } = wxConf

/**
 * 获取微信 access token
 */
async function getAccessToken() {
    if (isDev || isTest) return '' // dev 环境无法获取 access token ，IP 白名单限制

    // 尝试从缓存获取
    const token = await wxAccessTokenGetCache()
    if (token) {
        console.log('从缓存获取 wx access_token 成功', token)
        return token
    }

    // 缓存中没有，则重新生成
    const res = await genWxAccessToken()

    // 生成失败
    if (res == null) return ''

    // 生成成功
    const { access_token: accessToken, expires_in: expiresIn } = res
    console.log('重新生成 wx access_token 成功', accessToken)

    // 记录缓存
    wxAccessTokenSetCache(accessToken, expiresIn - 2 * 60) // 提前 2 分钟失效，防止出现边界情况

    // 返回
    return accessToken
}

/**
 * 获取 ticket
 */
async function getTicket() {
    if (isDev || isTest) return '' // dev 环境无法获取 ticket ，IP 白名单限制

    // 尝试从缓存中获取
    const ticketFromCache = await wxTicketGetCache()
    if (ticketFromCache) {
        console.log('从缓存获取 wx ticket 成功', ticketFromCache)
        return ticketFromCache
    }

    // 缓存中没有，则重新生成
    const accessToken = await getAccessToken()
    const res = await genWxTicket(accessToken)

    // 生成失败
    if (res == null) return ''

    // 生成成功
    const { ticket, expires_in: expiresIn } = res
    console.log('重新生成 wx ticket 成功', ticket)

    // 记录缓存
    wxTicketSetCache(ticket, expiresIn - 2 * 60) // 提前 2 分钟失效，防止出现边界情况

    // 返回
    return ticket
}

/**
 * 生成签名
 * @param {string} ticket ticket
 * @param {string} nonceStr 随机字符串
 * @param {string} timestamp 时间戳
 * @param {string} url 当前完整 url
 */
function genSignature(ticket, nonceStr, timestamp, url) {
    // key1=val1&key2=val2 格式，key 的值和顺序必须如下
    const str = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
    const sign = sha1(str)
    if (!isTest) {
        console.log('==================== wx jssdk config start ====================')
        console.log('str', str)
        console.log('sign', sign)
    }
    return sign
}

/**
 * 生成微信 jssdk 主要的 config（没有 debug wxJsSdkConf）
 * @param {string} url 当前完整 url
 */
async function genWxJsSdkMainConf(url = '') {
    const ticket = await getTicket()
    const timestamp = parseInt(Date.now() / 1000, 10) // 单位：秒，去掉后三位（默认单位是毫秒）
    const nonceStr = Math.random().toString(36).slice(-8)
    const signature = genSignature(ticket, nonceStr, timestamp, url)

    // 非线上环境，打印信息，供 debug
    if (!isTest) {
        console.log('ticket', ticket)
        console.log('nonceStr', nonceStr)
        console.log('timestamp', timestamp)
        console.log('url', url)
        console.log('==================== wx jssdk config end ====================')
    }

    return {
        appId,
        timestamp, // 数字格式
        nonceStr,
        signature,
    }
}

module.exports = {
    genWxJsSdkMainConf,
}
