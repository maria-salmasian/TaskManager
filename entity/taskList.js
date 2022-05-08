const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
    taskListName: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
      {
          type: Schema.Types.ObjectId, 
          ref: 'Task'
        }
    ]
})

const TaskList = mongoose.model("taskList", taskListSchema)

module.exports = TaskList 