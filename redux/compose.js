export default function compose(...funcs) {
    if (funcs.length === 0) {
        return (args) => args; //如果没有要组合的函数，则返回的函数原封不动的返回参数
    } else if (funcs.length === 1) {
        return funcs[0]; //要组合的函数只有一个
    }

    return funcs.reduce((current, next) => {
        return function (...arg) {
            return current(next(...arg));
        };
    });
}

// function add1(){
//     return n * 2
// }
// function add2() {
//     return n + 2;
// }
// const addFn = compose(add1, add2);
// addFn(5); //14
