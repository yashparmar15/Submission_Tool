import React from "react";
import {Layout, Button, Typography,Form, Input, DatePicker, TimePicker, 
        InputNumber} from 'antd';

const {Content} = Layout;


class LandingForm extends React.Component {   // landing page for creating quiz

    // contains the landing form on the quiz
    render() {
        return (
            <Content
                style={{
                    margin: 10,
                    padding: 24,
                    background: "#fff"
                }}
            >
                <Typography.Title level={3} style={{textAlign : 'center'}}>
                    Quiz Details
                </Typography.Title>
                <p style = {{ color : '#a0a0a0' , textAlign : 'center' }}>
                    Please mention the title and description of the quiz the so that it would be easier for students.
                </p>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} onFinish = {this.props.handleSubmit}>
                    <Form.Item 
                        name = "title"
                        label = "Quiz Title"
                        initialValue = ""
                        rules = {[{ required: true}]}
                    >
                        <Input 
                            placeholder = "Enter Quiz title"
                        />
                    </Form.Item>
                    <Form.Item 
                        label = "Description"
                        name = "description"
                    >
                        <Input.TextArea
                            rows = "5"
                            placeholder = "Please provide short description"
                        />
                    </Form.Item>
                    <Form.Item 
                        required
                        label = "Start Date"
                        name = "start_date"
                    >
                        <DatePicker style = {{width : '100%'}}/>
                    </Form.Item>
                    <Form.Item 
                        label = "Start Time"
                        name = "start_time"
                        required
                    >
                        <TimePicker format = "HH:mm" style = {{width : '100%'}}/>
                    </Form.Item>
                    <Form.Item 
                        required
                        label = "Alloted Time (in min)"
                        name = "time"
                    >
                        <InputNumber min = {1} style = {{width : '100%'}}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        )
    }
}

export default LandingForm;