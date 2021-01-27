/**
 * @description 测试的配置
 * @author 双越
 */

const { isTestRemote, isTestLocal } = require('../../src/utils/env')

let workUrl // 发布的作品 url
let workPreviewUrl // 预览作品

if (isTestLocal) {
    // 请确保该 url 能在本地访问（只要数据不是频繁的清理，维护成本就不高）
    workUrl = '/p/10-e5bb?channel=2'
    workPreviewUrl = '/p/preview/10-e5bb?channel=2'
}

if (isTestRemote) {
    // 请确保该 url 能在测试机被访问（只要数据不是频繁的清理，维护成本就不高）
    workUrl = '/p/85-8d14?channel=41'
    workPreviewUrl = '/p/preview/85-8d14?channel=41'
}

module.exports = {
    WORK_URL: workUrl,
    WORK_PREVIEW_URL: workPreviewUrl,
}
