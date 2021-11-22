import React from 'react';
import {Tooltip} from 'antd';
import './InputField.css';
import {WarningOutlined, CloseOutlined, CheckCircleFilled} from '@ant-design/icons'
import InputField from './InputField';

class MultipleChoice extends React.Component {
    render() {
        return <div className = "Choice">
            <Tooltip title = "Select answer" placement = "bottom">
                <CheckCircleFilled 
                    className = "circle" 
                    style = {{color : this.props.selected ? 'Green' : 'black'}}
                    onClick = {this.props.onOptionSelected}
                />
            </Tooltip>
            <InputField 
                isDuplicate = {this.props.isDuplicate}
                placeholder = "Option"
                value = {this.props.value}
                onChange = {this.props.onChange}
            />
            {this.props.isDuplicate ?
                <Tooltip title = {this.props.isEmpty ? "Empty value not allowed" : "Duplicates are not supported"}  placement = "bottom">
                    <WarningOutlined 
                        style = {{fontSize : 20,marginTop : 5,marginLeft : 10,color : '#d93025'}} 
                    />
                </Tooltip> : null
            }
            {this.props.len > 1 ?
            <Tooltip title="Remove" placement = "bottom">
                <CloseOutlined
                    onClick = {this.props.remove}
                    type = "close" 
                    style = {{fontSize : 20,cursor : 'pointer' ,marginTop : 5,marginLeft : 10}} 
                />
            </Tooltip> : <div style = {{marginLeft : 28}} ></div>}
        </div>
    }
}


export default MultipleChoice;