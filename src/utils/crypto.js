/**
 * @description 加密
 * @author 双越
 */

const { createHash } = require('crypto')

/**
 * 统一加密算法
 * @param {string} algorithm 加密算法
 * @param {string} content 源内容
 */
function encrypt(algorithm, content) {
    const hash = createHash(algorithm)
    hash.update(content)
    return hash.digest('hex')
}

/**
 * sha1 加密
 * @param {string} content 源内容
 */
function sha1(content) {
    return encrypt('sha1', content)
}

/**
 * md5 加密
 * @param {string} content 源内容
 */
function md5(content) {
    return encrypt('md5', content)
}

module.exports = {
    sha1,
    md5,
}
