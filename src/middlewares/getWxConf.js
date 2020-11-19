/**
 * @description 获取微信 jssdk 配置信息
 * @author 双越
 */

const { genWxJsSdkMainConf } = require('../controller/wx')
const { isPrd } = require('../utils/env')

/**
 * 获取微信 jssdk 配置信息
 * @param {object} ctx ctx
 * @param {Function} next next
 */
async function getWxConf(ctx, next) {
    let url = ctx.href // 完整 url

    if (isPrd) {
        // 线上环境，统一用 https 协议
        // node 启动的是 http 服务，所以 url 里默认是 http 协议，得手动改一下
        url = url.replace('http:', 'https:')
    }

    const conf = await genWxJsSdkMainConf(url)

    // 复制给 ctx
    ctx.wxJsSdkMainConf = conf

    await next()
}

module.exports = getWxConf
