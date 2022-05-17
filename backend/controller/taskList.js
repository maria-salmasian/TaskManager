const express = require('express');

const authTaskList = require('../authorization/tasklistAuth');
const authBoard = require('../authorization/boardAuth');
const asyncHandler = require('express-async-handler');
const taskListService = require('../service/tasklist.service');

const router = express.Router();

router.post('/', authBoard, asyncHandler(async (req, res) => {

    if (req.boardAccess) {
        if (req.boardAccess === 'Admin') {
            const newTaskList = taskListService.createTaskList(req.body);
            res.status(201).send(newTaskList);
        }
        else {
            res.status(401).send({ success: false, msg: "access denied" });
        }
    }
    else {
        res.status(401).send({ success: false, msg: "access denied" });
    }

}))

router.get('/:tasklistid', authTaskList, asyncHandler(async (req, res) => {

    if (req.boardAccess) {
        if (req.boardAccess === 'User' || req.boardAccess === 'Admin') {
            const index = req.params['tasklistid'];
            const taskList = taskListService.getTaskList(index);
            res.send(taskList);
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