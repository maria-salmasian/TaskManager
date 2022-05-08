const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema ({
    boardName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    invitedUsers: {
        type: [String]
    },
    memberUsers: {
        type: [String]
    },
    adminUsers: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: String
    }
});

const Board = mongoose.model("board", boardSchema)

module.exports = Board 