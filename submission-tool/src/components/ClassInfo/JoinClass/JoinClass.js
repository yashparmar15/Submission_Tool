import { Result, Button, Input } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import React from "react";
import AppBuilder from '../../../containers/AppBuilder/AppBuilder';

class JoinClass extends React.Component {

    

    render() {

        const content = <Result
            icon={<UsergroupAddOutlined />}
            title="Great, Please Enter Class Code to Join!"
            extra={
                <>
                <Input placeholder="Class Code" style = {{marginBottom : 20, maxWidth :200}}/>
                <Button type="primary">Join Class</Button>
                </>
            }
        />

        return (
            <AppBuilder heading = "Join Class" content = {content}/>
        )
    }
}

export default JoinClass;