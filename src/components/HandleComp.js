import React from 'react'
class FormElement extends React.Component{
    constructor(props){
        super(props)
        // 绑定this
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextArea = this.handleTextArea.bind(this)
        this.handleChecked = this.handleChecked.bind(this)
        this.state ={
            val:9,
            textarea:'textarea',
            fruit:'mango',
            isGoing:true,
            numberOfGuests:0
        }
    }
    handleChange(e){
        console.log(e);
        this.setState({
            val:e.target.value
        })
    }
    handleSubmit(e){
        // 阻止默认行为
        e.preventDefault()
    }
    handleTextArea(e){
        this.setState((state,props)=>{
            console.log(state,props);
            return{textarea:e.target.value}
        })
    }
    handleSelect(e){
        console.log(e);
        this.setState(function(state,props){
            return({
                fruit:e.target.value
            })
        })
    }
    handleChecked(e){
        console.log(e.target);
        const target = e.target
        const value = target.type === "checkbox"? target.checked:target.value
        const name = target.name
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    只读：
                    <input type="text" value='2' readOnly />
                    defaultValue:
                    <input type="text" defaultValue="2" />
                    受控组件：
                    <input type="text" value={this.state.val} onChange={this.handleChange}/>
                </div>

                <div>
                    
                    <label htmlFor="area">文本域：</label>
                    <textarea value={this.state.textarea} onChange={this.handleTextArea} id="area"></textarea>
                </div>
                <div>
                    <label htmlFor="select">
                        select:
                    </label>
                    <select id="select" value={this.state.fruit} onChange={this.handleSelect.bind(this)}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </div>
                <div>
                    <label>处理多个输入通过添加name 属性 计算属性名称</label>
                    <label>
                        参与：
                        <input type="checkbox" 
                        name="isGoing"
                        checked={this.state.isGoing}
                        onChange={this.handleChecked}
                        />
                    </label>
                    <label>
                        来宾人数：
                        <input type="number" 
                        name="numberOfGuests"
                        value={this.state.numberOfGuests}
                        onChange={this.handleChecked}
                        />
                    </label>
                    <hr></hr>
                    <label>受控组件value值为null 或者 undefined时变为非受控</label>
                    <input type="text" value={null} />

                </div>
                <input type="submit" value="提交"/>
            </form>
        )
    }
}
export default FormElement