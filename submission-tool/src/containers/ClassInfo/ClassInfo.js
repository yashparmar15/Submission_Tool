import React from "react";
import ClassTab from "../../components/ClassInfo/ClassTab/ClassTab";
import AppBuilder from "../AppBuilder/AppBuilder";

class ClassInfo extends React.Component {

    state = {
        className : ""
    }


    componentDidMount() {

        // fetch course info here
        this.setState({className : window.location.pathname.substr(8)})
    }

    render() {

        const content = <ClassTab/>

        return (
            <AppBuilder heading = {this.state.className} content = {content}/>
        )
    }
}

export default ClassInfo;