const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    description:   {
        type:       String,
        required:   true,
        trim:       true,
    },
    completed: {
        type:       Boolean,
        default:    false,
    },
    owner:  {
        type:       mongoose.Schema.Types.ObjectId,
        required:   true,
        
        ref:        "User"                
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    deadline: {
        type: Date
    },
    taskListId: {
        type:Schema.Types.ObjectId, 
        ref: 'TaskList'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps:     true,
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task