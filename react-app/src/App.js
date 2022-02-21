import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
//
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//
import Home from './components/Home';
import Login from './components/Login';


import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of Users</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
        <Route render ={()=> < CreateStudent />} path="/create" />
        <Route render ={()=> < ShowStudent />} path="/show/:id" />
      </div>
    </Router>
  );
}

export default App;
