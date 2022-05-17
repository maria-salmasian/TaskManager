import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import TextField from "@material-ui/core/TextField";

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

const {classes} = useStyles()

function Login (props){
const [modal, setModal] = useState(false)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [msg, setMsg] = useState(null)


   PropTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  function componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        useState({ msg: error.msg.msg });
      } else {
        useState({ msg: null });
      }
    }

    if (state.modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }

  toggle = () => {
    props.clearErrors();
    useState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    useState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    // Login
    props.login(user);
  };

  const classes = props;
  return(
    
      <div>
        <NavLink onClick={toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={state.modal} toggle={this.toggle}>
          <ModalHeader toggle={toggle}>User Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger"> {state.msg} </Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <TextField
                  className={classes.textField}
                  name="email"
                  label="Email"
                  id="standard-size-email"
                  defaultValue=""
                  size="small"
                  onChange={this.onChange}
                />
                <TextField
                  className={classes.textField}
                  name="password"
                  label="Password"
                  type="password"
                  id="standard-password-input"
                  defaultValue=""
                  size="small"
                  onChange={this.onChange}
                />

                <Button
                  className={classes.button}
                >
                  Login
                </Button>
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

export default connect(mapStateToProps, { login, clearErrors })(
  withStyles(useStyles)(Login)
);