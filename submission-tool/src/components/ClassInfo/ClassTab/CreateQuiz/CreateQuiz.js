import React from 'react';
import {Layout, Row, Col, message} from 'antd';
import LandingForm from './LandingForm/LandingForm';
import GenerateQuiz from './GenerateQuiz/GenerateQuiz';
import moment from 'moment';

class CreateQuiz extends React.Component{   // for creating quiz

    state = {
        data : null,
        startingTime : ""
    }

    handleSubmit = async values => {
        let date = values.start_date;
        let deadline = date.locale("en").format("MMM DD, YYYY")
        let time = values.start_time.format('HH:mm')
        deadline = deadline + " " +  time;
        this.setState({startingTime : deadline});
        if((moment(Date.now()).locale("en").format("MMM DD, YYYY HH:mm") >= deadline)) {
            message.error("Deadline should be future!");
            return;
        }
        let data = {
            title : values.title,
            description : values.description,
            start_date : values.start_date,
            start_time : values.start_time,
            timeAlloted : values.time
        }
        this.setState({data : data});
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
                                    classId = {this.props.classId}
                                    startingTime = {this.state.startingTime}
                            />
                        }
                    </Col>
                </Row>
            </Layout>
        );
    }
    
}

export default CreateQuiz;