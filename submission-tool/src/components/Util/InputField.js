import React from 'react';
import './InputField.css';
import {Input} from 'antd';


class InputField extends React.Component {

    render(){
        let left = this.props.disable ? 10 : 0;
        return <>
            <Input 
                className = "input-field"
                placeholder = {this.props.placeholder}
                type = "text"
                value = {this.props.value}
                size = {this.props.size} 
                style = {{
                    color : '#606060',
                    fontSize : this.props.val,
                    borderTop : 0,
                    borderLeft : 0,
                    borderRight : 0,
                    borderRadius : 0,
                    paddingLeft : left,
                    width : this.props.w ? 200 : null,
                }}
                onChange = {this.props.onChange}
            />
        </>
    }

}

export default InputField;