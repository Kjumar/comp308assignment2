import axios from 'axios';
import {Spinner, Jumbotron, Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateCourse(props) {
    //
    const firstName = props.screen;
    console.log('props.screen',props.screen)
    const [course, setcourse] = useState({ _id: '', courseCode: '', courseName: '', section: 000 , semester: '', firstName: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:5000/api/courses"
    //
    const savecourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester, firstName: firstName };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push('/showcourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setcourse({...course, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create a course {firstName} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={savecourse}>
              <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control type="text" name="title" id="title" placeholder="Enter title" value={course.courseCode} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control as="textarea" rows="3" name="content" id="content" placeholder="Enter Content" value={course.courseName} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control as="textarea" rows="3" name="content" id="content" placeholder="Enter Content" value={course.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control as="textarea" rows="3" name="content" id="content" placeholder="Enter Content" value={course.semester} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save course
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateCourse);
