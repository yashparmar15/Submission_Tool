import React from 'react';
import { Tabs, message, notification } from 'antd';
import PeopleList from './PeopleList/PeopleList';
import ClassStream from './ClassStream/ClassStream';
import CreateAssignment from './CreateAssignment/CreateAssignment';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import axios from 'axios';
import SpinCenter from '../../Util/SpinCenter';

const { TabPane } = Tabs;

class ClassTab extends React.Component { // for displaying all the information related to class

  state = {
    curUser : JSON.parse(localStorage.getItem('userInfo'))._id,
    classData : this.props.data,
    enrolledStudents : [],
    posts : [],
    loading : true,
    instructor : {}
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
      window.location.reload();
  };

  createAssignment = async (values) => {  // creating assignment
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

      let res = await axios.post('/api/posts', data);
      if(res.data === "Success") {
          this.openNotificationWithIcon("success");
          return;
      }
  }   

  componentDidMount = async () => {  
    // checking all the validation for the given link, like if the user is not enrolled in the class
    // then he/she will not be able to see content of class
    let code = window.location.pathname.substr(8);
    let classData = await axios.post('/api/class/get_details', {code});
    if(classData.data === "error") {
      window.location = '/not_found';
      return;
    }
    this.setState({classData : classData.data});
    let classId = this.state.classData._id;
    let posts = await axios.post('/api/posts/fetchposts', {classId}); // fetching post details
    this.setState({posts : posts.data});
    let data = await axios.post('/api/class/get_enrolled_students', {classId});
    this.setState({enrolledStudents : data.data});
    let instructorId = this.state.classData.createdBy;
    let instuctorData = await axios.post('/api/class/get_instructor', {instructorId});
    this.setState({instructor : instuctorData.data});
    this.setState({loading : false});
  }

  

  render() {
    return (
        <Tabs defaultActiveKey="1" type="card" size="middle">
          <TabPane tab="Stream" key="1">
            {this.state.loading ? <SpinCenter /> :
            <ClassStream 
              classData = {this.state.classData}
              posts = {this.state.posts}
              loading = {this.state.loading}
            />}
          </TabPane>
          <TabPane tab="People" key="2">
            <PeopleList 
              enrolledStudents = {this.state.enrolledStudents} 
              data = {this.state.instructor}
            />
          </TabPane>
          {this.state.curUser === this.props.data.createdBy ? <>
          <TabPane tab="Create Assignment" key="3">
            <CreateAssignment 
                createAssignment = {this.createAssignment}
            />
          </TabPane>
          <TabPane tab="Create Quiz" key="4">
            <CreateQuiz classId = {this.state.classData._id}/> 
          </TabPane>
          </> : null}
        </Tabs>
    );
  }
}

export default ClassTab;