/*
* 各种编码转换中文
* */

export const UNKNOWN = '未知';

/**
 * 性别
 * @param gender
 * @returns {*}
 */
export function filterGender(gender) {
    if (!gender) return UNKNOWN;

    const genders = {
        male: '男',
        female: '女',
        m: '男',
        f: '女',
        M: '男',
        F: '女',
    };

    return genders[gender] || UNKNOWN;
}
