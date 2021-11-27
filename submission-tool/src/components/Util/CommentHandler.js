import React from 'react';
import {Comment, Form, Input, Button, Affix, List} from 'antd';
import {UserOutlined} from '@ant-design/icons';

class CommmentHandler extends React.Component {
    

    state = {
        comments : this.props.comments ? this.props.comments : [],
    }

    render() {
        return (
            <div>
                {this.props.comments.length !== 0 ?
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.comments}
                    
                    renderItem={item => (
                        <li>
                            <Comment
                                style = {{marginBottom : -25}}
                                author={item.name}
                                avatar={<UserOutlined />}
                                content={item.comment}
                            // datetime={item.datetime}
                            />
                        </li>
                    )}
                /> : <p style = {{textAlign : 'center', color : 'gray'}}>No Comments yet</p>}
                <Input.TextArea 
                    value = {this.props.value}
                    rows={2}
                    onChange = {this.props.onChange}
                        style = {{marginBottom : 10, marginTop : 20}}
                />
                <Button onClick = {this.props.addComment} type="primary">
                    Add Comment
                </Button>
            </div>
        )
    }

}

export default CommmentHandler;