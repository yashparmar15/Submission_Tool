import React from "react";
import {Typography, Button} from 'antd';


class GeneralInstruction extends React.Component {

    render() {
        return (
            <div>
                <Typography 
                    style = {{
                        fontSize : 20,
                        fontWeight : 'bold',
                        textAlign : 'center',
                        marginBottom : 20,
                        fontFamily : 'monospace'
                    }}

                >
                    General Instructions
                </Typography>
                <Typography style = {{
                    fontFamily : 'monospace'
                }}>
                    <ul>
                        <li> Total number of question are <b>{this.props.data.questions.length}</b>.</li>
                        <li> You have to completed the quiz in the alloted time. If you failed to submit the responses in time, whatever you have selected till that time will be counted.</li>
                        <li> You can start quiz at <b>{this.props.data.startTime}</b> and quiz will automatically end after <b>{this.props.data.timeAlloted}</b> minutes. </li>
                        <li> You can't go back once you pass through the question.</li>
                        <li> You have provided enough time to completed the quiz. Please enter strictly at <b>{this.props.data.startTime}</b>.</li>
                    </ul>
                </Typography>
                {/* disabled till start time */}
                <Button 
                    style = {{
                        marginTop : 10
                    }}
                    type = "primary"
                    onClick = {this.props.handleEnterQuiz}
                > Enter Quiz 
                </Button>
            </div>
        )
    }

}

export default GeneralInstruction;