import React from "react";
import {Spin} from 'antd';

class SpinCenter extends React.Component {

    render() {
        return (
            <div style = {{textAlign : 'center'}}>
                <Spin size = "default" />
            </div>
        )
    }
}

export default SpinCenter;