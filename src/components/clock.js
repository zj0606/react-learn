import React from 'react'
class Clock extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            date:Date.now()
        }
    }
    componentDidMount(){
        // this.timeId = setInterval(()=>{
        //     this.setState({
        //         date:Date.now()
        //     },()=>console.log('更新了'))
        // },1000)
        this.timeId = setInterval(()=>this.tick(),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timeId)
    }
    tick(){
        this.setState({
            date:Date.now()
        })
    }
    render(){
        return(
            <div>{this.state.date}</div>
        )
    }
}
export default Clock