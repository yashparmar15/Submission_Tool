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
                        <li> Total number of question are "qestion"</li>
                        <li> You have to completed the quiz in the alloted time. If you failed to submit the responses in time, whatever you have selected till that time will be counted.</li>
                        <li> You can start quiz "start time" and quiz will automatically end after "time" time. </li>
                        <li> You can not move to next question before answering the current question </li>
                        <li>You can't go back once you submitted the answer.</li>
                        <li> You have given enough time to completed the quiz. Please enter strictly at "start time".</li>
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