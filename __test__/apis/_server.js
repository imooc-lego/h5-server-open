/**
 * @description jest server
 * @author 双越老师
 */

const axios = require('axios')
const supertest = require('supertest')
const { isTestRemote, isTestLocal } = require('../../src/utils/env')

let request
if (isTestLocal) {
    // 本地测试才使用 supertest 。src/app 也要在此时引用，否则在 github actions 中初始化时，会报数据库连接错误。
    const server = require('../../src/app').callback() // eslint-disable-line
    request = supertest(server)
}

// 测试机 host
const REMOTE_HOST = 'http://182.92.168.192:8082'

/**
 * 发送请求
 * @param {string} method method
 * @param {string} url url
 * @param {object} bodyOrParams body / query
 * @param {object} headers headers
 */
async function ajax(method = 'get', url = '', bodyOrParams = {}, headers = {}) {
    let result

    // 本地测试，使用 supertest
    if (isTestLocal) {
        let res
        if (method === 'get') {
            res = await request[method](url).query(bodyOrParams).set(headers)
        } else {
            res = await request[method](url).send(bodyOrParams).set(headers)
        }

        const jsonData = res.body
        if (jsonData.errno != null) {
            return jsonData // API 返回 JSON
        }
        return res.text // 网页返回 html 字符串
    }

    // 远程测试，使用 axios ，访问测试机
    if (isTestRemote) {
        const remoteUrl = `${REMOTE_HOST}${url}`
        const conf = {
            method,
            url: remoteUrl,
            headers,
        }
        if (method === 'get') {
            conf.params = bodyOrParams
        } else {
            conf.data = bodyOrParams
        }
        const res = await axios(conf)
        result = res.data // axios 能自动识别，API 就返回 JSON ，网页就返回 html 字符串
    }

    // 返回结果
    return result // { data, errno }
}

module.exports = {
    async get(url, params) {
        const res = await ajax('get', url, params)
        return res
    },
}
