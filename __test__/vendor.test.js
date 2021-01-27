/**
 * @description 第三方服务 test
 * @author 双越
 */

const path = require('path')
const { uploadFile, isExistFile } = require('../src/vendor/aliyunOSS')

describe('第三方 API', () => {
    const FILE_NAME = 'h5-server-test-img.jpeg'

    test('上传文件到阿里云 OSS', async () => {
        const filePath = path.resolve(__dirname, 'files', 'h5-server-test-img.jpeg')

        const url = await uploadFile(FILE_NAME, filePath)
        expect(url).not.toBeNull()
        expect(url.lastIndexOf(FILE_NAME)).toBeGreaterThan(0)
    })

    test('上传到阿里云 OSS 的文件存在', async () => {
        const res = await isExistFile(FILE_NAME)
        expect(res).toBe(true)
    })
})
