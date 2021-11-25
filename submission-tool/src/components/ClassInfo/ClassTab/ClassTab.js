import React from 'react';
import { Tabs, message, notification } from 'antd';
import PeopleList from './PeopleList/PeopleList';
import ClassStream from './ClassStream/ClassStream';
import CreateAssignment from './CreateAssignment/CreateAssignment';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import axios from 'axios';

const { TabPane } = Tabs;

class ClassTab extends React.Component {

  state = {
    curUser : JSON.parse(localStorage.getItem('userInfo'))._id,
    classData : this.props.data,
    enrolledStudents : []
  }

  error = (err) => {
    message.error(err);
  };

  openNotificationWithIcon = type => {
      notification[type]({
        message: 'Assignment Created!',
        description:
          'Please head-over to stream section to view assignment',
      });
  };

  createAssignment = async (values) => {
      let date = values.date;
      let deadline = date.locale("en").format("MMM DD, YYYY").toString()
      let time = values.time.format('HH:mm')
      deadline = deadline + " " +  time;
      if(Date.now() >= date.toDate()) {
          this.error("Deadline should be future!");
          return;
      }

      let data = {
          classId : this.state.classData._id,
          title : values.title,
          description : values.description,
          marks : values.marks,
          type : "Assignment",
          deadline : deadline,
      }

      let res = await axios.post('http://localhost:3000/api/posts', data);
      if(res.data === "Success") {
          this.openNotificationWithIcon("success");
          return;
      }
  }   

  componentDidMount = async () => {
    let code = window.location.pathname.substr(8);
    let classData = await axios.post('http://localhost:3000/api/class/get_details', {code});
    if(classData.data === "error") {
      window.location = '/not_found';
      return;
    }
    this.setState({classData : classData.data});
    let classId = this.state.classData._id;
    let data = await axios.post('http://localhost:3000/api/class/get_enrolled_students', {classId});
    this.setState({enrolledStudents : data.data});
  }

  

  render() {
    return (
        <Tabs defaultActiveKey="1" type="card" size="middle">
          <TabPane tab="Stream" key="1">
            <ClassStream classData = {this.state.classData}/>
          </TabPane>
          <TabPane tab="People" key="2">
            <PeopleList enrolledStudents = {this.state.enrolledStudents}/>
          </TabPane>
          {this.state.curUser === this.props.data.createdBy ? <>
          <TabPane tab="Create Assignment" key="3">
            <CreateAssignment 
                createAssignment = {this.createAssignment}
            />
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