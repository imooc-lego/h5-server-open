/**
 * @description 微信 jssdk 配置相关缓存
 * @author 双越
 */

const { cacheSet, cacheGet } = require('./index')

// cache key 前缀，重要！！否则数据容易混乱
const PREFIX = 'wxJsSdkConf-'

// cache keys
const ACCESS_TOKEN_KEY = `${PREFIX}access_token`
const TICKET_KEY = `${PREFIX}ticket`

/**
 * 获取 wx access_token
 */
async function wxAccessTokenGetCache() {
    const token = await cacheGet(ACCESS_TOKEN_KEY)
    return token
}

/**
 * 设置 wx access_token
 * @param {string} val access_token 的值
 * @param {number} timeout 过期时间，单位 s
 */
function wxAccessTokenSetCache(val, timeout) {
    cacheSet(ACCESS_TOKEN_KEY, val, timeout)
}

/**
 * 获取 wx ticket
 */
async function wxTicketGetCache() {
    const ticket = await cacheGet(TICKET_KEY)
    return ticket
}

/**
 * 设置 wx ticket
 * @param {string} val ticket 值
 * @param {number} timeout 过期时间，单位 s
 */
function wxTicketSetCache(val, timeout) {
    cacheSet(TICKET_KEY, val, timeout)
}

module.exports = {
    wxAccessTokenGetCache,
    wxAccessTokenSetCache,
    wxTicketGetCache,
    wxTicketSetCache,
}
