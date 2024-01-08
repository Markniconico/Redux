export default function bindActionCreator(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return getAutoDispatchActionCreator(actionCreators, dispatch);
    } else if (typeof actionCreators === 'object') {
        let actions = {};
        for (const key in actionCreators) {
            if (Object.hasOwnProperty.call(actionCreators, key)) {
                const actionCreator = actionCreators[key];
                if (typeof actionCreator === 'function') {
                    actions[key] = getAutoDispatchActionCreator(actionCreator, dispatch);
                }
            }
        }
        return actions;
    } else {
        throw new TypeError(
            'actionCreators must be an object or function which means action creator .'
        );
    }
}

/**
 * 得到一个自动分发的action创建函数
 * @param {function} actionCreator
 * @param {*} dispatch
 */
function getAutoDispatchActionCreator(actionCreator, dispatch) {
    return function (...arg) {
        const action = actionCreator(...arg);
        dispatch(action);
    };
}
