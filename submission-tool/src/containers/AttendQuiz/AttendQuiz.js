import React from "react";
import AppBuilder from "../AppBuilder/AppBuilder";
import GeneralInstruction from "../../components/AttendQuiz/GeneralInstruction";
import QuizQuestion from "../../components/AttendQuiz/QuizQuestion";

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
        curQuestionIndex : 0
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
                handleEnterQuiz = {this.handleEnterQuiz}
            />}
        </div>

        return (
            <AppBuilder 
                heading = "Quiz Title"
                content = {content}
            />
        )
    }
}

export default AttendQuiz;