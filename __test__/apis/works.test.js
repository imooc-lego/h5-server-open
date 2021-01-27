/**
 * @description 测试作品网页
 * @author 双越
 */

const { get } = require('./_server')
const { WORK_URL, WORK_PREVIEW_URL } = require('../config/url')

describe('作品页面', () => {
    test('预览作品', async () => {
        const res = await get(WORK_PREVIEW_URL)
        const is404 = /<h1.*?>404<\/h1>/.test(res)
        expect(is404).toBe(false)

        const isPreview = /<div.*?>仅供预览，请发布作品后，再正式使用<\/div>/.test(res)
        expect(isPreview).toBe(true)
    })
    test('发布的作品', async () => {
        const res = await get(WORK_URL)
        const is404 = /<h1.*?>404<\/h1>/.test(res)
        expect(is404).toBe(false)
    })
})
