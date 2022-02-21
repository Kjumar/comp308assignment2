import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Spinner, Jumbotron, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/users/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const student = { studentNumber: data.studentNumber, firstName: data.firstName, lastName: data.lastName,
        address: data.address, city: data.city, phoneNumber: data.phoneNumber,
      email: data.email, username: data.username, password: data.password };
  
    axios.delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p>Email: {data.email}</p>
        <p>Student Number: {data.studentNumber}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteStudent(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);
