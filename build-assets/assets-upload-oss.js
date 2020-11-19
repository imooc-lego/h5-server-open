/**
 * @description 静态资源上传到 阿里云 OSS
 * @author 双越
 */

const path = require('path')
const fse = require('fs-extra')
const { uploadFile } = require('../src/vendor/aliyunOSS')

const publicPath = path.resolve(__dirname, '..', 'src', 'public')
const uploadPath = 'h5-assets'

async function main() {
    // 获取 src/public 下的所有文件
    const publicFiles = fse.readdirSync(publicPath)
    const files = publicFiles.filter(f => f !== 'favicon.ico') // 不上传 favicon.ico

    // 挨个上传
    const res = await Promise.all(
        files.map(fileName => {
            const filePath = path.join(publicPath, fileName)
            const name = `${uploadPath}/${fileName}` // 加一个统一的 folder
            return uploadFile(name, filePath)
        })
    )
    console.log('assets upload oss 上传成功', res)
}

main()
