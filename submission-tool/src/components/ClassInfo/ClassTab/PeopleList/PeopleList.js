import React from 'react';
import { List, Avatar} from 'antd';

class PeopleList extends React.Component {

    state = {
        peoples : [{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        },{
            name : "Yash Parmar",
            email : "yashparmar15700@gmail.com",
            imageuri : "https://joeschmoe.io/api/v1/random"
        }]
    }

    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.peoples}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar = {<Avatar src= {item.imageuri} />}
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