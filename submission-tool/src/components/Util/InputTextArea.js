import React from 'react';
import './InputField.css';
import {Input} from 'antd';


class InputTextArea extends React.Component {

    render(){
        return <Input.TextArea 
            
            className = "input-field"
            placeholder = {this.props.placeholder}
            type = "text"
            value = {this.props.description}
            size = "small" 
            rows = '1'
            autosize = 'true'
            style = {{
                overflow : 'hidden',
                marginTop : 0,
                color : '#606060',
                fontSize : this.props.fontsize,
                borderTop : 0,
                borderLeft : 0,
                borderRight : 0,
                paddingTop : 10,
                paddingBottom : 2,
                borderRadius : 0,
                paddingLeft : 0,
                maxHeight : 100
            }}
            onChange = {this.props.onChange}
        />
    }

}

export default InputTextArea;