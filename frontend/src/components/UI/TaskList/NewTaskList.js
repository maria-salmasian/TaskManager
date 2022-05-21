import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";


import { Modal, ModalHeader } from "reactstrap";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(55),
      height: theme.spacing(55),
    },
  },
  textField: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(2),
    width: "40ch",
  },
  button: {
    backgroundColor: "#2874a6",
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "45ch",
    height: "5ch",
  },
});

function NewTaskList(props) {
  const[state, setState] = useState({
    value:null,
    open:false
  })

  const handleChange = (event) => {
    setState({value: event.target.value});
  };

  const toggle = () => {
    setState({open: !state.open});
  };

  const handleCreateBoardList = () => {
    console.log("Value is: " + state.value);
    props.handleCreateBoardList(state.value);
  };

  const { classes } = props;
    const newColumnBody =()=> (
      <div className={classes.root}>
        <Modal
          isOpen={state.open}
          toggle={toggle}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ModalHeader toggle={toggle}>Add New Column</ModalHeader>
          {props.error.status ? (
              <Alert severity="error">{props.error.msg.msg}</Alert>
            ) : null}
          <TextField
            className={classes.textField}
            name="taskListName"
            label="Task List Name"
            id="standard-size-small"
            defaultValue=""
            size="small"
            onChange={handleChange}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleCreateBoardList}
          >
            ADD
          </Button>
        </Modal>
      </div>
    );


    
    
  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={toggle}
      >
        ADD COLUMN
      </Button>
      {newColumnBody}
    </div>
  );
  
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  error: state.error,
  auth: state.auth,
  taskLists: state.taskLists,
});

export default connect(mapStateToProps, null)(withStyles(useStyles)(NewTaskList));