const createReactClass = require('create-react-class')
const SetintervalMixin = {
    componentWillMount:function () {
        this.intervals = []
    },
    setInterval:function () {
        this.intervals.push(setInterval.apply(null,arguments))
    },
    componentWillUnmount:function () {
        this.intervals.foreach(clearInterval)
    }
    
}
const TickTock = createReactClass({
    mixins:[SetintervalMixin],
    getDefaultProps:function() {
        return {
            count:2
        }
    },
    getInitialState:function() {
        return {
            count:this.props.count
        }
    },
    componentDidMount:function () {
        this.setInterval(this.tick,1000)
    },
    tick:function () {
        this.setState({
            count:this.state.count+1
        })
    },
    render:function() {
        return (
            <div>
                use createReactClass creat React component{this.state.count}
            </div>
        )
    }
})
export default TickTock