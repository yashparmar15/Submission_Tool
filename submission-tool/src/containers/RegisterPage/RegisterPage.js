import React from "react";
import {Layout, Button, Typography,Form, Input, Row, Col, notification} from 'antd';
import AppBuilder from "../AppBuilder/AppBuilder";
import SpinCenter from "../../components/Util/SpinCenter";
import axios from "axios";

const {Content} = Layout;


class RegisterPage extends React.Component {

    state = {
        loading : false
    }

    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        if(user) {
            window.location = '/courses';
            return;
        }
    }

    openNotificationWithIcon = (type,message,des) => {
        notification[type]({
          message: message,
          description: des,
        });
    };

    submitHandler = async (values) => {
        const name = values.name;
        const email = values.email;
        const password = values.password;
        const confirmPassword = values.confirmPassword;
        this.setState({loading : true});
        if (password !== confirmPassword) {
            this.openNotificationWithIcon('error',"Passwords are not matching!");
            this.setState({loading : false});
            return;
        } else {
            if(password.length < 8) {
                this.openNotificationWithIcon('warning',"Short Password", "Password length should be >= 8");
                this.setState({loading : false});
                return;
            }
            try {
                const {data} = await axios.post('http://localhost:3000/api/users', {
                    name,email,password
                });
                this.setState({loading : false});
                console.log(data);
                if(data === "User Already Exists" || !data) {
                    this.openNotificationWithIcon('error',"Error Occured","User Already Exists!");
                    return;
                }   
                console.log(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location = '/courses';
    
            } catch (error) {
            }
        }

    }

    render() {

        const content = (
            <Layout>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        <Content
                            style={{
                                margin: 10,
                                padding: 24,
                                background: "#fff"
                            }}
                        >
                            <Typography.Title level={3} style={{textAlign : 'center'}}>
                                Welcome
                            </Typography.Title>
                            <p style = {{ color : '#a0a0a0' , textAlign : 'center'}}> 
                                Already a User? <a href = "/login">Sign In!</a> 
                            </p>
                            {this.state.loading ? <SpinCenter /> : null}
                            <Form 
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 8 }} 
                                onFinish = {this.submitHandler}
                            >
                                <Form.Item 
                                    name = "name"
                                    label = "Name"
                                    initialValue = ""
                                    rules = {[{ required: true, message : "Name is required!"}]}
                                >
                                    <Input 
                                        placeholder = "Enter your name"
                                    />
                                </Form.Item>
                                <Form.Item 
                                    name = "email"
                                    label = "Email"
                                    initialValue = ""
                                    rules = {[{ type : 'email', required: true, message : "Invalid Email!"}]}
                                >
                                    <Input
                                        placeholder = "Enter your email"
                                    />
                                </Form.Item>
                                <Form.Item 
                                    name = "password"
                                    label = "Password"
                                    initialValue = ""
                                    rules = {[{ required: true, message : "Password is required!"}]}
                                >
                                    <Input.Password 
                                        placeholder = "Enter your password"
                                    />
                                </Form.Item>
                                <Form.Item 
                                    name = "confirmPassword"
                                    label = "Confirm Password"
                                    initialValue = ""
                                    rules = {[{ required: true, message : "Password is required!"}]}
                                >
                                    <Input.Password 
                                        placeholder = "Confirm your password"
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Content>
                    </Col>
                </Row>
            </Layout>
        );
        return (
            <AppBuilder heading = "Sign Up" content = {content} />
        )
    }
}

export default RegisterPage;