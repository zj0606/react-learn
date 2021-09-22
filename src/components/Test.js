function formateName(user) {
    return user.firstName+ ' ' + user.lastName;
}
// 组件名称必须以大写字母开头。
// 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改
const user = {
    firstName:'hhhh',
    lastName:'aaaa'
}
const element = (<h1 id="dd" data-id={user.firstName}>{formateName(user)}</h1>)
function Test() {
    return element
}
export default Test