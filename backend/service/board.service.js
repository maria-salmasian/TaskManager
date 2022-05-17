const NotFoundError = require('../common/errors/not-found.error');
const UnauthorizedError = require('../common/errors/unauthorized.error');
const Board = require("../entity/board");
const TaskList = require("../entity/taskList");


module.exports = {
    async createBoard(body,name){
        const { boardName } = body;
        if(!boardName){
            throw new NotFoundError("BoardName is empty!");
        }
        const newBoard = new Board({
            boardName: body.boardName,
            createdBy: name,
          })
        newBoard.save();
        return newBoard;
    },
    async getBoard(userName){
        const board = await Board.find({
            status: "Active",
            $or: [
              { createdBy: userName },
              { adminUsers: userName },
              { memberUsers: userName },
              { invitedUsers: userName },
            ],
          });
        if(board.length==0){
            throw new NotFoundError("Board not found!")
        }
    },
    async getTaskListByBoardId(boardId){
        const taskList = await TaskList.find({ boardId: boardId }).populate('tasks').exec();
        if(!taskList){
            throw new UnauthorizedError("No access to this board");
        }
        return taskList;
    },
    async removeBoard(boardId){
        const board = Board.findById(boardId);
        if (!board) {
            throw new NotFoundError(`Board with id = ${boardId} is not found!`);
        }
        return board.remove();
    }
}