/**
 * 验证是否是plain objext
 * @param {any} obj
 * @returns
 */
export function isPlainObject(obj) {
    if (typeof obj !== 'object') return false;
    return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * 生成redux初始dispatch type 的值
 * @param {number} length 字符长度
 * @returns
 */
export function getRandomString(length) {
    return Math.random().toString(36).substr(2, length).split('').join('.');
}
