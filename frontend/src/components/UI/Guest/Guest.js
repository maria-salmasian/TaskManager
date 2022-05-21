import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Guest = (props) => {
  return (
    <div class="container-fluid text-sm-center p-5 bg-light">
          <h1 className="display-3">Welcome to the Task Manager App</h1>
          <p className="lead">Please register if you are new to this site, else login to enter to plan your tasks</p>      
    </div>
  );
};

export default Guest;