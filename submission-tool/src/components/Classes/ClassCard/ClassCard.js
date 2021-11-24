import React from 'react';
import { Skeleton, Card, Avatar, Menu, Dropdown } from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

class ClassCard extends React.Component {
  state = {
    loading: false,
    userId : JSON.parse(localStorage.getItem('userInfo'))._id
  };

  onChange = checked => {
    this.setState({ loading: true });
  };

  render() {
    const { loading } = this.state;

    const menu = (
        <Menu>
          <Menu.Item 
            key = {1} 
            onClick = {this.state.userId === this.props.id ? 
                          this.props.handleRemoveClass.bind(this,this.props.code)
                        : this.props.handleUnEnrollClass.bind(this,this.props.code)}>
              {this.state.userId === this.props.id ? "Delete Class" : "Unenroll"}
          </Menu.Item>
        </Menu>
    );

    return (
      <>
        <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <Dropdown overlay = {menu} arrow placement = "bottomRight">
                    <EllipsisOutlined key="ellipsis" />
                </Dropdown>
            ]}
        >
            <Skeleton loading={loading} avatar active>
                <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title = {<Link 
                            to = {{
                              pathname : `/course/${this.props.code}`,
                              query : {code : this.props.code, title : this.props.name}
                            }}
                          > 
                            <p>{this.props.name}</p> 
                          </Link>
                        }
                description= {this.props.description}
                />
            </Skeleton>
        </Card>
      </>
    );
  }
}

export default ClassCard;