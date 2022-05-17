import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Guest = (props) => {
  return (
    <div style="margin-top:55px; padding-top:55px;" class="container-fluid text-sm-center p-5 bg-info text-white ">
        <Container fluid>
          <h1 className="display-3">Welcome to the Task Manager App</h1>
          <p className="lead">Please register if you are new to this site, else login to enter to plan your tasks</p>
        </Container>
      
    </div>
  );
};

export default Guest;