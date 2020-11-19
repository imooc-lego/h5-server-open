/**
 * @description dev 配置
 * @author 双越
 */

module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'testdb',
    },

    // redis 连接配置
    redisConf: {
        port: '6379',
        host: '127.0.0.1',
    },

    // mysql 连接配置
    mysqlConf: {
        host: 'localhost',
        user: 'root',
        password: 'xxx',
        port: '3306',
        database: 'testdb',
    },

    // 阿里云 OSS 配置，Sam 老师提供
    aliyunOSSConf: {
        // 此处省略 N 行代码
    },
    // 阿里云 OSS CDN 配置，Sam 老师提供
    aliyunOSS_CDNHost: 'static-dev.imooc-lego.com',

    // 微信公众号配置
    // 在本地运行，由于微信 IP 白名单机制，可能运行不了。测试机和线上机是可以的，已添加白名单
    wxConf: {
        // 此处省略 N 行代码
    },
}
