import React from "react";
import {Row, Col, Input, Typography, Button, Layout, Affix, Tooltip, InputNumber, message} from 'antd';
import InputField from "../../../../Util/InputField";
import InputTextArea from "../../../../Util/InputTextArea";
import MultipleChoice from "../../../../Util/MultipleChoice";
import {DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';

const {Content} = Layout;

class GenerateQuiz extends React.Component {

    state = {
        title : this.props.data.title,
        description : this.props.data.description === undefined ? "" : this.props.data.description,
        startTiming : this.props.data.startTiming,
        timeAlloted : this.props.data.timeAlloted,
        classId : this.props.classId,
        questions : [{
            text : "",
            description : "",
            key : 1,
            options : [{
                val : "",
                id : 1,
                selected : false
            }],
            mid : 1,
            score : 0
        }],
        postId : "",
        loading : false
    }

    saveQuizChanges = async () => {
        let questions = [...this.state.questions];
        let finalQuestions = []
        for(let i = 0 ; i < questions.length ; i++) {
            if(questions[i].text === "") {
                message.error("Question text can't be empty!");
                return;
            }
            if(questions[i].score === 0) {
                message.error("Score can't be zero");
                return;
            }
            let options = [...questions[i].options];
            if(!options || options.length <= 1) {
                message.warning("Please provide atleast two options!")
                return;
            }
            let checkAnswerSelected = false;
            let finalOptions = [];
            let answer = "";
            for(let j = 0 ; j < options.length ; j++) {
                if(options[j].val === "") {
                    message.error("Options can't be empty!");
                    return;
                }
                if(options[j].selected) {
                    answer = options[j].val;
                }
                checkAnswerSelected = checkAnswerSelected || options[j].selected;
                finalOptions.push(options[j].val);
            }
            if(checkAnswerSelected === false) {
                message.warning("Please select answer for each questions");
                return;
            }

            let question = {
                question : questions[i].text,
                description : questions[i].description,
                options : finalOptions,
                marks : questions[i].score,
                answer : answer
            }
            finalQuestions.push(question);
        }
        // console.log(this.props)
        let data = {
            title : this.state.title,
            description : this.state.description,
            startTime : this.props.startingTime,
            timeAlloted : this.state.timeAlloted,
            questions : finalQuestions
        }
        this.setState({loading : true});
        let classId = this.state.classId;
        console.log(data);
        let postId = this.state.postId;
        let res = await axios.post('http://localhost:3000/api/posts/create_quiz',{data,classId,postId});
        this.setState({postId : res.data});
        this.setState({loading : false});
        message.success("Successfully saved!")
    }

    addField = () => {
        let arr = [...this.state.questions];
        let obj = {
            text : "",
            key : arr.length + 1,
            description : "",
            options : [{
                val : "",
                id : 1,
            }],
            mid : 1,
            score : 0
        }
        arr.push(obj);
        this.setState({questions : arr});
    }

    deleteField = (key) => {
        let arr = [...this.state.questions];
        this.setState({undo : arr});
        arr = arr.filter((val) => val.key !== key);
        for(let i = 0 ; i < arr.length ; i++){
            arr[i].key = i + 1;
        }
        this.setState({questions: arr});
    }

    changeLabel = (val,key) => {
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key)
                data.text = val;
            return data;
        })

        this.setState({questions : arr});
    }

    changeScore = (score,key) => {
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key)
                data.score = score;
            return data;
        })

        this.setState({questions : arr});
    }

    changeDescription = (val,key) => {
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key)
                data.description = val;
            return data;
        })

        this.setState({questions : arr});
    }

    changeOptionLabel = (val,key,id) => { 
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key){
                data.options = data.options.map(temp => {
                    if(temp.id === id){
                        temp.val = val;
                    }
                    return temp;  
                })
            }
            return data;
        })

        this.setState({questions : arr});
    }

    removeMultipleChoiceOption = (key,id) => {
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key){
                let temp = [...data.options];
                temp = temp.filter((v) => v.id !== id);
                for(let i = 0 ; i < temp.length ; i++){
                    temp[i].id = i + 1;
                }
                data.options = temp;
                data.mid = temp.length;
            }
            return data;
        })
        this.setState({questions : arr});
    }

    selectAnswerOption = (key,id) => {
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key){
                data.options = data.options.map(temp => {
                    if(temp.id === id){
                        temp.selected = true;
                    } else {
                        temp.selected = false;
                    }
                    return temp;  
                })
            }
            return data;
        })
        this.setState({questions : arr});
    }

    addMultipleChoiceOption = (key) => { 
        let arr = [...this.state.questions];
        arr = arr.map(data => {
            if(data.key === key) {
                data.mid = data.mid + 1;
                data.options.push({val : "",id : data.mid, selected : false});
            }
            return data;
        })
        this.setState({questions: arr});
    }

    render() {

        let questions = this.state.questions.map(data => (
                <Content
                    style={{
                        marginTop : 10,
                        marginBottom : 10,
                        padding: 24,
                        background: "#fff",
                        borderRadius : 10
                    }}
                    key = {data.key}
                >
                    <InputField 
                        value = {data.text}
                        placeholder = "Question" 
                        size = "small" 
                        val = {16} 
                        onChange = {(event) => this.changeLabel(event.target.value,data.key)}
                    />
                    <InputTextArea
                        fontsize = {12} 
                        onChange = {event => this.changeDescription(event.target.value,data.key)}
                        placeholder = "Description"
                        description = {data.description}
                    /> 
                    <div style = {{marginTop : 20}}>
                        {data.options.map(temp => (
                        <MultipleChoice
                            len = {data.options.length}
                            checkbox = {false}
                            placeholder = "Option"
                            value = {temp.val}
                            key = {temp.id}
                            selected = {temp.selected}
                            onChange = {(event) => this.changeOptionLabel(event.target.value,data.key,temp.id,1)}
                            remove = {() => this.removeMultipleChoiceOption(data.key,temp.id)}
                            onOptionSelected = {() => this.selectAnswerOption(data.key,temp.id)}
                        />
                        ))}
                        <Button 
                            onClick = {() => this.addMultipleChoiceOption(data.key,0)}
                            style = {{
                                marginRight : 10,
                                marginTop : 10
                            }}
                        >
                            Add Option
                        </Button>
                        <Tooltip title = "Delete question">
                            <Button 
                                style = {{color : 'red'}} 
                                icon = {<DeleteOutlined/>}
                                onClick = {() => this.deleteField(data.key)}
                            />
                        </Tooltip>
                        <InputNumber 
                            style = {{marginTop : 10, marginLeft : 10}}
                            placeholder = "Score"
                            min = {0}
                            max = {100}
                            value = {data.score !== 0 ? data.score : null}
                            onChange = {(event) => this.changeScore(event,data.key)}
                        />
                    </div>
                </Content>
            ));
    
        return (
            <Row type="flex" justify="center">
                <Col span = {18} style = {{alignItems : 'center' ,textAlign : 'center',margin : 10}}>
                    <Typography style = {{fontSize : 30, fontWeight : 'bold'}}>
                        Create Questions
                    </Typography>
                    <p style = {{color : 'gray'}}> Click on the option to mark it as answer </p>
                    <Input 
                        value = {this.state.title}
                        placeholder = "Untitled Quiz"
                        style = {{
                            fontSize : 25,
                            border : 0,
                            color : 'gray',
                            borderRadius : 5
                        }}
                        onChange = {event => this.setState({title : event.target.value})}
                    />
                    <Input.TextArea
                        value = {this.state.description}
                        placeholder = "Description goes here"
                        style = {{
                            border : 0,
                            fontSize : 12,
                            marginTop : 10,
                            color : 'gray',
                            borderRadius : 5
                        }}
                        onChange = {event => this.setState({description : event.target.value})}
                    />
                    <Affix offsetTop = {50}>
                        <Button type="dashed" block style = {{marginTop : 30}} onClick = {this.addField}>
                            Add Question
                        </Button>
                        {/* <Button type = "primary">Save Quiz</Button> */}
                    </Affix>
                    {questions}
                    <Button 
                        type = "primary"
                        onClick = {this.saveQuizChanges}
                    >
                        {!this.state.loading ? "Save Changes" : "Saving..."}
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default GenerateQuiz;