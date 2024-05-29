

var playerRed="R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function(){
    setGame();
}

function setGame(){
    board=[];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for(let r=0; r<rows; r++){
        let row=[];
        for(let c = 0; c<columns; c++){
            row.push(' ');
            //<div id="0-0" class="title"></div>
            let title=document.createElement("div");
            title.id=r.toString() + "-" + c.toString();
            title.classList.add("title");
            title.addEventListener("click", setPiece);
            document.getElementById("board").append(title);
        }
        board.push(row);
    }
}

function setPiece() {
    if(gameOver){
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r=currColumns[c];

    if(r<0){
        return;
    }

    board[r][c] = currPlayer;
    let title = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed){
        title.classList.add("red-piece");
        currPlayer = playerYellow;

    }
    else{
        title.classList.add("yellow-piece");
        currPlayer = playerRed;

    }
    r -= 1;
    currColumns[c] = r;

    checkWinner();
    displayTurn();
    
}

function checkWinner(){
    //horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    gameOver=true
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //vertical
    for(let c=0; c<columns; c++){
        for(let r =0; r<rows-3; r++){
            if(board[r][c] != ' '){
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    gameOver=true;
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //diagonal
    for(let r=3; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    gameOver=true
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    // backwards diagonal
    for(let r = 0; r<rows-3; r++){
        for(let c = 0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    gameOver=true;
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    let tie = true;
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            if(board[r][c] == ' '){
                tie = false;
                break;
            }
        }
        if (!tie) break;
    }

    if (tie) {
        gameOver = true;
        alert("It's a tie!");
    }
}

function setWinner(r, c){
    let winner = document.getElementById("winner");
    if(board[r][c] === playerRed){
        winner.innerText = "Red Wins";
    }
    else if(board[r][c] === playerYellow){
        winner.innerText = "Yellow Wins";
    }
    else {
        let isTie = true;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] === '') {
                    isTie = false;
                }
            }
        }
        if (isTie) {
            winner.innerText = "Tie Wins";
        } else {
            winner.innerText = "What did you do?";
        }
    }
    gameOver=true;
}


function displayTurn() {
    let turnDisplay = document.getElementById("turnDisplay");
    if (currPlayer == playerRed) {
        turnDisplay.innerText = "Red's Turn";
    } else {
        turnDisplay.innerText = "Yellow's Turn";
    }
}


