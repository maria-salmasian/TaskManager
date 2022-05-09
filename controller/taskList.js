const express = require('express');

const authTaskList = require ('../authorization/tasklistAuth');
const authBoard = require ('../authorization/boardAuth');
const taskList = require('../entity/taskList');
const board = require('../entity/board');
const task = require('../entity/task');
const user = require('../entity/user');

const router = express.Router();


router.post('/', authBoard, (request, response) => {
    const {taskListName, boardId} = request.body;
    if(!taskListName || !boardId){
        return response.status(400).json({success: false, msg:"bad request"})
    }
    else{
        if(request.boardAccess){

            if(request.boardAccess ==='Admin') {
                const newTaskList = new TaskList({
                    taskListName: request.body.taskListName,
                    boardId: request.body.boardId
                });
                newTaskList.save()
                    .then(taskList => response.json(taskList))
                    .catch(error => response.status(500).json({success: false, msg: error}));
            }
            else {
                response.status(401).json({ success: false, msg: "access denied" });
            }
        }
        else {
            response.status(401).json({ success: false, msg: "access denied" });
        }
    }
})



router.get('/:tasklistid', authTaskList, (request, response) => {
    
    if(request.boardAccess){
        if(request.boardAccess ==='User' || request.boardAccess ==='Admin') {
            task.find({taskListId: request.params.tasklistid})
                .then(task => { 
                    response.json({taskListId: request.params.tasklistid, task});
                })
                .catch(error => response.status(500).json({success: false, msg: error}))
        }
        else {
            response.status(401).json({ success: false, msg: "access denied"})
        }
    }
    else {
        response.status(401).json({success: false, msg: "access denied"})
    }
})

module.exports = router;