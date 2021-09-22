import React from 'react'
function WithPointCat(props) {
    return (
        <div style={{width:'50px',height:'50px',
        display:'inline-block',
        backgroundColor:'red',
        position:'absolute',
        top:props.y,
        left:props.x}}>

        </div>
    )
}
class WithPoint extends React.Component{
    constructor(props){
        super(props)
        this.state={
            x:0,
            y:0
        }
        this.mouseMove = this.mouseMove.bind(this)
    }
    mouseMove(event){
        this.setState((preState)=>({
            x:event.clientX,
            y:event.clientY
        }))
    }
    render(){
        return (
            <div style={{height:'50vh',backgroundColor:'rgba(0,0,0,.2)'}} onMouseMove={this.mouseMove}>
                {/* <p>鼠标的位置x:{this.state.x}</p>
                <p>鼠标的位置y:{this.state.y}</p> */}
                {/* <WithPointCat {...this.state}/> */}
                {this.props.render(this.state)}

            </div>
        )
    }
}
class WithPointParent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <WithPoint render={(point)=><WithPointCat {...point}/>}>
                    
                </WithPoint>
            </div>
        )
    }
}
export default WithPointParent