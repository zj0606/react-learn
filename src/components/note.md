* react 中组件分为两种函数式和class
+ 组件的名称必须首字母大写，
* 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改
+ 正确使用state 
1. 不能直接修改state 通过setState()方法修改
2. 构造函数是唯一可以给this.state 赋值的地方
## State 的更新可能是异步的
1.  出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。

2. 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
3. 要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

or 
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
### 组件的生命周期
```
componentDidMount()
componentWillUnmount()
```
### 数据是向下流动的 单向数据流

## react 中的事件
1. 事件名采用小驼峰是camelCase onClick={handleClick} 要传入函数作为事件处理函数而不是字符串
2. 不能通过返回false的方式阻止默认行为，要显示的使用preventDefault

```
<!-- 绑定this的三种方式 -->
class LogginButton extends React.Component{
    constructor(props){
        super(props)
        <!-- 1 -->
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        console.log('this is this')
    }
    render(){
        return (
            <div onClick={this.handleClick}></div>
        )
    }
}
//class fields
class LogginButton extends React.Component{
   // 注意: 这是 *实验性* 语法。
    handleClick = ()=>{
        console.log('this is this')
    }
    render(){
        return (
            <div onClick={this.handleClick}></div>
        )
    }
}
//3. 事件传参使用箭头函数
class LogginButton extends React.Component{
    handleClick(){
        console.log('this is this')
    }
    render(){
        return (
            <div onClick={()=>this.handleClick()}></div>
        )
    }
}
```
+ 第三种方式在于每次渲染组件时 都会创建不同的回调函数，在大多数情况下没有问题
***如果将回调函数作为参数传入子组件这些组件可能会进行额外的渲染***
* *note: 建议在构造器内绑定或者采用class fields语法*
### react 事件传参
```
//回调函数显示声明e 
<div onClick={(e)=>this.handleClick(id,e)}></div>

<div onClick={this.handleClick.bind(this,id)}></div>
```
* 上述两种方式是**等价**的，分别通过箭头函数和 Function.prototype.bind 来实现
+ 这两种情况下React 事件对象e 会被作为第二个参数进行传递，采用箭头函数 会被显示的传递，通过bind 会被隐式的传递


### 条件渲染
* React 中的条件渲染和JavaScript中样使用if或条件预算符
* 与运算符 && 例：true && expression 返回expression 、false && expression 返回false
+ 三目运算符 {x?y:z}
### 阻止组件渲染 
* 返回null
```
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
***在组件的 render 方法中返回 null 并不会影响组件的生命周期。例如，上面这个示例中，componentDidUpdate 依然会被调用。***

### 列表和key
* map 和key 在 map() 方法中的元素需要设置 key 属性。
+ key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：


### 表单
#### 受控组件 
 ```
 <input type="text"/> 
<textarea></textarea> 
<select></select>
```
> 通过value 属性 以及change 事件使其受控
2. 
```
<input type="file"/>
```
value为只读属性属于不可控组件

3. **处理多个输入** 添加name属性用来区分
4. 受控组件输入空置
受控组件指定value prop 防止用户更改，但是你指定了value属性后用户依然可以输入可能是指定的值为undefined或null

### 果你想寻找包含验证、追踪访问字段以及处理表单提交的完整解决方案，使用 Formik 是不错的选择。然而，它也是建立在受控组件和管理 state 的基础之上 —— 所以不要忽视学习它们


### 状态提升
### 组合vs继承 推荐组合来实现代码的复用
```
function B(props){
  return (<div>{props.children}</div>)
}
function A(){
  return (<B><h1>this is A</h1></B>)
}
```

### 完全不应该使用 state 构建静态版本

### 语义化
* Fragment && <></>(短语法)
* React for==> htmlFor

* this.inputRef = React.createRef()
* 当使用 HOC 来扩展组件时，我们建议使用 React 的 forwardRef 函数来向被包裹的组件转发 ref。如果第三方的 HOC 不支持转发 ref，上面的方法仍可以作为一种备选方案。


### 代码分割
1. 在你的应用中引入代码分割的最佳方式是通过动态 import() 语法
```
//使用前 
import { add } from './math'
add(1,2)
//使用后
import('./math').then(math=>{
  math.add(1,2)
})

```
2. React.lazy 和suspense 实现路由懒加载
```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
* React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。

* fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。
### 基于路由的代码分割
```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

### context 跨层级传参
* Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
* 何时使用 Context
* 使用 Context 之前的考虑
> * 跨层级传递数据谨慎使用，降低了组件复用性
> * 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。
> * 一种无需 context 的解决方案是将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props：
+ API

> React.createContext
Context.Provider
Class.contextType
Context.Consumer
Context.displayName
* 示例

> 动态 Context
在嵌套组件中更新 Context
使用多个 Context
* 注意事项
> 废弃的 API

### 错误边界 ErrorBoundary
* 错误边界的工作方式类似于 JavaScript 的 catch {}，不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件。大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

* 注意***错误边界仅可以捕获其子组件的错误***，它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch {} 的工作机制。

### 未捕获错误（Uncaught Errors）的新行为
+ 这一改变具有重要意义，***自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载***。
### 自 React 15 的命名更改
React 15 中有一个支持有限的错误边界方法 unstable_handleError。此方法不再起作用，同时自 React 16 beta 发布起你需要在代码中将其修改为 componentDidCatch。
对此，我们已提供了一个 **codemod** 来帮助你自动迁移你的代码。

### Refs 转发
* React.createRef()
* React.forwardRef() 转发 接受回调函数 例如(props,ref)=>(<MyComponent {...props} ref={ref}/>)

### Fragments <></>
### 高阶组件
* 高阶组件是参数为组件，返回值为新组件的函数。
* **note:不要在 render 方法中使用 HOC**
 
```
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```


### 在大部分情况下，你可以继承 React.PureComponent 以代替手写 shouldComponentUpdate()。它用当前与之前 props 和 state 的***浅比较***覆写了 shouldComponentUpdate() 的实现。
```
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
### ReactDOM.createPortal(child, container)
* 一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

### Profiler API
* Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。 它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。
```
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```
### const createReactClass = require('create-react-class')
```
createReactClass({
//默认属性
getDefaultProps:function(){
  return {
    name:'mary'
  }
},
//初始状态
getInitialState:function(){
  return {
    count:0
  }
},
//自动绑定this
handleClick:function(){
  alert(this.state.message)
},
render:function(){
  return (
    <div onClick={this.handleClick}>
      say hello
    </div>
  )
}
})
```
* 注意：

> 这些方法被认为是过时的，在新的代码中应该避免使用它们：
UNSAFE_componentWillMount()
UNSAFE_componentWillUpdate()
UNSAFE_componentWillReceiveProps()
### 协调
* 由于 React 依赖启发式算法，因此当以下假设没有得到满足，性能会有所损耗。

* 该算法不会尝试匹配不同组件类型的子树。如果你发现你在两种不同类型的组件中切换，但输出非常相似的内容，建议把它们改成同一类型。在实践中，我们没有遇到这类问题。
Key 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 Math.random() 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。
### Refs && Dom
* React.createRef() React.forwardRef() 
* ref={el=>this.inputRef = el} 例子 回调ref
* note：字符串ref 废弃了 this.refs.inputRef 请使用以上代替
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
```
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
* 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的

### Render Props
* 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
**render prop 是一个用于告知组件需要渲染什么内容的函数 prop。**

* **note:重要的是要记住，render prop 是因为模式才被称为 render prop ，你不一定要用名为 render 的 prop 来使用这种模式。事实上， 任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”**
* *将 Render Props 与 React.PureComponent 一起使用时要小心*
* 如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势
* 解决方式2种：1定义一个prop 实例方法；2使用React.Component

### 静态类型检查
1. flow
2. typeScript
3. 最后选择 PropTypes

### 严格模式React.StrictMode
```
<React.StrictMode>
  <div>
    <ComponentOne />
    <ComponentTwo />
  </div>
</React.StrictMode>
```
### 使用 PropTypes 进行类型检查
* **注意：**
* 自 React v15.5 起，React.PropTypes 已移入另一个包中。请使用 prop-types 库 代替
* import PropTypes from 'prop-types'
### React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。
### React.memo 为高阶组件。
* React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染
### React.cloneElement() 几乎等同于：
* <element.type {...element.props} {...props}>{children}</element.type>
* 引入此 API 是为了替换已弃用的 React.addons.cloneWithProps()


# https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/ 声明周期图谱

* 首次渲染或使用 forceUpdate() 时不会调用该方法 shouldComponentUpdate
### 只有两个方法：setState() 和 forceUpdate()你可以在组件中调用的方法
* setState(updater, [callback]) updater 有两种形式
* 直接对象
* 函数 -- 可依赖当前的状态进行更新
* setState 是批量异步的，可以在callback 和componentDidUpdate中使用最新状态，最好是后者
### component.forceUpdate(callback)
* 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。

+ 通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。

### ReactDom from 'react-dom'
* render()
* hydrate()
* unmountComponentAtNode()
* findDOMNode()
* createPortal()
## Hook 出现的动机
1. #### 在组件之间复用状态逻辑很难
* render props
* HOC 高阶组件
* **Hook使你在无需修改组件结构的情况下复用状态逻辑**
2. ### 复杂组件变得难以理解 
* **Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**
3. ### 难以理解的 class

### hook 定义
* Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React
1. **Effect Hook**
* useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
### Hook 使用规则
> 1. 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用
> 2. 只能在** React 的函数组件中**调用 Hook。不要在其他 JavaScript 函数中调用
**hook 在class 内部不起作用**
* 如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React ***跳过***对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
> 注意：

> 如果你要使用此优化方式，请**确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。参阅文档，了解更多关于如何处理函数以及数组频繁变化时的措施内容。

> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递**一个空数组（[]）作为第二个参数**。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

> 如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式，**但我们有更好的方式来避免过于频繁的重复调用 effect**。除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便。

>我们推荐启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。此规则会在添加错误依赖时发出警告并给出修复建议。

## React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序
### 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook
* 自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性
* **自定义 Hook 必须以 “use” 开头吗**？必须如此
```
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

