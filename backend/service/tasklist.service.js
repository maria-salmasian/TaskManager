const NotFoundError = require("../common/errors/not-found.error");
const TaskList = require('../entity/taskList');


module.exports ={
    async createTaskList(body){
        const {taskListName, boardId} = body;
        if(!taskListName || !boardId){
            return new NotFoundError("name or id are empty");
        }
        const taskList = new TaskList(body);
        taskList.save();
        return taskList;
    },
    async getTaskList(taskListId){
        const taskList = await TaskList.findById(taskListId);
        if(!taskList){
            throw new NotFoundError(`Tasklist with id = ${taskListId} is not found!`)
        }
        return taskList.save();
    }
}