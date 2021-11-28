import React from "react";
import {Layout, Button, Typography,Form, Input, Row, Col, notification} from 'antd';
import AppBuilder from "../AppBuilder/AppBuilder";
import axios from 'axios';

const {Content} = Layout;


class LoginPage extends React.Component {   // Login Page of the tool

    state = {
        isAuthenticated : localStorage.getItem('userInfo')
    }

    componentDidMount = () => {
        if(this.state.isAuthenticated) {
            window.location = '/courses'
            return;
        }
    }

    openNotificationWithIcon = (type,message,des) => {
        notification[type]({
          message: message,
          description: des,
        });
    };

    submitHandler = async (values) => {  // handling login
        
        try {
            const email = values.email;
            const password = values.password;
            const {data} = await axios.post('/api/users/login', {
                email,password
            });
            if(data === "Error") {
                this.openNotificationWithIcon('error',"Invalid Username or Password!");
                return;
            }
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location = '/courses';

        } catch (error) {
            
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
                                Welcome Back
                            </Typography.Title>
                            <p style = {{ color : '#a0a0a0' , textAlign : 'center'}}> 
                                New User? <a href = "/register">Register Here!</a> 
                            </p>
                            <Form 
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 8 }} 
                                onFinish = {this.submitHandler}
                            >
                                <Form.Item 
                                    name = "email"
                                    label = "Email"
                                    initialValue = ""
                                    rules = {[{ required: true, message : "Email is required!"}]}
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
                                <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Content>
                    </Col>
                </Row>
            </Layout>
        );
        return (
            <AppBuilder heading = "Login" content = {content} />
        )
    }
}

export default LoginPage;