/**
 * @description jest demo
 * @author 双越
 */

const { splitIdAndUuid } = require('../src/utils/util')

describe('工具函数', () => {
    test('拆分 id 和 uuid', () => {
        // 传入空字符串
        const result1 = splitIdAndUuid('')
        expect(result1).toEqual({ id: '', uuid: '' })

        // 没有 `-` 间隔符号
        const result2 = splitIdAndUuid('aaabbb')
        expect(result2).toEqual({ id: '', uuid: '' })

        const result3 = splitIdAndUuid('aaa-bbb')
        expect(result3).toEqual({ id: 'aaa', uuid: 'bbb' })

        const result4 = splitIdAndUuid('aaa-bbb-ccc-ddd')
        expect(result4).toEqual({ id: 'aaa', uuid: 'bbb-ccc-ddd' })
    })
})
