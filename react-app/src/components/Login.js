import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, student number and password
  const [studentNumber, setStudentNumber] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(studentNumber)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { studentNumber, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
    
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === 'auth' 
        ?
        <Container>
          <Form>
          <h1 className="mt-3">Please Log In</h1>
            <Form.Group className='mb-3'>
                <Form.Label>Student Number:</Form.Label>
                <Form.Control type="text" onChange={e => setStudentNumber(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
          </Form>
          <button onClick={auth}>Login</button>
        </Container>
        : <div>
            <p>You are logged in!</p>
            <p>this part should use a different component to render a page and display courses</p>
            <p>for now, click Log In again to log out</p>
          </div>
      }
    </div>
  );
}
  
export default App;