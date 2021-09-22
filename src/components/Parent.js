import React, { Component } from 'react'
import Children from './Children'
import { MyContext } from './context'
class Parent extends Component{
    constructor(props){
        super(props)
        this.state ={
            flag:'this is test'
        }
    }
    render(){
        return(
            <div>
                <MyContext.Provider value={this.state.flag}>
                    <Children />
                </MyContext.Provider>
                
            </div>
        )
    }
}
export default Parent