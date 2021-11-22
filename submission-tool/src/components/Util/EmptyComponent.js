import React from "react";
import { Link } from "react-router-dom";
import {Button, Empty} from 'antd';

class EmptyComponent extends React.Component {

    render() {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>
                    {this.props.text}
                    </span>
                }
            >
                {this.props.buttonText ? 
                    <Link to = {this.props.url} >
                        <Button type="primary">{this.props.buttonText}</Button> 
                    </Link>
                : null}
            </Empty>
        )
    }
}

export default EmptyComponent;