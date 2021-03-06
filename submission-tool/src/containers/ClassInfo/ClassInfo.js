import React from "react";
import ClassTab from "../../components/ClassInfo/ClassTab/ClassTab";
import AppBuilder from "../AppBuilder/AppBuilder";
import axios from "axios";

class ClassInfo extends React.Component {  // displaying class info

    state = {
        classData : {
            title : "loading"
        }
    }

    componentDidMount = async () => {
        let code = window.location.pathname.substr(8);
        let classData = await axios.post('/api/class/get_details', {code}); // fetching details of class
        if(classData.data === "error") {
            window.location = '/not_found';
            return;
        }
        this.setState({classData : classData.data});
    }

    render() {

        const content = <ClassTab data = {this.state.classData}/>

        return (
            <AppBuilder heading = {this.state.classData.title} content = {content}/>
        )
    }
}

export default ClassInfo;