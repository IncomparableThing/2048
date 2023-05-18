//main2048.js
var board = new Array();
var score = 0;
var hasConflicted = new Array();
 
$(document).ready(function(){
    newgame();
});
 
function newgame(){
    init();
    //在随机的两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}
 
function init(){
    for (var i = 0; i < 4; ++i)
        for (var j = 0; j < 4; ++j) {
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
             
        }
         
    for (var i = 0; i < 4; ++i) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; ++j)
            board[i][j] = 0;
            hasConflicted[i][j] = false;
    }
    score = 0;
    updateScore(score);
     
// 自己初始化4096用来装B = =
// board[0][0] = 121;
// board[0][1] = 213;
// board[0][2] = 438;
// board[0][3] = 1024;
// board[1][0] = 8;
// board[1][1] = 8;
// board[1][2] = 16;
// board[1][3] = 16;
// board[2][0] = 32;
// board[2][1] = 64;
// board[2][2] = 512;
// board[2][3] = 8;
// board[3][0] = 2;
// board[3][1] = 512;
// board[3][2] = 2048;
// board[3][3] = 4096; 
    updateBoardView();
    var showGameover = $('#showGameover');
    showGameover.css('width', '0px');
    showGameover.css('height', '0px');
    showGameover.css('top', "250px");
    showGameover.css('left', "250px");
    showGameover.text("");
}
 
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; ++i)
        for (var j = 0; j < 4; ++j) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');//<-- @_@
            var theNumberCell = $('#number-cell-'+i+'-'+j);
             
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
             
            hasConflicted[i][j] = false;
             
        }
}
 
function generateOneNumber() {
    if (nospace(board))
        return false;
         
    //random position
    var randx = parseInt(Math.floor(Math.random() * 4)); // 0,1,2,3
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0)
            break;
         
        var randx = parseInt(Math.floor(Math.random() * 4)); // 0,1,2,3
        var randy = parseInt(Math.floor(Math.random() * 4));
    }
     
    //random number
    var randNumber = Math.random() < 0.5 ? 2 : 4;
     
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
     
    return true;
}
 
$(document).keydown(function(event){
    switch(event.keyCode) {
        case 37: //left
            if(moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38: //up
            if(moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39: //right
            if(moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break; 
        case 40: //down
            if(moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
    }
});
 
function isgameover() {
    if (nospace(board) && !canMoveLeft(board)
        && !canMoveRight(board) && !canMoveUp(board) && !canMoveRight(board)) {
        gameover();
        return true;
    }
         
    return false;
}
 
function gameover() {
    showGameOver();
}
 
function moveLeft() {
    if(!canMoveLeft(board))
        return false;
    for (var i = 0; i < 4; ++i)
        for (var j = 1; j < 4; ++j) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; ++k) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)
                                && hasConflicted[i][k] == false){
                        //add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
         
    setTimeout("updateBoardView()", 200);
    return true;
}
 
function moveRight(){
    if (!canMoveRight(board))
        return false;
    for (var i = 0; i < 4; ++i) {
        for (var j = 2; j >= 0; --j) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; --k) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)
                                && hasConflicted[i][k] == false){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
 
 
function moveUp() {
    if (!canMoveUp(board))
        return false;
    for (var i = 0; i < 4; ++i)
        for (var j = 1; j < 4; ++j)
            if (board[j][i]) {
                for (var k = 0; k < j; ++k) {
                    if (board[k][i] == 0 && noBlockVertical(i, k, j, board)) {
                        showMoveAnimation(j, i, k ,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                    } else if (board[k][i] == board[j][i] && noBlockVertical(i, k, j, board)
                                && hasConflicted[k][i] == false) {
                        showMoveAnimation(j, i, k ,i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updateScore(score);
                        hasConflicted[k][i] = true;
                    }
                }
            }
    setTimeout("updateBoardView()", 200);
    return true;
}
 
function moveDown() {
    if (!canMoveDown(board))
        return false;
    for (var i = 0; i < 4; ++i) {
        for (var j = 2; j >= 0; --j) {
            if (board[j][i]) {
                for (var k = 3; k > j; --k) {
                    if (board[k][i] == 0 && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(j, i, k ,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                    } else if (board[k][i] == board[j][i] && noBlockVertical(i, j, k, board)
                                && hasConflicted[k][i] == false) {
                        showMoveAnimation(j, i, k ,i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updateScore(score);
                        hasConflicted[k][i] = true;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}