/**
 * @description 设置缓存
 * @author 双越
 */

const { cacheSet, cacheGet } = require('./index')

// cache key 前缀，重要！！否则数据容易混乱
// 必须和 biz-editor-server 保持一直，且必须链接一个 redis-server
const PREFIX = 'publishWorkId-'

/**
 * 设置缓存，下次再访问时，尽量使用缓存（作品被重新发布时，会清空该缓存）
 * @param {string} id 作品 id
 * @param {object} work 作品的详细数据
 */
function publishWorkSetCache(id, work) {
    const key = `${PREFIX}${id}`
    cacheSet(
        key,
        work,
        365 * 24 * 60 * 60 // timeout 设置为 1 年，单位是 s
    )
}

/**
 * 访问缓存
 * @param {string} id 作品 id
 * @return {object|null} 作品内容
 */
async function publishWorkGetCache(id, uuid) {
    const key = `${PREFIX}${id}`
    const work = await cacheGet(key)
    if (!work) return null // 无缓存
    return work // cacheGet 中有 JSON.parse
}

module.exports = {
    publishWorkSetCache,
    publishWorkGetCache,
}
