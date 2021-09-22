import { MyContext } from './context'
function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
       {props.children}
       <div>left:{props.left}</div>
       <div>right:{props.right}</div>
      </div>
    );
  }
function Left(){
    return(
      <MyContext.Consumer>
        {
          (value)=>(<div style={{color:'red'}}>this is left:{value}</div>)
        }
      </MyContext.Consumer>
        
    )
}
function Right(){
    return(
        <div>this is right</div>
    )
}
function WelcomeDialog() {
    return (
      <FancyBorder color="blue" left={<Left/>} right={<Right/>}>
        <h1 className="Dialog-title">
          Welcome
          <button
                aria-haspopup="true"
                aria-expanded={22}>Select an option</button>
                <button
                aria-haspopup="true"
                aria-expanded={22}>Select an option</button>
        </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    );
  }

  export default WelcomeDialog

