import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Test from './components/Test'
import Clock from './components/clock'
import FormElement from './components/HandleComp'
import ZuHeComp from './components/ZuHeComp'

import LazyComp from './components/LazyComp'
import RenderProp from './components/RenderProp'
import Parent from './components/Parent'
import PortalComp from './components/PortalComp'
// import CreateReactClassComp from './components/CreateReactClassComp'
import Log from './components/Log'
import ErrorBoundary from './components/ErrorBoundary'
import EventTest from './components/Event'
import HookTest from './components/hook/Test01'
import reportWebVitals from './reportWebVitals';
const ref = React.createRef()
function clickMe() {
  console.log(ref.current.focus());
}
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <PortalComp />
      <RenderProp/>
      <HookTest/>
      {/* <EventTest /> */}
      {/* <CreateReactClassComp /> */}
      <Log handleClick={clickMe}  ref={ref}/>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
function tick() {
  const element = (
    <div>{Date.now()}</div>
  )
  ReactDOM.render(
    element
    ,
    document.getElementById('root')
  );
}
// setInterval(tick, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
