import React, { Component } from 'react'
import { MyContext } from './context'
import LazyComp from './LazyComp'
class Children extends Component{
    static contextType = MyContext
    render(){
        return(
            <div>
                dd{this.context}
                <LazyComp/>
            </div>
        )
    }
}
// Children.contextType = MyContext
export default Children