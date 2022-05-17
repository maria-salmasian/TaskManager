const express = require('express');
const mongoose = require('mongoose');

const users = require('./backend/controller/users');
const boards = require('./backend/controller/boards');
const taskLists = require('./backend/controller/taskList');
const tasks = require('./backend/controller/tasks');
const auth = require('./backend/controller/auth');
const config = require('./backend/common/config/config');
const cors = require('cors');

const app = express();
const port = 5000;

app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use(express.json());

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(error => console.log(error));

app.use('/controller/auth', auth);
app.use('/controller/users', users);
app.use('/controller/boards', boards);
app.use('/controller/tasklists', taskLists);
app.use('/controller/tasks', tasks);


app.listen(port, ()=> {
    console.log(`Server started on ${port}`);
})
