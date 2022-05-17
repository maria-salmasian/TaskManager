import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import NewTask from "../Task/NewTask";
import Task from "../Task/Task";
import { createTask } from "../../../actions/taskListActions";

const {classes} = props

const useStyles = (theme) =>({
  root: {
    minWidth: 300,
    marginLeft: 25,
    backgroundColor: "#f2f2f2",
  },
  media: {
    height: 140,
  },
});

function TaskListSwimLane(props) {
    const [newTask, setNewTask] = useState(false)
    const [newTaskTitle, setnewTaskTitle] = useState(null)


  addAnotherTask = () => {
    setState({ newTask: true });
  };

  addTask = (props) => {
    const newTask = {
        header: state.newTaskTitle,
        taskListId: props.taskListId
    };
    console.log('Calling create task');
    props.createTask(newTask);

  };

  disableNewTak= () => {
    setState({newTask: false});
  };

  setNewTaskTitle = (title) => {
    setState({
        ...state,
        newTaskTitle: title
    });
  }




  const newTaskControls = () => (
      <div>
        <Button size="small" color="primary" onClick = {addTask}>
          Add Task
        </Button>
        <Button size="small" color="primary" onClick = {disableNewTak}>
          Delete
        </Button>
      </div>
  );
  const taskListControls = () => (
      <Button size="small" color="primary" onClick={addAnotherTask}>
          Add Another Task
      </Button>
  );

  let tasks = [];
  console.log("Before Filter, taskList is: " + props.taskLists.taskLists.taskLists[0]);
  props.taskLists.taskLists.taskLists.filter((taskList)=> {
   return taskList.taskListName ===props.taskListName;
  })
  .map((taskList) => {
    taskList.tasks.map((task) => {
      tasks.push(<Task header= {task.header}></Task>);
    });
  });

  
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="body1" component="p" align="left">
            {props.taskListName}
          </Typography>
    <div>{tasks}</div>
          {state.newTask ? <NewTask setNewTaskTitle= {setNewTaskTitle}/> : null}
        </CardContent>
        <CardActions>
            {state.newTask ? newTaskControls : taskListControls}
        </CardActions>
      </Card>
    );
  
};

const mapStateToProps = (state) => ({
    boards: state.boards,
    error: state.error,
    auth: state.auth,
    taskLists: state.taskLists,
  });

export default connect(mapStateToProps, {
    createTask
  }) (withStyles(useStyles)(TaskListSwimLane));