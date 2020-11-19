/**
 * @description controller works
 * @author 双越
 */

const { findOneWorkService } = require('../service/works')
const { publishWorkSetCache, publishWorkGetCache } = require('../cache/works')

/**
 * 查询发布的作品
 * @param {string} id id
 * @param {string} uuid uuid
 */
async function findPublishWork(id, uuid) {
    if (!id || !uuid) return null

    let work

    // 尝试访问缓存
    work = await publishWorkGetCache(id)
    if (work != null) {
        // 有缓存数据
        if (work.uuid !== uuid) {
            // 缓存数据，和传入的 uuid 不匹配（可能传入的 uuid 是假的）
            work = null
        }
    }

    // 无缓存，访问数据库
    if (work == null) {
        try {
            work = await findOneWorkService({
                id,
                uuid,
                status: 2, // 只查询已发布的
            })
        } catch (ex) {
            console.error('查询发布作品', ex)
            return null
        }
    }
    if (work == null) return null

    // 设置缓存
    publishWorkSetCache(id, work)

    return work
}

/**
 * 查询预览作品
 * @param {string}} id id
 * @param {string} uuid uuid
 */
async function findPreviewWork(id, uuid) {
    if (!id || !uuid) return null

    // 预览的流量较小，要求及时更新。所以不用缓存，直接访问数据库。
    let work
    try {
        work = await findOneWorkService(
            {
                id,
                uuid,
            },
            false
        )
    } catch (ex) {
        console.error('查询预览作品', ex)
        return null
    }
    if (work == null) return null

    return work
}

module.exports = {
    findPublishWork,
    findPreviewWork,
}
