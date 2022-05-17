const Task = require('../entity/task');
const TaskList = require('../entity/taskList');


module.exports = {
    async createTask(body,userName){
        const {header, taskListId } = body;
        if(!header || !taskListId){
            throw new NotFoundError("Header or id are missing")       
         }
        const newTask = new Task({
            header,
            taskListId,
            createdBy: userName,
        });
        newTask.save();
        TaskList.findByIdAndUpdate({_id: taskListId}, {$push: {tasks: newTask._id}});
        return newTask;
    },
    async updateTask(body,taskId){
        const updatedTask = {
            header: body.header,
            description: body.description,
            completed: body.completed,
            taskListId: body.taskListId,
            status: body.status,
            deadline: body.dueDate,
            updatedAt: new Date(),       
        }
        const task = Task.findByIdAndUpdate(taskId, updatedTask, {new: true});
        return task;
    },
    async deleteTask(taskId){
        const task = Task.findById(taskId);
        if(!task){
            throw new NotFoundError("This task doesn't exist");
        }
        return task.remove();
    }

}