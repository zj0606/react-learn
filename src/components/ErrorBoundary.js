import React, { Component } from 'react'

class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state ={
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
    }
    render(){
        if (this.state.hasError){
            return(<div>组件渲染出错</div>)
        }
        return (
            this.props.children
        )
    }
}
export default ErrorBoundary