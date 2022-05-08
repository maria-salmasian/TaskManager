const express = require('express');

const authBoard = require ('../authorization/boardAuth');
const authTaskList = require ('../authorization/tasklistAuth');
const authTask = require ('../authorization/taskAuth');

const task = require('../entity/task');

const user = require('../entity/user');
const taskList = require('../entity/taskList');

const router = express.Router();


router.post('/', authTaskList, (request, response) => {
    const {header, taskListId } = request.body;
    if(!header || !taskListId){
        return response.status(400).json({success: false, msg:"bad request"})
    }
    else{
    
        if(request.boardAccess){
     
            if(request.boardAccess ==='User' || request.boardAccess ==='Admin' ) {
                
                const newTask = new Task({
                    header,
                    taskListId,
                    createdBy: request.user.name,
                });
                
                newTask.save()
                    .then(task => {
                        taskList.findByIdAndUpdate({_id: taskListId}, {$push: {tasks: task._id}}, function(err, model)
                    {
                        if (err) {
                            response.status(500).json({ success: false, msg: err });
                        }
                        else {
                            response.json(task);
                        }
                    })
                    })
                    .catch(error => response.status(500).json({success: false, msg: error}));
            }
            else {
                response.status(401).json({ success: false, msg: "access denied" });
            }
        }
        else {
            response.status(401).json({ success: false, msg:"access denied" });
        }
    }
})


router.put('/:taskid',authTask,(request, response) => {
    if(request.boardAccess){
        
        if(request.boardAccess ==='User' || request.boardAccess ==='Admin') {
            var updatedTask = {
                header: request.body.header,
                description: request.body.description,
                completed: request.body.completed,
                taskListId: request.body.taskListId,
                status: request.body.status,
                deadline: request.body.dueDate,
                updatedAt: new Date(),       
            }
            task.findByIdAndUpdate(request.params.taskid, updatedTask, {new: true} , function(err, model)
            {
                if (err) {
                    response.status(500).json({ success: false, msg: err });
                }
                else {
                    response.json(model);
                }
            });
        }
        else {
            response.status(401).json({ success: false, msg: "access denied" })
        }
    }
    else {
        response.status(401).json({ success: false, msg: "access denied" })
    }
})


router.delete('/:taskid', authTask, (request, response) => {
    if(request.boardAccess){
        if(request.boardAccess ==='User' || request.boardAccess ==='Admin') {
            task.findById(request.params.taskid)
                .then(task => {
                    task.remove()
                        .then(()=> {response.json({ success: true })})
                        .catch(error => response.status(500).json({ success: false, msg: error }))
                })
        }
        else {
            response.status(401).json({ success: false, msg: "access denied" })
        }
    }
    else {
        response.status(401).json({ success: false, msg: "access denied" })
    }
})

module.exports = router;