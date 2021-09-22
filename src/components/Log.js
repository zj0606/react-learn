import React,{Component} from 'react'
import LogHoc from './LogHoc'
class Log extends Component{
    constructor(props){
        super(props)
    }
    focus(){
        console.log();
    }
    render(){
        const {forwardRef,handleClick} = this.props;
        return(
            <div onClick={handleClick}>
            <input type="text" ref={forwardRef} />
        </div>
        )
    }
}
export default LogHoc(Log)