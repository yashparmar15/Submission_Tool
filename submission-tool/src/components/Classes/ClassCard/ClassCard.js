import React from 'react';
import { Skeleton, Card, Avatar, Menu, Dropdown } from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

class ClassCard extends React.Component {
  state = {
    loading: false,
  };

  onChange = checked => {
    this.setState({ loading: true });
  };

  render() {
    const { loading } = this.state;

    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Unenroll
            </a>
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
                              pathname : `/course/${this.props.name}`,
                              query : {classCode : this.props.name}
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