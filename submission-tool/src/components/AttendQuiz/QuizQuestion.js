import React from "react";
import {Button, Typography, Radio, Space} from 'antd';

class QuizQuestion extends React.Component {    // Question Component for quiz

    render() {
        
        const option = this.props.options.map(option => (
            <Radio.Button 
                key = {option}
                style = {{width : '60vw' , height : 'auto'}}
                value={option}
            >   
                {option}
            </Radio.Button>
        ))
        let s = this.props.timer;
        const time = (s-(s%=60))/60+(9<s?':':':0')+s

        return (
            <>
                <Typography style = {{
                    textAlign : 'center',
                    fontSize : 20,
                    fontFamily : 'monospace',
                    fontWeight : 'bolder',
                    backgroundColor : '#b0b0b0',
                    marginBottom : 20
                }}>
                    {time}
                </Typography>
                <Typography
                    style = {{
                        fontSize : 18,
                        fontWeight : 'bold',
                        fontFamily : 'monospace'
                    }}
                >
                    {this.props.quesNo}. {this.props.question}
                    <i style = {{fontSize : 12}}>(Marks : {this.props.marks})</i>
                </Typography>
                <Typography
                    style = {{
                        fontSize : 13,
                        color : 'gray',
                        fontFamily : 'monospace',
                        marginBottom : 10
                    }}
                >
                    {this.props.description}
                </Typography>
                <Radio.Group 
                    buttonStyle="solid"
                    onChange = {this.props.optionSelected.bind(this.props.quesNo)}
                >
                    <Space 
                        direction = "vertical"
                    >
                        {option}
                    </Space>
                </Radio.Group>
                <br/>
                <Button 
                    style = {{marginTop : 20}}
                    type = "primary"
                    onClick = {this.props.next ? 
                                    this.props.handleNextQuestion.bind() : 
                                    this.props.handleSubmitQuiz.bind()}
                >   {this.props.next ? "Next" : this.props.submitting ? "Submitting..." : "Submit Quiz"}
                </Button>
            </>
        )
    }

}

export default QuizQuestion;