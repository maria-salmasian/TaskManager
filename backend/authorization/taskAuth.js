const config = require('../common/config/config');
const jwt = require('jsonwebtoken');

const board = require('../entity/board');
const taskList = require('../entity/taskList');
const task = require('../entity/task');

function authTask(request, response, next) {
    const token = request.header('x-auth-token');
    let boardId = null;
    let taskId = null;

    if(!token){
        return response.status(401).json({success: false, msg: "unauthorized"});    
    }
    try {
        const decoded = jwt.verify (token, config.secret);
        request.user = decoded;

        if (request.params){
            if(request.params.taskid){
                taskId = request.params.taskid;

                task.findById(taskId)
                    .then(task => {
                        if(!task) {
                            
                            return response.status(404).json({success: false, msg: "task not found"});
                        }
                        else {
                            if(!task.taskListId){
                                return response.status(404).json({success: false, msg: "tasklist not found"});
                            }
                            else {
                                taskList.findById(task.taskListId)
                                    .then(taskList => {
                                        if(!taskList) {
                                            return response.status(404).json({success: false, msg: "tasklist not found"});
                                            
                                        }
                                        else {
                                        
                                            if(!taskList.boardId){
                                                return response.status(404).json({success: false, msg: "no board found for task"});
                                            }
                                            else {
                                                board.findById(taskList.boardId)
                                                    .then(board => {
                                                        if(!board) {
                                                            
                                                            return response.status(404).json({success: false, msg: "board not found"});
                                                        }
                                                        else {
                                                            
                                                            if(board.adminUsers.includes(request.user.name || board.createdBy ===request.user.name )) {
                                                                
                                                                request.boardAccess = 'Admin';
                                                            }
                                                            else if (board.invitedUsers.includes(request.user.name) || board.memberUsers.includes(request.user.name) ) {
                                                                
                                                                request.boardAccess = 'User';
                                                            }
                                                            else {
                                                            
                                                                request.boardAccess = 'None';
                                                            }
                                                        }
                                                        next();
                                                    })
                                                    .catch(error => response.status(404).json({success: false, msg: "board not found"}))

                                            }
                                        }
                                    })
                                    .catch(error => response.status(404).json({success: false, msg:"tasklist not found"}))
                            }
                            
                        }
                        
                    })
                    .catch(error => response.status(404).json({success: false, msg: "task not found"}))
            }
        }
    } catch (exception) {
        response.status(401).json({success: false, msg: "unauthorized" + exception});  
    }
}

module.exports = authTask;