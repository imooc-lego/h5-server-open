/**
 * @description 工具函数
 * @author 双越
 */

const os = require('os')
const { stringify } = require('querystring')

module.exports = {
    // 判断 windows 系统
    isWindows: os.type().toLowerCase().indexOf('windows') >= 0,

    /**
     * 拆分 id 和 uuid
     * @param {string} str id 和 uuid 混合的字符串
     * @returns {object} { id, uuid }
     */
    splitIdAndUuid(str = '') {
        // str 格式如 id-uuid，其中 uuid 内可能还会有 -
        // str 如 'aaa-bbbb' 或者 'aaa-bbb-bbb-bbb-bbb'

        const result = { id: '', uuid: '' }

        // 判断格式
        if (!str) return result

        // 获取第一个 - 的 index
        const firstDashIndex = str.indexOf('-')
        if (firstDashIndex < 0) return result

        // 解析 id 和 uuid
        result.id = str.slice(0, firstDashIndex)
        result.uuid = str.slice(firstDashIndex + 1)
        return result
    },
}
