import { isPlainObject } from './utils/utils.js';
import actionTypes from './utils/actionTypes.js';

function validateReducers(reducers) {
    if (typeof reducers !== 'object') {
        throw new TypeError('reducers mast be an object');
    }
    if (!isPlainObject(reducers)) {
        throw new TypeError('reducers mast be a plain object');
    }

    //验证reduce的返回结果是不是undefined
    for (const key in reducers) {
        if (Object.hasOwnProperty.call(reducers, key)) {
            const reducer = reducers[key];
            let state = reducer(undefined, {
                type: actionTypes.INIT(),
            });
            if (state === undefined) {
                throw new TypeError('reducers must not return undefined');
            }
            state = reducer(undefined, {
                type: actionTypes.UNKNOWN(),
            });
            if (state === undefined) {
                throw new TypeError('reducers must not return undefined');
            }
        }
    }
}

export default function (reducers) {
    //1.验证
    validateReducers(reducers);
    //2.返回的是一个reducer函数
    return function (state = {}, action) {
        let newState = {}; //要返回的新的状态
        for (const key in reducers) {
            if (Object.hasOwnProperty.call(reducers, key)) {
                const reducer = reducers[key];
                newState[key] = reducer(state[key], action);
            }
        }
        return newState;
    };
}
