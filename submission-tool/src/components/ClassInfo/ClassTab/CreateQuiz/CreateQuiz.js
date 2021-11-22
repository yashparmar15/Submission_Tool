import React from 'react';
import {Layout, Row, Col} from 'antd';
import LandingForm from './LandingForm/LandingForm';
import GenerateQuiz from './GenerateQuiz/GenerateQuiz';

class CreateQuiz extends React.Component{

    state = {
        data : null
    }

    handleSubmit = values => {
        this.setState({data : values});
    };

    render(){
        return (
            <Layout>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        {
                            !this.state.data ?
                                <LandingForm
                                    handleSubmit = {this.handleSubmit}
                                /> 
                            :   <GenerateQuiz 
                                    data = {this.state.data}
                            />
                        }
                    </Col>
                </Row>
            </Layout>
        );
    }
    
}

export default CreateQuiz;