import React from "react";
import AppBuilder from "../AppBuilder/AppBuilder";
import GeneralInstruction from "../../components/AttendQuiz/GeneralInstruction";
import QuizQuestion from "../../components/AttendQuiz/QuizQuestion";
import axios from "axios";
import SpinCenter from "../../components/Util/SpinCenter";

class AttendQuiz extends React.Component {

    state = {
        enteredQuiz : false,
        title : "Quiz Title",
        description : "Quiz Description",
        totalquestions : 3,
        questions : [{
            question : "Name?",
            options : []
        },{
            question : "School?",
            options : []
        },{
            question : "College?",
            options : []
        },],
        curQuestionIndex : 0,
        postId : "",
        classCode : "",
        post : {},
        loading : true,
        instructor : false,
    }

    componentDidMount = async () => {
        let postId = window.location.pathname.substr(27);
        this.setState({postId : postId});
        let classCode = window.location.pathname.substr(8,6);
        this.setState({classCode : classCode});
        let post = await axios.post('http://localhost:3000/api/posts/fetchpost', {postId, classCode});
        this.setState({post : post.data});
        this.setState({title : post.data.title});
        let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
        let check = await axios.post('http://localhost:3000/api/posts/is_instructor', {classCode, userId});
        this.setState({instructor : check.data});
        let checkUserEnrolled = await axios.post('http://localhost:3000/api/posts/check_enrolled', 
            {userId, classCode}
        )
        if(post.data === "error" || checkUserEnrolled.data === "error") {
            window.alert("The URL you are trying to access is not exist")
            window.location = "/not_found";
            return;
        }
        this.setState({loading : false});
    }

    handleEnterQuiz = () => {
        this.setState({enteredQuiz : true});
    }

    handleNextQuestion = () => {
        this.setState({curQuestionIndex : this.state.curQuestionIndex + 1});
    }

    handleSubmitQuiz = () => {

    }

    render() {
        let curQuestionIndex = this.state.curQuestionIndex;
        let totalquestions = this.state.totalquestions;
        let questions = [...this.state.questions];
        let curQuestion = {}
        if (curQuestionIndex < totalquestions) {
            curQuestion = questions[curQuestionIndex];
        }

        let content = <div>
            {this.state.enteredQuiz ? 
                curQuestionIndex < totalquestions - 1 ? 
                    <QuizQuestion 
                        question = {curQuestion.question}
                        handleNextQuestion = {this.handleNextQuestion}
                        quesNo = {curQuestionIndex + 1}
                        next = {true}
                    />
                :   <QuizQuestion 
                        question = {curQuestion.question}
                        handleSubmitQuiz= {this.handleSubmitQuiz}
                        quesNo = {curQuestionIndex + 1}
                        next = {false}
                    />       
            :<GeneralInstruction 
                data = {this.state.post}
                handleEnterQuiz = {this.handleEnterQuiz}
            />}
        </div>

        return (
            <AppBuilder 
                heading = "Quiz Title"
                content = {this.state.loading ? <SpinCenter /> : content}
            />
        )
    }
}

export default AttendQuiz;