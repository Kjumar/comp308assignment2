
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
            <h1 class="display-4">Lab Assignment 2 - Express - React with CRUD Operations</h1>
            <p class="lead">This is the front end for Home Page</p>
            </div>
        </div>
    );

}

export default withRouter(Home);