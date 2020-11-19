/**
 * @description works service
 * @author 双越
 */

const _ = require('lodash')
const { WorkContentModel, WorkPublishContentModel } = require('../models/WorkContentModel')
const WorksModel = require('../models/WorksModel')

/**
 * 查询单个作品
 * @param {object} whereOpt 查询条件
 * @param {boolean} publish 是否是发布的项目
 */
async function findOneWorkService(whereOpt = {}, publish = true) {
    if (_.isEmpty(whereOpt)) return null // 无查询条件

    // 查询作品记录 - mysql
    const result = await WorksModel.findOne({
        // 符合 WorksModel 的属性规则
        where: whereOpt,
    })

    if (result == null) {
        // 未查到
        return result
    }
    const work = result.dataValues

    // 查询作品内容 - mongodb
    const { publishContentId, contentId } = work
    let content
    if (publish) {
        // 发布的项目
        if (!publishContentId) return null
        content = await WorkPublishContentModel.findById(publishContentId)
    } else {
        // 未发布的项目，预览
        if (!contentId) return null
        content = await WorkContentModel.findById(contentId)
    }

    // 返回查询结果
    return {
        ...work,
        content, // 拼接上作品内容
    }
}

module.exports = {
    findOneWorkService,
}
