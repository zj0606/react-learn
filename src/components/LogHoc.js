import React from 'react'
function LogHoc(WrappedComponent) {
    class LogProp extends React.Component{
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }
      
        render() {
            const {forwardRef,...rest} = this.props
            return <WrappedComponent {...rest} forwardRef={forwardRef} />
            ;
        }
    }
    return React.forwardRef((props,ref)=> <LogProp {...props} forwardRef={ref} />)
}
export default LogHoc