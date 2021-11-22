import { Result, Button, Input } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import React from "react";
import AppBuilder from '../../../containers/AppBuilder/AppBuilder';

class JoinClass extends React.Component {

    

    render() {

        const content = <Result
            icon={<BankOutlined />}
            title="Just one step more, Create Class Here!"
            extra={
                <>
                <Input placeholder="Class Name" style = {{marginBottom : 20, maxWidth :200}}/>
                <Input placeholder="Small Description" style = {{marginBottom : 20, maxWidth :200}}/>
                <Button type="primary">Create Class</Button>
                </>
            }
        />

        return (
            <AppBuilder heading = "Create Class" content = {content}/>
        )
    }
}

export default JoinClass;