import { Button, Typography, Table } from "antd";
import React from "react";
import axios from "axios";
import SpinCenter from "../Util/SpinCenter";


class GradeQuiz extends React.Component {   // grade quiz page (for instructor)

    state = {
        graded : false,
        dataSource : [],
        loading : false
    }


    gradeQuiz = async () => {    // function for grading the responses of users
        this.setState({graded : true})
        let postId = this.props.postId;
        this.setState({loading : true});
        let res = await axios.post('/api/posts/grade_quiz', {postId});
        this.setState({dataSource : res.data});
        this.setState({loading : false});
    }

    render() {
        const columns = [   // columns for table
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
            {
              title: 'Marks',
              dataIndex: 'score',
            },
            {
                title : "Total Marks",
                dataIndex : 'total'
            }
          ];

        
        return (
            <div style = {{textAlign : 'center'}}>
                <Typography style = {{marginBottom : 10}}>
                    Just one step ahead for quiz evalaution. Click on the below button to grade quizzes.
                </Typography>
                <Button 
                    style = {{marginBottom : 20}} type = 'primary'
                    onClick = {this.gradeQuiz}
                > See Marks
                </Button>
                {this.state.graded ? 
                    this.state.loading ? <SpinCenter /> :
                        <Table columns={columns} dataSource={this.state.dataSource} size="small" />
                : null}
            </div>
        )
    }
}

export default GradeQuiz;