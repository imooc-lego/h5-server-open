/**
 * @description 检查 404 error
 * @author 双越
 */

const { get } = require('./_server')

describe('error 和 404', () => {
    test('404', async () => {
        const res = await get('/xxx') // 随便一个存在的路由
        const is404 = /<h1.*?>404<\/h1>/.test(res)
        expect(is404).toBe(true)
    })

    test('error page', async () => {
        const res = await get('/error') // 随便一个存在的路由
        const isError = /<h1.*?>500<\/h1>/.test(res)
        expect(isError).toBe(true)
    })
})
