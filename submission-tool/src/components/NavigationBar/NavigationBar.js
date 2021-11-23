import React from "react";

import { Layout, Menu, Affix } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

class NavigationBar extends React.Component {

    state = {
        isAuthenticated : localStorage.getItem('userInfo')
    }

    logoutUser = () => {
        localStorage.removeItem("userInfo");
        window.location = '/login'
    }

    render() {
        return (
            <Sider collapsible collapsed={this.props.collapsed} onCollapse={this.props.onCollapse}>
                <Affix>
                <Menu theme="dark" mode="inline">
                    {this.state.isAuthenticated ?<>
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to = "/courses">Classes</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Teaching">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Enrolled">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2" icon={<FileOutlined />}>
                        <Link to = "/join_course">Join Class</Link>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<FileOutlined />}>
                        <Link to = "/create_course">Create Class</Link>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<LogoutOutlined />} onClick = {this.logoutUser}>
                        Logout
                    </Menu.Item> 
                    </>: <>
                    <Menu.Item key="1" icon={<LoginOutlined />}>
                        <Link to = "/login">Login</Link>
                    </Menu.Item> 
                    <Menu.Item key="1" icon={<UserAddOutlined />}>
                        <Link to = "/register">Register</Link>
                    </Menu.Item> 
                    </>}
                </Menu>
                </Affix>
            </Sider>
        )
    }
}

export default NavigationBar;