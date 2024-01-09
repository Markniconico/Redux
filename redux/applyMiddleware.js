import compose from './compose.js';

/**
 * 注册中间件 使用：const store = applyMiddleware(middleware1, middleware2)(createStore)(rootReducer);
 * @param  {...any} middlewares 所有中间件
 * @returns
 */
export default function (...middlewares) {
    return function (createStore) {
        //给我创建中间件的函数
        //下面的函数用于创建仓库
        return function (reducer, defaultState) {
            //创建仓库
            const store = createStore(reducer, defaultState);
            let dispatch = () => {
                throw new TypeError('目前还不能使用dispatch');
            };
            const simpleStore = {
                getState: store.getState,
                dispatch: (...arg) => dispatch(...arg),
            };
            //给dispatch赋值
            //根据中间件数组，得到一个dispatch创建函数的数组
            const dispatchProducers = middlewares.map((mid) => mid(simpleStore));
            const dispatchProducer = compose(...dispatchProducers);
            dispatch = dispatchProducer(store.dispatch);
            return {
                ...store,
                dispatch,
            };
        };
    };
}
