import React from "react";
import AppBuilder from "../AppBuilder/AppBuilder";
import GeneralInstruction from "../../components/AttendQuiz/GeneralInstruction";
import QuizQuestion from "../../components/AttendQuiz/QuizQuestion";
import axios from "axios";
import SpinCenter from "../../components/Util/SpinCenter";
import ViewScore from "../../components/AttendQuiz/ViewScore";
import GradeQuiz from "../../components/AttendQuiz/GradeQuiz";
import moment from "moment";

class AttendQuiz extends React.Component {   // Page to atteding the quiz

    state = {
        enteredQuiz : false,
        title : "Quiz Title",
        description : "Quiz Description",
        totalquestions : 3,
        questions : [],
        curQuestionIndex : 0,
        postId : "",
        classCode : "",
        post : {},
        loading : true,
        instructor : false,
        loadingQuiz : false,
        selectedOption : "",
        submitting : false,
        alreadyCompleted : false,
        disable : true,
        timer : 0
    }

    tick = () => {
        let date = this.state.post.startTime;
        let time = this.state.post.timeAlloted;
        let curTime = moment(Date.now()).locale("en").format("MMM DD, YYYY HH:mm");
        if(curTime >= date) {
            this.setState({disable : false});
        }
    }

    componentDidMount = async () => {  // fetch and validating information for attending the quiz
        let postId = window.location.pathname.substr(27);
        this.setState({postId : postId});
        let classCode = window.location.pathname.substr(8,6);
        this.setState({classCode : classCode});
        let post = await axios.post('/api/posts/fetchpost', {postId, classCode});
        this.setState({post : post.data});
        this.setState({timer : parseInt(post.data.timeAlloted) * 60})
        console.log(this.state.timer);
        this.setState({title : post.data.title});
        let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
        let check = await axios.post('/api/posts/is_instructor', {classCode, userId});
        this.setState({instructor : check.data});
        let checkUserEnrolled = await axios.post('/api/posts/check_enrolled', 
            {userId, classCode}
        )
        let completedBy = this.state.post.completedBy;
        for(let i = 0 ; i < completedBy.length ; i++) {  // if the user had already completed the quiz then
            // the user will be redirected to ViewScore page
            if(completedBy[i].id === userId) {
                this.setState({alreadyCompleted : true});
                this.setState({assignedMarks : completedBy[i].score});
                break;
            }
        }
        if(post.data === "error" || checkUserEnrolled.data === "error") {
            window.alert("The URL you are trying to access is not exist")
            window.location = "/not_found";
            return;
        }
        this.interval = setInterval(() => this.tick(), 1000);
        this.setState({loading : false});
    }

    updateTimer = () => {
        if(this.state.timer === 0) {
            this.handleSubmitQuiz();
        }
        this.setState({timer : this.state.timer - 1});
    }

    handleEnterQuiz = async () => {
        let postId = this.state.postId;
        this.setState({loadingQuiz : true});
        let questions = await (await axios.post('/api/posts/get_questions', {postId})).data;
        let time = this.state.timer;
        this.interval = setInterval(() => {
            this.updateTimer()
        }, 1000 );
        this.setState({totalquestions : questions.length});
        this.setState({questions : questions});
        this.setState({loadingQuiz : false});
        this.setState({enteredQuiz : true});
    }

    saveUserResponse = async () => {
        let data = {
            quesId : this.state.questions[this.state.curQuestionIndex]._id,
            userId : JSON.parse(localStorage.getItem('userInfo'))._id,
            response : this.state.selectedOption
        }
        await axios.post('/api/users/save_response', data);
    }

    handleNextQuestion = async () => {
        this.saveUserResponse();
        if(this.state.curQuestionIndex === 0) {
            let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
            let postId = this.state.postId;
            let res = await axios.post('/api/posts/completed_quiz', {userId, postId});
        }
        this.setState({curQuestionIndex : this.state.curQuestionIndex + 1});
        this.setState({selectedOption : ""});
    }

    optionSelected = (val) => {
        this.setState({selectedOption : val.target.value});
    }

    handleSubmitQuiz = async () => {
        this.setState({submitting : true})
        this.saveUserResponse();
        if(this.state.curQuestionIndex === 0) {
            let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
            let postId = this.state.postId;
            let res = await axios.post('/api/posts/completed_quiz', {userId, postId});
        }
        this.setState({submitting : false});
        alert("Successfully Completed, You can see your marks on classroom as soon as your instructor posts.");
        window.location = `/course/${this.state.classCode}`
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
                        description = {curQuestion.description}
                        options = {curQuestion.options}
                        marks = {curQuestion.marks}
                        handleNextQuestion = {this.handleNextQuestion}
                        quesNo = {curQuestionIndex + 1}
                        time = {this.state.post.timeAlloted}
                        optionSelected = {this.optionSelected}
                        next = {true}
                        timer = {this.state.timer}
                    />
                :   <QuizQuestion 
                        question = {curQuestion.question}
                        description = {curQuestion.description}
                        options = {curQuestion.options}
                        marks = {curQuestion.marks}
                        handleSubmitQuiz= {this.handleSubmitQuiz}
                        quesNo = {curQuestionIndex + 1}
                        time = {this.state.post.timeAlloted}
                        optionSelected = {this.optionSelected}
                        submitting = {this.state.submitting}
                        next = {false}
                        timer = {this.state.timer}
                    />       
            :<GeneralInstruction 
                data = {this.state.post}
                handleEnterQuiz = {this.handleEnterQuiz}
                loadingQuiz = {this.state.loadingQuiz}
                disable = {this.state.disable}
            />}
        </div>

        if(this.state.instructor) {
            content = <GradeQuiz postId = {this.state.postId} />
        }

        return (
            <AppBuilder 
                heading = {this.state.post.title}
                block = {this.state.enteredQuiz}
                content = {this.state.loading ? 
                    <SpinCenter /> :
                    this.state.alreadyCompleted ? <ViewScore 
                        score = {this.state.assignedMarks}
                        total = {this.state.post.totalMarks}
                    /> :
                    content}
            />
        )
    }
}

export default AttendQuiz;