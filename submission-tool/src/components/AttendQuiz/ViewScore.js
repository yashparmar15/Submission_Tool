import React from "react";
import {Result, Typography} from 'antd'


class ViewScore extends React.Component {   // page for seeing score of quiz

    render() {
        return (
            <div style = {{textAlign : 'center'}}>
                <Result
                    status="success"
                    title="Sucessfully Completed Quiz"
                    subTitle= {this.props.score === -1 ? "Marks is not assigned yet." : ""}
                />
                {this.props.score != -1 ?
                    <Typography style = {{fontSize : 20, fontFamily : 'monospace'}}>
                        Marks Obtained :- <b>{this.props.score} / {this.props.total}</b>
                    </Typography>
                : null}
            </div>
        )
    }
}

export default ViewScore;