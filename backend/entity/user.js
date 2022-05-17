const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const Task = require("./task")

const userSchema = new mongoose.Schema({
    name:   {
        type:       String,
        required:   true,
        trim:       true,
    },
    lastName: {
        type: String
    },
    email:  {
        type:       String,
        unique:     true,
        required:   true,
        trim:       true,
        lowercase:  true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        },
    },
    password:   {
        type:       String,
        required:   true,
        trim:       true,
        minlength:  7,
        validate(value) {
            if (value.toLowerCase().includes(" ")) {
                throw new Error("Password is invalid")
            }
        },
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    token: { 
        type: String 
    }

    
}, {
    timestamps:     true,
})


const User = mongoose.model("User", userSchema)
module.exports = User

