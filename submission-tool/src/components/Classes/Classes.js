import React from "react";
import ClassCard from './ClassCard/ClassCard';
import {List} from 'antd'
import EmptyComponent from '../Util/EmptyComponent';

class Classes extends React.Component {

    state = {
        classes : [{
            Name : "EE201",
            Description : "Electronics"
        },{
            Name : "EE202",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        },{
            Name : "EE203",
            Description : "Electronics"
        }]
    }

    render() {

        return (
            <>
                {this.state.classes.length === 0 ?  <EmptyComponent 
                    text = "No Class, Join Now!"
                    buttonText = "Join Now"
                    url = "/join_course"
                />:
                <List
                    grid={{
                        gutter: 16
                    }}
                    dataSource={this.state.classes}
                    renderItem={item => (
                        <List.Item>
                            <ClassCard name = {item.Name} description = {item.Description}/>
                        </List.Item>
                    )}
                />}
            </>
        )
    }
};

export default Classes;