import React from "react";
import EmptyComponent from "../../../Util/EmptyComponent";
import {Card, List, Typography} from 'antd';
import {FileAddFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom'

class ClassStream extends React.Component {

    state = {
        // classData : this.props.classData,
        posts : []
    }

    render() {
        return ( <>
            <Typography><b>Class Description :- </b> {this.props.classData.description}</Typography>
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