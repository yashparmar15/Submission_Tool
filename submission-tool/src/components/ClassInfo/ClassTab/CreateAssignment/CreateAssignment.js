import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber, TimePicker, Layout, Col, Row, Typography} from 'antd';
const {Content} = Layout;

class CreateAssignment extends React.Component {

    render() {
        return (
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
                                Create Assignment
                            </Typography.Title>
                            <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 12 }}
                                layout="horizontal"
                                // onValuesChange={onFormLayoutChange}
                                size = "middle"
                            >
                                <Form.Item 
                                    name = "title"
                                    label="Title" 
                                    rules = {[{ required: true, message : "Title is required"}]}
                                >
                                    <Input placeholder = "Enter Assignment Title"/>
                                </Form.Item>
                                <Form.Item label="Description">
                                    <Input.TextArea placeholder = "Enter Description here" />
                                </Form.Item>
                                <Form.Item 
                                    label="Deadline"
                                    rules = {[{ required: true, message : "Deadline is required"}]}
                                >
                                    <DatePicker style = {{marginRight : 20, marginBottom : 10}}/>
                                    <TimePicker />
                                </Form.Item>
                                <Form.Item 
                                    name = "marks"
                                    label="Maximum Marks"
                                    rules = {[{ required: true, message : "Marks is required"}]}
                                >
                                    <InputNumber min = {1} max = {100} value = {100}/>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Content>
                    </Col>
                </Row>
            </Layout>
        )
    }
};

export default CreateAssignment;