import './App.css';
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PageNotFound from './containers/PageNoteFound/PageNotFound';
import ClassesList from './containers/ClassesList/ClassesList';
import ClassInfo from './containers/ClassInfo/ClassInfo';
import JoinClass from './components/ClassInfo/JoinClass/JoinClass';
import CreateClass from './components/ClassInfo/CreateClass/CreateClass';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import React from 'react';
import AttendQuiz from './containers/AttendQuiz/AttendQuiz';
import SubmitAssignment from './containers/SubmitAssignment/SubmitAssignment';
import GradeAssignment from './containers/GradeAssignment/GradeAssignment';

class App extends React.Component {

  state = {
    isAuthenticated : localStorage.getItem('userInfo')
  }

  render() {
    return (
      <Router>
        <Routes>
          {this.state.isAuthenticated ? <>
          <Route path = "/login" element = {<LoginPage/>} />
          <Route path = "/register" element = {<RegisterPage/>} />
          <Route path = '/courses' element = {<ClassesList/>} />
          <Route path = {`/course/:course_id`} element = {<ClassInfo />} />
          <Route path = '/join_course' element = {<JoinClass/>}/>
          <Route path = "/create_course" element = {<CreateClass/>}/>
          <Route path = {`/course/:id/attend_quiz/:quiz_id`} element = {<AttendQuiz />} />
          <Route path = {`/course/:id/assignment/:id`} element = {<SubmitAssignment />} />
          <Route path = {`/course/:id/assignment/:id/grade`} element = {<GradeAssignment />} />
          <Route path = "*" element = {<PageNotFound/>} />
          </> : null}
          <Route path = "/login" element = {<LoginPage/>} />
          <Route path = "/register" element = {<RegisterPage/>} />
          <Route path = "*" element = {<PageNotFound/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
