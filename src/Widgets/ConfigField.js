import { Component, React } from 'react';
import Cookies from 'js-cookie';

class ConfigField extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const newValue =  event.target.value;
        this.setDefault(newValue);
        this.props.onChange(newValue);
    }

    setDefault(value){
        Cookies.set(this.props.cookie, value);
    }

    getDefault(){
        let value = Cookies.get(this.props.cookie);

        // Set a cookie if none exists
        if(!value){
            value = this.props.defaultValue;
            this.setDefault(value);

        // If value from cookie does not match value from parent, update parent
        } else if(value!=this.props.defaultValue){
            this.props.onChange(value);
        }

        return value;
    }

    render(){
        const title = this.props.title;
        const defaultValue = this.getDefault();

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
        let targetVal = event.target.value;
        
        super.handleChange(event);
    }
}

export {ConfigField, NumberConfigField};
