// <T>声明一个东西 后面可以去使用它  ，记住啥意思就行 data啥类型 返回值就啥类型
function clone<T>(data:T):T{
    return   JSON.parse(JSON.stringify(data))
}

export default clone