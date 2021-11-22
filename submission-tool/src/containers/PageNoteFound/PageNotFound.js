import React from 'react';
import { Result, Button } from 'antd';
import AppBuilder from '../AppBuilder/AppBuilder';
import { Link } from 'react-router-dom';


class PageNotFound extends React.Component {
    render() {
        const content = <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to = "/courses"><Button type="primary" >Back Home</Button></Link>}
        />
        return (
            <AppBuilder heading = {"Error : Page not found"} content = {content}/>
        );
    }
}

export default PageNotFound;