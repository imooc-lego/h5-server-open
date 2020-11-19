/**
 * @description 作品 Model
 * @author 双越
 */

const seq = require('../db/seq/seq')
const { INTEGER, STRING, BOOLEAN } = require('../db/seq/types')

// 作品
// 要和 biz-editor-server 的 Model 保持一致
const Work = seq.define('work', {
    uuid: {
        type: STRING,
        allowNUll: false,
        unique: 'uuid', // 不能使用 unique: true, https://www.chaoswork.cn/1064.html
        comment: 'uuid，h5 url 中使用，隐藏真正的 id，避免被爬虫',
    },
    title: {
        type: STRING,
        allowNUll: false,
        comment: '标题',
    },
    desc: {
        type: STRING,
        comment: '副标题',
    },
    contentId: {
        type: STRING,
        allowNUll: false,
        unique: 'contentId',
        comment: '内容 id ，内容存储在 mongodb 中',
    },
    publishContentId: {
        type: STRING,
        unique: 'publishContentId',
        comment: '发布内容 id ，内容存储在 mongodb 中，未发布的为空',
    },
    author: {
        type: STRING,
        allowNUll: false,
        comment: '作者 username',
    },
    coverImg: {
        type: STRING,
        comment: '封面图片 url',
    },
    isTemplate: {
        type: BOOLEAN,
        allowNUll: false,
        defaultValue: false,
        comment: '是否是模板',
    },
    status: {
        type: INTEGER,
        allowNUll: false,
        defaultValue: 1,
        comment: '状态：0-删除，1-未发布，2-发布',
    },
    copiedCount: {
        type: INTEGER,
        allowNUll: false,
        defaultValue: 0,
        comment: '被复制的次数',
    },
})

module.exports = Work
