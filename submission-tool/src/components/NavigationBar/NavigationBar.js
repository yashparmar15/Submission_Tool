import React from "react";

import { Layout, Menu, Affix } from 'antd';
import {
  HomeOutlined, 
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from 'axios';

const { Sider } = Layout;
const { SubMenu } = Menu;

class NavigationBar extends React.Component {

    state = {
        isAuthenticated : localStorage.getItem('userInfo'),
        enrolledClasses : [],
        teachingClasses : []
    }

    componentDidMount = async () => {
        if(this.state.isAuthenticated) {
            let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
            let enrolled = await axios.post('http://localhost:3000/api/class/enrolled', {userId})
            this.setState({enrolledClasses : enrolled.data})
            let teaching = await axios.post('http://localhost:3000/api/class/teaching', {userId})
            this.setState({teachingClasses : teaching.data})
        }
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
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to = "/courses">Classes</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Teaching">
                        {this.state.teachingClasses.map(teachingClass => (
                            <Menu.Item key={teachingClass.code}>
                                <Link to = {`/course/${teachingClass.code}`}>
                                    {teachingClass.title}
                                </Link>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Enrolled">
                        {this.state.enrolledClasses.map(enrolledClass => (
                            <Menu.Item key={enrolledClass.code}>
                                <Link to = {`/course/${enrolledClass.code}`}>
                                    {enrolledClass.title}
                                </Link>
                            </Menu.Item>
                        ))}
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
                    <Menu.Item key="188" icon={<LoginOutlined />}>
                        <Link to = "/login">Login</Link>
                    </Menu.Item> 
                    <Menu.Item key="1999" icon={<UserAddOutlined />}>
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