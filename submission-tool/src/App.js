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

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/login" element = {<LoginPage/>} />
        <Route path = "/register" element = {<RegisterPage/>} />
        <Route path = '/courses' element = {<ClassesList/>} />
        <Route path = {`/course/:course_id`} element = {<ClassInfo />} />
        <Route path = '/join_course' element = {<JoinClass/>}/>
        <Route path = "/create_course" element = {<CreateClass/>}/>
        <Route path = "*" element = {<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
