import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { getTaskLists, createtaskList } from "../../actions/taskListActions";
import { verifyToken } from "../../actions/authActions";

import NewTaskList from "../../components/UI/TaskList/NewTaskList";
import TaskListSwimLane from "../../components/UI/TaskList/TaskListSwimLane";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
  },
  gridList: {
    transform: "translateZ(0)",
  },
  taskList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "auto",
  },
  paper: {
    padding: 2,
    textAlign: "center",
  },
};

const {classes} = props

function SingleBoard (props) {
    const [open, setOpen] = useState(false)
    const [taskListName, setTaskListName] = useState("")

  componentDidMount() = () => {
    if (!props.auth.isAuthenticated && props.auth.token) {
      console.log(
        "Token present but it is not authunticated, calling verify token"
      );
      props.verifyToken();
    }
    console.log("Calling getTaskLists with: " + props.boards.workingBoard);
    props.getTaskLists(props.boards.workingBoard);
  }

  onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCreateBoardList = (taskListName) => {
    const newTaskList = {
      taskListName,
      boardId: props.boards.workingBoard,
    };
    console.log(
      "newTaskList: " + newTaskList.taskListName + " , " + newTaskList.boardId
    );
    props.createtaskList(newTaskList);
  };


    const showTaskLists = () => {
      if (hasTaskLists) {
        return taskLists.taskLists.map((taskList) => (
          <TaskListSwimLane taskListName= {taskList.taskListName} taskListId={taskList._id} />
        ));
      }

    return (
      <div >
        <div className={classes.root}>
        <Grid container justify="space-around" spacing={3}>
          <Grid item xs={12} sm={3}>
            <h4>{props.boards.workingBoardName}</h4>
          </Grid>
          <Grid item xs={12} sm={3} >
            <NewTaskList handleCreateBoardList={handleCreateBoardList} />
          </Grid>
          </Grid>
          </div>
        <div className={classes.taskList}>
            {showTaskLists()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  error: state.error,
  auth: state.auth,
  taskLists: state.taskLists,
});

export default connect(mapStateToProps, {
  verifyToken,
  getTaskLists,
  createtaskList,
})(withStyles(styles)(SingleBoard));