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


function SingleBoard (props) {
    const [state, setState] = useState({
      open: false,
      taskListName : ''
    })
   

  function componentDidMount() {
    if (!props.auth.isAuthenticated && props.auth.token) {
      console.log(
        "Token present but it is not authunticated, calling verify token"
      );
      props.verifyToken();
    }
    console.log("Calling getTaskLists with: " + props.boards.workingBoard);
    props.getTaskLists(props.boards.workingBoard);
  }

  const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBoardList = (taskListName) => {
    const newTaskList = {
      taskListName,
      boardId: props.boards.workingBoard,
    };
    console.log(
      "newTaskList: " + newTaskList.taskListName + " , " + newTaskList.boardId
    );
    props.createtaskList(newTaskList);
  };
  const { classes } = props;
  const { taskLists } = props.taskLists;
  const hasTaskLists = props.taskLists.taskLists.taskLists ? true : false;


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