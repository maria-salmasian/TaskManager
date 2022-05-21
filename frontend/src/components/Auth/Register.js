import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import { register } from "../../actions/authActions";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import {
  NavLink,
  Alert,
  Button,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(55),
      height: theme.spacing(40),
    },
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(2),
    width: "40ch",
  },
  button: {
    backgroundColor: "#2874a6",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(5),
    width: "45ch",
  },
});

const Register = (props)=> {
  const [state, setState] = useState({
    form: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
    modal: false,
    msg: null,
  });

   const propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  const componentDidUpdate = (prevProps) => {
    const { error, isAuthenticated } = props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        setState({ msg: error.msg.msg });
      } else {
        setState({ msg: null });
      }
    }

    if (state.modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }

  const toggle = () => {
    props.clearErrors();
    setState({
      modal: !state.modal,
    });
  };

  const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = state;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    props.register(newUser);
  };
  const { classes } = props;


    return (
      <div>
        <NavLink onClick={toggle} href="#">
          Register
        </NavLink>
        <Modal
          isOpen={state.modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>Please Register</ModalHeader>
          <ModalBody>
            {state.msg ? (
              <Alert color="danger"> {state.msg} </Alert>
            ) : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <TextField
                  className={classes.textField}
                  name="firstName"
                  label="First Name"
                  id="standard-size-firstName"
                  defaultValue=""
                  size="small"
                  onChange={onChange}
                />
                <TextField
                  className={classes.textField}
                  name="lastName"
                  label="Last Name"
                  id="standard-size-lastName"
                  defaultValue=""
                  size="small"
                  onChange={onChange}
                />
                <TextField
                  className={classes.textField}
                  name="email"
                  label="Email"
                  id="standard-size-email"
                  defaultValue=""
                  size="small"
                  onChange={onChange}
                />
                <TextField
                  className={classes.textField}
                  name="password"
                  label="Password"
                  type="password"
                  id="standard-size-password"
                  defaultValue=""
                  size="small"
                  onChange={onChange}
                />
                <Button className={classes.button}>Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  withStyles(useStyles)(Register)
);