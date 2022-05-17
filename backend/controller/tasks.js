const express = require('express');

const authBoard = require('../authorization/boardAuth');
const authTaskList = require('../authorization/tasklistAuth');
const authTask = require('../authorization/taskAuth');
const taskService = require('../service/task.service');
const asyncHandler = require('express-async-handler');


const task = require('../entity/task');

const user = require('../entity/user');
const taskList = require('../entity/taskList');

const router = express.Router();


router.post('/', authTaskList, asyncHandler(async (req, res) => {

    if (req.boardAccess) {

        if (req.boardAccess === 'User' || req.boardAccess === 'Admin') {
            const newTask = await taskService.createTask(req.body, req.user.name);
            res.status(201).send(newTask);
        }
        else {
            res.status(401).send({ success: false, msg: "access denied" });
        }
    }
    else {
        res.status(401).send({ success: false, msg: "access denied" });
    }

}))


router.put('/:taskid', authTask, asyncHandler(async (req, res) => {
    const index = req.params['taskid'];
    if (req.boardAccess) {

        if (req.boardAccess === 'User' || req.boardAccess === 'Admin') {
            const updatedTask = await taskService.updateTask(req.body, index);
            res.send(updatedTask);
        }
        else {
            res.status(401).send({ success: false, msg: "access denied" })
        }
    }
    else {
        res.status(401).send({ success: false, msg: "access denied" })
    }
}))

router.delete('/:taskid', authTask, asyncHandler(async (req, res) => {
    if (req.boardAccess) {
        if (req.boardAccess === 'User' || req.boardAccess === 'Admin') {
            const index = req.params['taskid'];
            const deletedTask = await taskService.deleteTask(index);
            res.send({ success: true, deletedTask });
        }
        else {
            res.status(401).send({ success: false, msg: "access denied" })
        }
    }
    else {
        res.status(401).send({ success: false, msg: "access denied" })
    }
}))

module.exports = router;