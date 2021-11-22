import React from "react";
import {Row, Col, Input, Typography, Button, Layout, Affix, Tooltip, InputNumber} from 'antd';
import InputField from "../../../../Util/InputField";
import InputTextArea from "../../../../Util/InputTextArea";
import MultipleChoice from "../../../../Util/MultipleChoice";
import {DeleteOutlined} from '@ant-design/icons'

const {Content} = Layout;

class GenerateQuiz extends React.Component {

    state = {
        title : this.props.data.title,
        description : this.props.data.description,
        questions : [{
            text : "Question",
            description : "Description",
            key : 1,
            options : [{
                val : "",
                id : 1,
                selected : false
            }],
            mid : 1,
            score : 0
        }],
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
                data.options.push({val : "",id : data.mid});
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
                        <Button type="primary" block style = {{marginTop : 30}} onClick = {this.addField}>
                            Add Question
                        </Button>
                    </Affix>
                    {questions}
                </Col>
            </Row>
        )
    }
}

export default GenerateQuiz;