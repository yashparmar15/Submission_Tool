import React from 'react';
import { Tabs } from 'antd';
import PeopleList from './PeopleList/PeopleList';
import ClassStream from './ClassStream/ClassStream';
import CreateAssignment from './CreateAssignment/CreateAssignment';
import CreateQuiz from './CreateQuiz/CreateQuiz';

const { TabPane } = Tabs;

class ClassTab extends React.Component {

  state = {
    curUser : JSON.parse(localStorage.getItem('userInfo'))._id
  }

  

  render() {
    return (
        <Tabs defaultActiveKey="1" type="card" size="middle">
          <TabPane tab="Stream" key="1">
            <ClassStream />
          </TabPane>
          <TabPane tab="People" key="2">
            <PeopleList />
          </TabPane>
          {this.state.curUser === this.props.data.createdBy ? <>
          <TabPane tab="Create Assignment" key="3">
            <CreateAssignment/>
          </TabPane>
          <TabPane tab="Create Quiz" key="4">
            <CreateQuiz/> 
          </TabPane>
          </> : null}
        </Tabs>
    );
  }
}

export default ClassTab;