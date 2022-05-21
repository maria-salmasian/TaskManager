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

function Login (props){
const [modal, setModal] = useState(false)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [msg, setMsg] = useState(null)


   propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  (prevProps) = () => {
    const { error, isAuthenticated } = props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
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

  toggle = () => {
    props.clearErrors();
    setState({
      modal: !state.modal,
    });
  };

  onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    const user = {
      email,
      password,
    };
    props.login(user);
  };

  const classes = useStyles();
  return(
    
      <div>
        <NavLink onClick={toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={state.modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>User Login</ModalHeader>
          <ModalBody>
            {state.msg ? (
              <Alert color="danger"> {state.msg} </Alert>
            ) : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
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
                  id="standard-password-input"
                  defaultValue=""
                  size="small"
                  onChange={onChange}
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