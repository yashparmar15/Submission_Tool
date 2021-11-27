import React from 'react';
import { Divider, List, Typography} from 'antd';
import {UserOutlined} from '@ant-design/icons'

class PeopleList extends React.Component {

    state = {
       enrolledStudents : this.props.enrolledStudents
    }

    render() {
        return (
            <>
                <Typography style = {{fontWeight : 'bold', fontSize : 20}}>
                    Instructor
                </Typography>
                <List.Item>
                    <List.Item.Meta
                        avatar = {<UserOutlined style = {{fontSize : 25, marginTop : 5}}/>}
                        title = {this.props.data.name}
                        description = {this.props.data.email}
                    />
                </List.Item>
                <Divider />
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.enrolledStudents}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar = {<UserOutlined style = {{fontSize : 25, marginTop : 5}}/>}
                            title = {item.name}
                            description = {item.email}
                        />
                    </List.Item>
                    )}
                />
            </>
        )
    }
}


export default PeopleList;