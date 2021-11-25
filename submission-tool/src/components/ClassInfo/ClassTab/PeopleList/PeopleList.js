import React from 'react';
import { List} from 'antd';
import {UserOutlined} from '@ant-design/icons'

class PeopleList extends React.Component {

    state = {
       enrolledStudents : this.props.enrolledStudents
    }

    render() {
        return (
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
        )
    }
}


export default PeopleList;