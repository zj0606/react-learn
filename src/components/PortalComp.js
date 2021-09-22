import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
const modalRoot = document.getElementById('modal-root');
class Modal extends Component{
    constructor(props){
        super(props)
        this.el = document.createElement('div')
    }
    componentDidMount(){
        modalRoot.appendChild(this.el)
    }
    componentWillUnmount(){
        modalRoot.removeChild(this.el)
    }
    render(){
        
        return(
            ReactDOM.createPortal(this.props.children,this.el)
        )
    }

}

class Parent extends Component{
    constructor(props){
        super(props)
        this.state ={
            clicks:0
        }
        this.handelClick = this.handelClick.bind(this)
    }
    handelClick(){
        this.setState((state)=>({
            clicks:state.clicks+1
        }),()=>console.log('ddd'))
    }
    render(){
        return(
            <div onClick={this.handelClick}>
                <p>Number of click:{this.state.clicks}</p>
                <Modal>
                    <Child name={{"test":"exempale"}}></Child>
                </Modal>
                <Modal render={()=>
                    <Child name={{"test":"exempale"}}></Child>
                }>
                    
                </Modal>
            </div>
        )
    }
}
function Child(props){
    const { name } = props
     return(
        <button>click me{name.test}</button>
    )
}
Child.propTypes = {
    name: PropTypes.object.isRequired
}
export default Parent;