import { isPlainObject, getRandomString } from './utils/utils.js';
import actionTypes from './utils/actionTypes.js';

/**
 * 实现createStore的功能
 * @param {function} reducer reducer
 * @param {any} defaultState 默认状态值
 * @returns
 */
export default function createStore(reducer, defaultState) {
    let currentReducer = reducer, //当前使用的reducer
        currentState = defaultState; //当前的状态值
    const listeners = [];

    function dispatch(action) {
        /**验证 action */
        if (!isPlainObject(action)) {
            throw new TypeError('action must be a plain object');
        }
        if (action.type === undefined) {
            throw new TypeError('action must has a property of type');
        }
        currentState = currentReducer(currentState, action);
        for (const listener of listeners) {
            listener();
        }
    }

    function getState() {
        return currentState;
    }

    /**
     * 添加一个订阅器
     * @param {function} listener
     */
    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            const index = listeners.indexOf(listener);
            if (index !== -1) listeners.splice(index, 1);
        };
    }

    //创建仓库时，需要分发一次初始的action
    dispatch({ type: actionTypes.INIT() });

    return {
        dispatch,
        getState,
        subscribe,
    };
}
