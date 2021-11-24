import { Result, Button, Input, message } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import React from "react";
import AppBuilder from '../../../containers/AppBuilder/AppBuilder';
import axios from 'axios';

class JoinClass extends React.Component {

    state = {
        code : ""
    }

    error = (err) => {
        message.error(err);
    };

    success = (s) => {
        message.success(s);
    }

    handleSubmit = async () => {
        let code = this.state.code;
        if(code.length !== 6) {
            this.error("Please Enter valid 6 digit code!");
            return;
        }

        let data = {
            code : code,
            userId : JSON.parse(localStorage.getItem('userInfo'))._id
        }

        let res = await axios.post('http://localhost:3000/api/class/join', data);
        // console.log(res.data);
        switch(res.data) {
            case "error": {
                this.error("Class with given code not exist!");
                break;
            }
            case "success": {
                this.success("Successfully Joined!");
                window.location = '/courses';
                break;
            }
            case "already": {
                this.error("You have already joined the class")
                break;
            }
            default: {
                this.error("Some error occured!");
            }
        }
    }

    render() {

        const content = <Result
            icon={<UsergroupAddOutlined />}
            title="Great, Please Enter Class Code to Join!"
            extra={
                <>
                <Input
                    placeholder="Class Code" 
                    style = {{marginBottom : 20, maxWidth :200}}
                    value = {this.state.code}
                    onChange = {(event) => this.setState({code : event.target.value})}
                />
                <Button 
                    type="primary"
                    onClick = {this.handleSubmit}
                >   Join Class
                </Button>
                </>
            }
        />

        return (
            <AppBuilder heading = "Join Class" content = {content}/>
        )
    }
}

export default JoinClass;