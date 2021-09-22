import React ,{ useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect,useDebugValue } from "react";
const myContext = React.createContext({color:"red"})
function Item(props) {
    const currentContext = useContext(myContext)
    return (
        <div style={{color:currentContext.color == "blue"?"red":"green"}}>
            我们不一样 我是useContext
        </div>
    )
}
class Child extends React.Component{
    static contextType = myContext
    render(){
        return(
            <>
                <div style={this.context}>
                好看的颜色
                </div>
                <myContext.Consumer>
                    {(value)=>(<div style={value}>
                我也是好看的颜色
                </div>)}
                </myContext.Consumer>
                
            </>
        )
    }
}
// useReducer
const initialState = {count:0}
function reducer(state,action) {
    switch(action.type){
        case 'increment':
        return {count:state.count + 1}
        break;
        case "decrement":
            return {count:state.count -1}
            break;
        default:
            throw new Error();
    }
}
function Counter() {
    const [state, dispatch] = useReducer(reducer,initialState)
    // const memoized = useCallback(()=>{
    //     console.log(state)
    // },[state])
    // console.log(memoized())
    function add(state) {
        return state.count + 3
    }
    const memoizedValue = useMemo(()=>add(state),
    [state])
    console.log(memoizedValue)
    return (
        <div>
            使用了useReducer计数器:{state.count}
            <button onClick={()=>dispatch({type:"increment"})}>+</button>
            <button onClick={()=>dispatch({type:"decrement"})}>-</button>
        </div>
    )
}
function init(initialArg){
    return {
        count:initialArg
    }
}

function Counter1({initialArg}) {
    const [state, dispatch] = useReducer(reducer,initialArg,init)
    return (
        <div>
            使用了useReducer 惰性初始state:{state.count}
            <button onClick={()=>dispatch({type:"increment"})}>+</button>
            <button onClick={()=>dispatch({type:"decrement"})}>-</button>
        </div>
    )
}

function Example() {
    const [count, setCount] = useState(0)
    const [online, setOnline] = useState(()=>{
        let isOnline = count % 2 == 0?true:false
        return isOnline
    })
    useDebugValue(count, count => count.toString())
    const [name, setName] = useState([{"userName":'jerry'}])
    function changName(e) {
        setName([{'userName':e.target.value}])
    }
    useEffect(()=>{
        document.title=name[0].userName
        console.log(inputRef)
        inputRef.current.focus()
    },[name])
    const inputRef = useRef(['yes'])
    useLayoutEffect(()=>{
        document.title=name[0].userName+'flag'
    },[name])
    
    return (
        <myContext.Provider value={{color:"blue"}}>
            <div>
                <Counter/>
            <Counter1 initialArg={10}/>
                <Item />
                <Child />
                <p>You clicked { count } time</p>
                <p>name:{name[0].userName}:{online?'在线':"下线"}</p>
                <button onClick={()=>setOnline((prevState)=>!prevState)}>changeState</button>
                <input ref={inputRef} type="text" value={name[0].userName} onChange={changName}/>
                <div onClick={()=>setCount(count+1)}>
                    Click me
                </div>
            </div>
        </myContext.Provider>
    )
}
export default Example