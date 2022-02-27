import CreateCourse from './CreateCourse';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ListGroup, Spinner} from 'react-bootstrap';

function View (props) {
    const { screen, setScreen, name, setName} = props;
    const [data, setData] = useState();
    const [course, setCourse] = useState('');
    const [courses, setCourses] = useState([]);

    const deleteCookie = async () => {
        try {
            await axios.get('/signout');
            setScreen('auth');
        } catch (e) {
            console.log(e);
        }
    };

    const verifyCookie = async () => {
        axios.get('/welcome')
            .then(result => {
                console.log(result.data);
                setData(result.data);
            }).catch((error) => {
                console.log(error);
            });
    };

    const listCourses = (studentNumber) => {
        console.log('in listCourses: ', studentNumber);
        if (screen !== 'auth' && screen !== undefined)
        {
            axios.put('/api/listcourses', { studentNumber: screen})
                .then(result => {
                    console.log(result.data);
                    if (result.data !== null) { setCourses(result.data); }
                    else { setCourses([]); }
                }).catch((error) => {
                    console.log(error);
                });
        }
    };

    const createCourse = () => {
        console.log('in createCourse');
        setCourse('y');
    };

    const showCourseDetail = (id) => {
        axios.put('/api/removecourse', {courseId: id, studentNumber: data})
            .then(result => {
                console.log(result.data);
                listCourses(screen);
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        verifyCookie();
      }, []); //only the first render

    return (
        <div className="App">
        {course !== 'y'
            ? <div>
                <p>{name}</p>
                <p>{data}</p>
                <button onClick={verifyCookie}>Verify Cookie</button>
                <button onClick={createCourse}>Create Course</button>
                <button onClick={() => listCourses(data)}>List Courses</button>

                <button onClick={deleteCookie}>Log out</button>

                {courses.length !== 0
                    ?
                    <ListGroup>
                        {courses.map((item, idx) => (
                        <ListGroup.Item key={idx} action onClick={() => { showCourseDetail(item._id) }}>
                            {item.courseCode} - {item.courseName} - {item.semester} - Sec. {item.section}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    :
                    <div>
                        <p>no courses to show</p>
                    </div>
                }
            </div>            
            : <CreateCourse screen={screen} setScreen={setScreen} />
        }
        </div>
    );
}

export default View;