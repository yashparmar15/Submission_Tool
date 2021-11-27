import React from "react";
import EmptyComponent from "../../../Util/EmptyComponent";
import {Card, List, Typography} from 'antd';
import {FileAddFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import SpinCenter from '../../../Util/SpinCenter'

class ClassStream extends React.Component {
   
    state = {
        // classData : this.props.classData,
        posts : this.props.posts
    }

    render() {
        return ( <>
            <Typography style = {{
                marginBottom : 20
            }}>
                <b>
                    Class Description {this.props.load}:- 
                </b> {this.props.classData.description}
            </Typography>
            {this.state.posts.length === 0 ?
                <EmptyComponent text = "No Posts"/> :
                <List
                    dataSource={this.props.posts}
                    renderItem={item => (
                        <Card style = {{
                            borderWidth : 5,
                            marginBottom : 5,
                            borderRadius : 10,
                        }}>
                            <List.Item 
                                key={item._id}
                                style = {{
                                    borderWidth : 0,
                                    marginTop : -10,
                                    marginBottom : -10
                                }}
                            >
                                <List.Item.Meta
                                    avatar={<FileAddFilled style = {{fontSize : 30, color : '#4285F4'}}/>}
                                    title={<Link 
                                        to = {`/course/${this.props.classData.code}/assignment/${item._id}`}
                                        state = {{postId : item._id}}
                                    >
                                        {item.title}
                                    </Link>}
                                    description= {item.deadline}
                                />
                                <Link 
                                    to = {`/course/${this.props.classData.code}/assignment/${item._id}`}
                                >
                                    View
                                </Link>
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