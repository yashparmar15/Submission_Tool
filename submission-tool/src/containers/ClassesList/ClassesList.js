import React from 'react';
import Classes from '../../components/Classes/Classes';
import AppBuilder from '../AppBuilder/AppBuilder';


class ClassesList extends React.Component {
    render() {
        const content = <Classes />
        return (
            <AppBuilder heading = {"Classes"} content = {content} /> 
        );
    }
}

export default ClassesList;