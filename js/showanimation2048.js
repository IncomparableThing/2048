//showanimation2048.js
function showNumberWithAnimation(i, j, randNumber) { //coord
    var numberCell = $('#number-cell-' + i + "-" + j);
     
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);
     
    numberCell.animate({
        width:"100px",
        height:"100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50); //动画在50毫秒以内完成
}
 
function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}
 
function updateScore(score) {
    $("#score").text(score);
}
 
function showGameOver() {
    var showGameover = $("#showGameover");
 
    showGameover.css('background-color','yellow');
    showGameover.text('Game Over!');
    showGameover.animate({
        width:"250px",
        height:"150px",
        top: "175px",
        left: "125px"
    }, 200);
     
}