import { Result, Button, Input, message} from 'antd';
import { BankOutlined } from '@ant-design/icons';
import React from "react";
import AppBuilder from '../../../containers/AppBuilder/AppBuilder';
import axios from 'axios';

class JoinClass extends React.Component {

    state = {
        name : "",
        description : "",
    }

    error = (err) => {
        message.error(err);
    };

    success = (s) => {
        message.success(s);
    }


    handleSubmit = async() => {
        if (this.state.name === "") {
            this.error("Class name should not be empty!");
            return;
        }

        let code = Math.floor(100000 + Math.random() * 900000)
        let data = {
            title : this.state.name,
            description : this.state.description,
            code : code,
            createdBy : JSON.parse(localStorage.getItem('userInfo'))._id,
            instructorName : JSON.parse(localStorage.getItem('userInfo')).name
        }
        
        let message = await axios.post('http://localhost:3000/api/class', data);
        if(message.data === "error") {
            this.error("Class with same name already exist");
            this.setState({title : ""});
            return;
        }
        if(message.data === "success") {
            this.success("Successfully Created!");
            window.location = '/courses';
            return;
        }
        this.error("Some Error Occured!");
    }


    render() {

        const content = <Result
            icon={<BankOutlined />}
            title="Just one step more, Create Class Here!"
            extra={
                <>
                    <Input 
                        placeholder="Class Name" 
                        style = {{marginBottom : 20, maxWidth :200}}
                        value = {this.state.name}
                        onChange = {(event) => this.setState({name : event.target.value})}
                    />
                    <Input 
                        placeholder="Small Description" 
                        style = {{marginBottom : 20, maxWidth :200}}
                        value = {this.state.description}
                        onChange = {(event) => this.setState({description : event.target.value})}
                    />
                    <Button 
                        type="primary"
                        onClick = {this.handleSubmit}
                    >   Create Class
                    </Button>
                </>
            }
        />

        return (
            <AppBuilder heading = "Create Class" content = {content}/>
        )
    }
}

export default JoinClass;