import React from "react";
import EmptyComponent from "../../../Util/EmptyComponent";
import {Card, List} from 'antd';
import {FileAddFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom'

class ClassStream extends React.Component {

    state = {
        posts : [{
            title : "Title Here",
            description : "Description Here",
            key : 1
        },{
            title : "Title Here",
            description : "Description Here",
            key : 2
        },{
            title : "Title Here",
            description : "Description Here",
            key : 3
        },]
    }

    render() {
        return ( <>
            {this.state.posts.length === 0 ?
                <EmptyComponent text = "No Posts"/> :
                <List
                    dataSource={this.state.posts}
                    renderItem={item => (
                        <Card style = {{
                            borderWidth : 5,
                            marginBottom : 10,
                            borderRadius : 10,
                        }}>
                            <List.Item 
                                key={item.key}
                                style = {{
                                    borderWidth : 0,
                                    marginTop : -10,
                                    marginBottom : -10
                                }}
                            >
                                <List.Item.Meta
                                    avatar={<FileAddFilled style = {{fontSize : 30, color : '#4285F4'}}/>}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description= "Very very long long long long description"
                                />
                                <Link to = '/'>View</Link>
                            </List.Item>
                        </Card>
                    )}
                />
            }
            </>
        )
    }
}

export default ClassStream;