###  const [state,setState] = useState(initState)的setState() 接收参数
* 直接是普通类型的state ;setState(newState)
* 函数；setState((prevState)=>newState)
### 惰性初始 state
* initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：
```
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```
### useEffect
* 如果组件多次渲染（通常如此），则在**执行下一个 effect 之前，上一个 effect 就已被清除**
* **执行时机**  与 componentDidMount、componentDidUpdate 不同的是，传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用
* useEffect 和useLayoutEffect的区别
> 一个对用户可见的 DOM 变更就必须在浏览器执行下一次绘制前被同步执行，这样用户才不会感觉到视觉上的不一致 ----React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect。
+ effect 的条件执行
> useEffect(()=>{ 
  执行effect
  return ()=>{
    清除effect
  }
},[prop])
> 只执行一次传入一个空数组[],

### sueContext
```
const value = useContext(MyContext);
接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

别忘记 useContext 的参数必须是 context 对象本身：

正确： useContext(MyContext)
```
```
提示

如果你在接触 Hook 前已经对 context API 比较熟悉，那应该可以理解，useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

useContext(MyContext) 只是让你能够***读取*** context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
```
### const [state, dispatch] = useReducer(reducer, initialArg, init);
### useRef() 返回的可变的Ref 对象结构{current:xxx} 与 字面量创建的{current:xxx}最主要的区别是，每次重新渲染时useRef 不会返回新的对象，而字面量的对象会重新创建


### 通常你会想要在 effect 内部 去声明它所需要的函数
```
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 这样不安全（它调用的 `doSomething` 函数使用了 `someProp`）
}
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）
}
```

* 如果你指定了一个 依赖列表 作为 useEffect、useLayoutEffect、useMemo、useCallback 或 useImperativeHandle 的最后一个参数，它必须包含回调中的所有值，并参与 React 数据流。这就包括 props、state，以及任何由它们衍生而来的东西
* ***只有*** 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略
### 如何记忆计算结果
* useMemo Hook Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果
```
const memoizedValue = useMemo(()=>computeExpensiveValue(a,b),[a,b])
```
* 这行代码会调用 computeExpensiveValue(a, b)。但如果依赖数组 [a, b] 自上次赋值以来没有改变过，useMemo 会跳过二次调用，只是简单复用它上一次返回的值
* 记住，传给 useMemo 的函数是在渲染期间运行的。不要在其中做任何你通常不会在渲染期间做的事。举个例子，副作用属于 useEffect，而不是 useMemo。
* ***你可以把 useMemo 作为一种性能优化的手段，但不要把它当做一种语义上的保证***


## 如何惰性创建昂贵的对象？
#### 第一个常见的使用场景是当创建初始 state 很昂贵时：
```
function Table(props) {
  // ⚠️ createRows() 每次渲染都会被调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```
* 为避免重新创建被忽略的初始 state，我们可以传一个 **函数** 给 useState：
```
function Table(props) {
  // ✅ createRows() 只会被调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```
#### 你或许也会偶尔想要避免重新创建 useRef() 的初始值
```
function Image(props) {
  // ⚠️ IntersectionObserver 在每次渲染都会被创建
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```
* useRef **不会** 像 useState 那样接受一个特殊的函数重载。相反，你可以编写你自己的函数来创建并将其设为惰性的：
 
 ```
 function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver 只会被惰性创建一次
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // 当你需要时，调用 getObserver()
  // ...
}
```
## 如何避免向下传递回调？
* 在大型的组件树中，我们推荐的替代方案是通过 context 用 useReducer 往下传一个 dispatch 函数：
```
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```
* TodosApp 内部组件树里的任何子节点都可以使用 dispatch 函数来向上传递 actions 到 TodosApp：
```
function DeepChild(props) {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```
* 总而言之，从维护的角度来这样看更加方便（不用不断转发回调），同时也避免了回调的问题。像这样向下传递 dispatch 是处理深度更新的推荐模式。

* 注意，你依然可以选择将应用的 state 作为 props（更显明确）向下传递或者使用 context（对很深的更新而言更加方便）向下传递。如果你选择使用 context 来向下传递 state，请使用两种不同的 context 类型传递 state 和 dispatch —— 由于 dispatch context 永远不会变，因此读取它的组件不需要重新渲染，除非这些组件也需要用到应用程序的 state。

* 在某些罕见场景中，你可能会需要用 useCallback 记住一个回调，但由于内部函数必须经常重新创建，记忆效果不是很好。如果你想要记住的函数是一个事件处理器并且在渲染期间没有被用到，你可以 把 ref 当做实例变量 来用，并手动把最后提交的值保存在它当中
```
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // 把它写入 ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 读取它
    alert(currentText);
  }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```





