import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Form, Typography, Button, InputNumber, message } from 'antd';
import './GradeAssignment.css'
import AppBuilder from '../AppBuilder/AppBuilder';
import axios from 'axios';
import SpinCenter from '../../components/Util/SpinCenter';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  marks,
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  data,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    if(title === 'Submitted Assignment') childNode = 
        <a target = "_blank" href = {`http://localhost:3000/documents/${record.file}`}>Assignment</a>;
    else {
        childNode = editing ? (
        <Form.Item
            style={{
            margin: 0,
            }}
            name={dataIndex}
        >
            <InputNumber min = {0} max = {marks} ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
        ) : (
        <div
            className="editable-cell-value-wrap"
            style={{
            paddingRight: 24,
            }}
            onClick={toggleEdit}
        >
            {children}
        </div>
    );
        }
  }

  return <td {...restProps}>{childNode}</td>;
};

class GradeAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        instructor : false,
        postId : '',
        classCode : '',
        loading : true,
        dataSource: [],
        count: 2,
        post : {}
    }
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width : '30%'
      },
      {
        title: 'Submitted Assignment',
        dataIndex: 'file',
        editable : true,
        width : '35%',
      },
      {
        title : 'Assign Marks',
        dataIndex : 'marks',
        editable : true,
      }
    ];
  }

  componentDidMount = async () => {
    let postId = window.location.pathname.substr(26,24);
    this.setState({postId : postId});
    let classCode = window.location.pathname.substr(8,6);
    let post = await axios.post('http://localhost:3000/api/posts/fetchpost', {postId, classCode});
    this.setState({post : post.data});
    this.setState({classCode : classCode});
    let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
    let check = await axios.post('http://localhost:3000/api/posts/is_instructor', {classCode, userId});
    this.setState({instructor : check.data});
    let checkUserEnrolled = await axios.post('http://localhost:3000/api/posts/check_enrolled', 
        {userId, classCode}
    )
    if(checkUserEnrolled.data === "error" || !this.state.instructor) {
        window.alert("The URL you are trying to access is not exist")
        window.location = "/not_found";
        return;
    }
    let data = await axios.post('http://localhost:3000/api/posts/assignments', {postId});
    this.setState({dataSource : data.data});
    this.setState({loading : false});
 }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  saveAssignedMarks = async () => {
      let data = {
          uploadedAssignments : this.state.dataSource,
          postId : this.state.postId
      }
      let res = await axios.post('http://localhost:3000/api/posts/save_marks', data);
      if(res.data === "saved") {
          message.success("Saved Successfully");
      } else {
          message.error("Error Occured");
      }
  }

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          marks : this.state.post.marks,
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const content = this.state.loading ? <SpinCenter />:<>
        <Typography style = {{
            fontFamily :'monospace',
            marginBottom : 10,  
        }}>
            Click on the <b>-1</b> to assign marks to students.
            Make sure to click on <b>Save Changes</b> button to save changes.
            Maximum Marks : <b>{this.state.post.marks}</b>
        </Typography>
        <Table
            scroll
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
        />
        <Button type = 'primary' onClick = {this.saveAssignedMarks} >Save Changes</Button>
    </>
    return (
      <AppBuilder
        heading = "Grade Assignments"
        content = {content}
      />
    );
  }
}

export default GradeAssignment;