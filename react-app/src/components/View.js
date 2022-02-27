import CreateCourse from './CreateCourse';
import React, { useState } from 'react';
import axios from 'axios';

function View (props) {
    const { screen, setScreen } = props;
    const [data, setData] = useState();
    const [course, setCourse] = useState('');

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
    };

    const createCourse = () => {
        console.log('in createCourse');
        setCourse('y');
    };

    return (
        <div className="App">
        {course !== 'y'
            ? <div>
                <p>{screen}</p>
                <p>{data}</p>
                <button onClick={verifyCookie}>Verify Cookie</button>
                <button onClick={createCourse}>Create Article</button>
                <button onClick={listCourses(data)}>List Articles</button>

                <button onClick={deleteCookie}>Log out</button>
            </div>            
            : <CreateCourse screen={screen} setScreen={setScreen} />
        }
        </div>
    );
}

export default View;