import { Component, React } from 'react';
import Cookies from 'js-cookie';

class ConfigField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.getDefault(),
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const newValue =  event.target.value;
        this.setState({value: newValue});
        this.setDefault(newValue);
    }

    setDefault(value){
        Cookies.set(this.props.cookie, value);
    }

    getDefault(){
        let value = Cookies.get(this.props.cookie);

        if(!value){
            value = this.props.defaultValue;
            this.setDefault(value);
        }

        return value;
    }

    render(){
        const title = this.props.title;
        const defaultValue = this.state.value;

        return(
            <div>
                <p>{title}</p>
                <input type="text" defaultValue={defaultValue} onChange={this.handleChange} /><br />
            </div>
        )
    }
}

class NumberConfigField extends ConfigField {
    handleChange(event){
        console.log(event);
        let targetVal = event.target.value;
        console.log(targetVal);
        
        super.handleChange(event);
    }
}

export {ConfigField, NumberConfigField};
