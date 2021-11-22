import React from "react";
import CourseTab from "../../components/CourseInfo/ClassTab/CourseTab";
import AppBuilder from "../AppBuilder/AppBuilder";

class CourseInfo extends React.Component {

    state = {
        courseName : ""
    }


    componentDidMount() {

        // fetch course info here
        this.setState({courseName : window.location.pathname.substr(8)})
    }

    render() {

        const content = <CourseTab/>

        return (
            <AppBuilder heading = {this.state.courseName} content = {content}/>
        )
    }
}

export default CourseInfo;