import React from "react";
import ClassCard from './ClassCard/ClassCard';
import {List, Typography, message} from 'antd'
import EmptyComponent from '../Util/EmptyComponent';
import axios from "axios";
import SpinCenter from '../../components/Util/SpinCenter'

class Classes extends React.Component {

    state = {
        enrolled : [],
        teaching : [],
        classes : [],
        userId : JSON.parse(localStorage.getItem('userInfo'))._id,
        loading : true,
    }

    error = (err) => {
        message.error(err);
    };

    componentDidMount = async () => {
        try {
            let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
            let enrolled = await axios.post('http://localhost:3000/api/class/enrolled', {userId})
            this.setState({enrolled : enrolled.data})
            let teaching = await axios.post('http://localhost:3000/api/class/teaching', {userId})
            this.setState({teaching : teaching.data})
            this.setState({loading : false})
        } catch (error) {
            this.error("Something went wrong!")
        }
    }

    handleUnEnrollClass = async (code) => {
        let enrolled = this.state.enrolled;
        enrolled = enrolled.filter((enrolledClass) => enrolledClass.code !== code);
        this.setState({enrolled : enrolled});
        let id = this.state.userId;
        let data = {
            id : id,
            code : code
        }
        await axios.post('http://localhost:3000/api/class/unenroll', data);
    }

    handleRemoveClass = async (code) => {
        let teaching = this.state.teaching;
        teaching = teaching.filter((teachingClass) => teachingClass.code !== code);
        this.setState({teaching : teaching});
        let id = this.state.userId;
        let data = {
            id : id,
            code : code
        }
        await axios.post('http://localhost:3000/api/class/remove', data);
    }

    render() {

        return (
            <>
                <Typography
                    style = {{
                        fontSize : 25,
                        fontWeight : 'bold',
                        textAlign : 'center',
                        marginBottom : 10
                    }}
                >Instructing Classes</Typography>
                {this.state.teaching.length === 0 ? <>
                    {this.state.loading ? <SpinCenter /> : null}
                    <EmptyComponent 
                        text = "No Class, Create Now!"
                        buttonText = "Create Now"
                        url = "/create_course"
                    />
                </>:
                <List
                    grid={{
                        gutter: 16
                    }}
                    dataSource={this.state.teaching}
                    renderItem={item => (
                        <List.Item key = {item.code}>
                            <ClassCard 
                                name = {item.title} 
                                description = {item.instructorName} 
                                code = {item.code}
                                id = {item.id}
                                handleRemoveClass = {this.handleRemoveClass}
                            />
                        </List.Item>
                    )}
                />}

                <Typography
                    style = {{
                        fontSize : 25,
                        fontWeight : 'bold',
                        textAlign : 'center',
                        marginBottom : 10
                    }}
                >Enrolled Classes</Typography>
                {this.state.enrolled.length === 0 ? <>
                    {this.state.loading ? <SpinCenter /> : null}
                    <EmptyComponent 
                        text = "No Class, Join Now!"
                        buttonText = "Join Now"
                        url = "/join_course"
                    />
                </>:
                <List
                    grid={{
                        gutter: 16
                    }}
                    dataSource={this.state.enrolled}
                    renderItem={item => (
                        <List.Item key = {item.code}>
                            <ClassCard 
                                name = {item.title} 
                                description = {item.description} 
                                code = {item.code}
                                id = {item.id}
                                handleUnEnrollClass = {this.handleUnEnrollClass}
                            />
                        </List.Item>
                    )}
                />}
            </>
        )
    }
};

export default Classes;