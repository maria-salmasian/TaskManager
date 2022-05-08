const express = require("express");

const auth = require("../authorization/auth");
const authBoard = require("../authorization/boardAuth");
const board = require("../entity/board");
const taskList = require("../entity/taskList");
const task = require("../entity/task");
const user = require("../entity/user");

const router = express.Router();


router.post("/", auth, (request, response) => {
  const { boardName } = request.body;
  if (!boardName) {
    return response
      .status(400)
      .json({ success: false, msg: "bad request"});
  } else {
    const newBoard = new Board({
      boardName: request.body.boardName,
      createdBy: request.user.name,
    });
    newBoard
      .save()
      .then((board) => response.json(board))
      .catch((error) =>
        resonse.status(500).json({ success: false, msg: error })
      );
  }
});


router.get("/", auth, (request, response) => {
 
  userName = request.user.name;

  board
    .find({
      status: "Active",
      $or: [
        { createdBy: userName },
        { adminUsers: userName },
        { memberUsers: userName },
        { invitedUsers: userName },
      ],
    })
    .then((board) => {
      if (board.length == 0) {
        response
          .status(404)
          .json({ success: false, msg: "board not found"});
      } else {
        response.json(board);
      }
    })
    .catch((error) => resonse.status(500).json({ success: false, msg: error }));
});


router.get("/:boardid", authBoard, async (request, response) => {

  if (request.boardAccess) {
    if (request.boardAccess === "User" || request.boardAccess === "Admin") {
      taskList
        .find({ boardId: request.params.boardid })
        .populate('tasks') 
        .then((taskLists) => {
          response.json({ boardId: request.params.boardid, taskLists });
        })
        .catch((error) =>
          response.status(500).json({ success: false, msg: error })
        );
    } else {
      response
        .status(401)
        .json({ success: false, msg: "access denied"});
    }
  } else {
    response
      .status(401)
      .json({ success: false, msg:"access denied" });
  }
});


router.delete("/:boardid", authBoard, (request, response) => {

  if (request.boardAccess) {

    if (request.boardAccess === "Admin") {
      board.findById(request.params.boardid).then((board) => {
        board
          .remove()
          .then(() => {
            response.json({ success: true });
          })
          .catch((error) =>
            response.status(500).json({ success: false, msg: error })
          );
      });
    } else {
      response
        .status(401)
        .json({ success: false, msg: "access denied"});
    }
  } else {
    response
      .status(401)
      .json({ success: false, msg: "access denied" });
  }
});

module.exports = router;