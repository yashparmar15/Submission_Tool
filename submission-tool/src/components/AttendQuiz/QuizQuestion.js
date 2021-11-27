import React from "react";
import {Button, Typography, Radio, Space} from 'antd';

class QuizQuestion extends React.Component {

    render() {

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
                    10:00
                </Typography>
                <Typography
                    style = {{
                        fontSize : 18,
                        fontWeight : 'bold',
                        fontFamily : 'monospace'
                    }}
                >
                    {this.props.quesNo}. {this.props.question}
                </Typography>
                <Typography
                    style = {{
                        fontSize : 13,
                        color : 'gray',
                        fontFamily : 'monospace',
                        marginBottom : 10
                    }}
                >
                    decription goes here
                </Typography>
                <Radio.Group buttonStyle="solid">
                    <Space 
                        direction = "vertical"
                    >
                    <Radio.Button 
                        style = {{width : '60vw' , height : 'auto'}}
                        value="a"
                    >   Hangzhou
                    </Radio.Button>
                    <Radio.Button value="b">Shanghai</Radio.Button>
                    <Radio.Button value="c">Beijing</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                    </Space>
                </Radio.Group>
                <br/>
                <Button 
                    style = {{marginTop : 20}}
                    type = "primary"
                    onClick = {this.props.next ? 
                                    this.props.handleNextQuestion.bind() : 
                                    this.props.handleSubmitQuiz.bind()}
                >   {this.props.next ? "Next" : "Submit Quiz"}
                </Button>
            </>
        )
    }

}

export default QuizQuestion;