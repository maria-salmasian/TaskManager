const express = require("express");

const auth = require("../authorization/auth");
const authBoard = require("../authorization/boardAuth");
const asyncHandler = require('express-async-handler');
const boardService = require('../service/board.service');
const router = express.Router();


router.post("/", auth, asyncHandler(async (req, res) => {
  const name = req.user.name;
  const newBoard = await boardService.createBoard(req.body, name);
  res.status(201).send(newBoard);
}));


router.get("/", auth, asyncHandler(async (req, res, next) => {
  userName = req.user.name;
  const result = boardService.getTaskListByBoardId(userName);
  res.send(result);

}));


router.get("/:boardid", authBoard, asyncHandler(async (req, res, next) => {

  if (req.boardAccess) {
    if (req.boardAccess === "User" || req.boardAccess === "Admin") {
      const index = req.params['boardid'];
      const taskList = boardService.getTaskList(index);
      res.send(taskList);
    } else {
      res.status(401).send({ success: false, msg: "access denied" });

    }
  } else {
    res.status(401).send({ success: false, msg: "access denied" });
  }
}));


router.delete("/:boardid", authBoard, asyncHandler(async (req, res) => {

  if (request.boardAccess) {
    if (request.boardAccess === "Admin") {
      const index = req.params['boardid'];
      const board = boardService.removeBoard(index);
      res.send(board);
    } else {
      res.status(401).send({ success: false, msg: "access denied" });
    }
  } else {
    res.status(401).send({ success: false, msg: "access denied" });
  }
}));

module.exports = router;