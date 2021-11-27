import { Typography, Button, Layout, Col, Row, Divider, message} from "antd";
import React from "react";
import AppBuilder from '../../containers/AppBuilder/AppBuilder';
import CommmentHandler from "../../components/Util/CommentHandler";
import './SubmitAssignment.css'
import SpinCenter from '../../components/Util/SpinCenter';

import axios from "axios";
import { Link } from "react-router-dom";

const {Content} = Layout;
const {Paragraph} = Typography;


class SubmitAssignment extends React.Component {

    state = {
        post : {},
        instructor : false,
        comments : [],
        value : "",
        postId : window.location.pathname.substr(26),
        loading : true,
        title : "",
        file : null,
        userSubmittedDetails : {},
    }

    componentDidMount = async () => {
        let postId = window.location.pathname.substr(26);
        this.setState({postId : postId});
        let classCode = window.location.pathname.substr(8,6);
        this.setState({classCode : classCode});
        let post = await axios.post('http://localhost:3000/api/posts/fetchpost', {postId, classCode});
        this.setState({post : post.data});
        this.setState({title : post.data.title});
        let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
        let check = await axios.post('http://localhost:3000/api/posts/is_instructor', {classCode, userId});
        this.setState({instructor : check.data});
        this.setState({comments : post.data.comments});
        let checkUserEnrolled = await axios.post('http://localhost:3000/api/posts/check_enrolled', 
            {userId, classCode}
        )
        let userDetail = await axios.post('http://localhost:3000/api/posts/get_submitted_details',{userId, postId});
        this.setState({userSubmittedDetails : userDetail.data[0]});
        if(post.data === "error" || checkUserEnrolled.data === "error") {
            window.alert("The URL you are trying to access is not exist")
            window.location = "/not_found";
            return;
        }
        this.setState({loading : false});
    }

    addComment = async () => {
        // console.log(value)
        if(this.state.value !== "") {
            let tempPost = {...this.state.post}
            let comments = [...this.state.post.comments]
            let data = {
                name : JSON.parse(localStorage.getItem('userInfo')).name,
                comment : this.state.value
            }
            comments.push(data);
            this.setState({comments : comments});
            this.setState({value : ""});
            tempPost.comments = comments;
            this.setState({post : tempPost});
            let updatedValue = {
                postId : this.state.postId,
                comments : comments
            }
            console.log(updatedValue);
            await axios.post('http://localhost:3000/api/posts/add_comment', updatedValue)
        }
    }

    changeFile = (value) => {
        this.setState({file : value.target.files[0]});
    }

    uploadFile = async () => {
        if(this.state.file === null) {
            message.error("Please Upload file!");
            return;
        }
        let formdata = new FormData();
        formdata.append("userId", JSON.parse(localStorage.getItem('userInfo'))._id);
        formdata.append("postId", this.state.post._id);
        formdata.append("name", JSON.parse(localStorage.getItem('userInfo')).name)
        formdata.append("email", JSON.parse(localStorage.getItem('userInfo')).email)
        formdata.append("marks", -1);
        formdata.append("file", this.state.file);

        let data = await axios.post('http://localhost:3000/api/posts/upload_assignment', formdata);
        if(data.data === "success") {
            message.success("Uploaded Successfully");
        } else {
            message.error("Some error occured");
        }
    }


    render() {

        const title = this.state.title

        let content = <Layout>
            <Row type="flex" justify="center">
                <Col span={24}>
                    <Content
                        style={{
                        margin: 10,
                        padding: 24,
                        background: "#fff",
                        }}
                    >
                        {this.state.loading ? <SpinCenter /> : <div>
                        <div className = "topContainer">
                            <div className = "description">
                                <Typography style = {{
                                    fontSize : 25,
                                    fontWeight : 'bold',
                                    color : '#404040',
                                    wordBreak : 'normal'
                                }}>
                                    {this.state.post.title}
                                </Typography>
                                <Typography style = {{
                                    marginTop : 10,
                                    fontSize : 14,
                                    color : 'gray'
                                }}>
                                    {this.state.post.description}
                                </Typography>
                                <Typography style = {{
                                    fontSize : 12,
                                    marginTop : 20
                                }}>
                                    <b>Deadline : </b> {this.state.post.deadline}
                                    <br/> 
                                    {this.state.instructor ? <b> Maximum Marks :- {this.state.post.marks} </b> :
                                    this.state.userSubmittedDetails.marks === -1 ?
                                        <> <b>Marks :</b> Not Assigned <b> / {this.state.post.marks} </b> </>
                                    :   <p> <b>Marks :</b> <b> {this.state.userSubmittedDetails.marks} </b> / {this.state.post.marks} </p>}
                                </Typography>
                            </div>
                            <div 
                                className = "upload"
                                style = {{
                                    textAlign : 'center',
                                }}
                            >
                                <Divider/>
                                <Typography 
                                    style = {{fontFamily : 'monospace'}}
                                >
                                    {this.state.instructor ? "Grade" : "Upload"} your assignment here 
                                </Typography>
                                {this.state.instructor ? 
                                <Link to = {`/course/${this.state.classCode}/assignment/${this.state.postId}/grade`}>
                                    <Button
                                        type = "primary"
                                        style = {{marginTop : 20}}
                                    > 
                                        Grade
                                    </Button>
                                </Link>
                                : <>
                                    <label>
                                        <input type="file" id="file" aria-label="File browser example"/>
                                        <span></span>
                                    </label>
                                    <br/>
                                    <Button type = "primary" onClick = {this.uploadFile} > Submit </Button>
                                </>}
                            </div>
                        </div>
                        <Divider />
                        <Typography
                            style = {{
                                fontWeight : 'bold',
                                marginTop : 30
                            }}
                        >
                            Comments
                        </Typography>
                        <CommmentHandler 
                            value = {this.state.value}
                            onChange = {(event) => this.setState({value : event.target.value})}
                            comments = {this.state.comments}
                            addComment = {this.addComment}
                        />
                        </div>}
                    </Content>
                </Col>
            </Row>
        </Layout>
        return (
            <AppBuilder 
                heading = {this.state.instructor ? "Grade Assignment" : "Submit Assignment"} 
                content = {content}
            />
        )
    }

}

export default SubmitAssignment;