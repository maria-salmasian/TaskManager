const config = require('../common/config/config');
const jwt = require('jsonwebtoken');

const board = require('../entity/board');

function authBoard(request, response, next) {
    const token = request.header('x-auth-token');
    let boardId = null;
    if(!token){
        return response.status(401).json({success: false, msg: "unauthorized"});    
    }
    try {
        const decoded = jwt.verify (token, config.secret);

        if(request.body.boardId){
            boardId = request.body.boardId;
        }
        else if (request.params){
            if(request.params.boardid){
                boardId = request.params.boardid;
            }
        }
        request.user = decoded;

        if (!boardId){
            return response.status(401).json({success: false, msg:"board not found"}); 
        }
        else {
            board.findById(boardId)
                .then(board => {
                    if(!board) {
                        return response.status(404).json({success: false, msg:"board not found"});
                    }
                    else {
                        if(board.adminUsers.includes(request.user.name) || board.createdBy ===request.user.name  ) {
                            
                            request.boardAccess = 'Admin';
                        }
                        else if (board.memberUsers.includes(request.user.name) || board.invitedUsers.includes(request.user.name)) {
                            
                            request.boardAccess = 'User';
                        }
                        else {
                            
                            request.boardAccess = 'None';
                        }
                    }
                    next();
                })
                .catch(error => response.status(404).json({success: false, msg:"board not found"}))
        }
    } catch (exception) {
        response.status(401).json({success: false, msg: messages.AUTH_TOKEN_NOT_VALID + exception});  
    }

    
}

module.exports = authBoard;