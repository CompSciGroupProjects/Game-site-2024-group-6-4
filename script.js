let player = false; // false for X, true for O
let log = document.getElementById("log");
let gameEnd = false;
let gameMode = false; // false for 2P, true for 1P
let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let spaces = [
    "top-left", "top", "top-right",
    "left", "center", "right",
    "bottom-left", "bottom", "bottom-right"
];
let board = [ // 0 for empty, -1 for X, 1 for O
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];
let moves = 0;
function play(id) {
    if (gameEnd) {
        return;
    }
    let space = document.getElementById(id);
    if (space.className === "space-empty") {
        if (player) {
            space.innerHTML = "O";
            space.className = "space-p2"
            log.lastElementChild.innerHTML = "O played " + id;
            log.innerHTML += "<p class='p1'>X's turn</p>";
            board[spaces.indexOf(id)] = 1;
        } else {
            space.innerHTML = "X";
            space.className = "space-p1";
            log.lastElementChild.innerHTML = "X played " + id;
            log.innerHTML += "<p class='p2'>O's turn</p>";
            board[spaces.indexOf(id)] = -1;
        }
        let winLocation = checkWin(board, (player) ? 1 : -1);
        if (winLocation !== -1) {
            win(winConditions[winLocation][0],winConditions[winLocation][1],winConditions[winLocation][2]);
        }
        player = !player;
        moves++;
        if (moves === 1 && document.getElementById("game-mode") !== null) {document.getElementById("game-mode").remove();}
        if (!gameEnd && moves === 9) {
            log.lastElementChild.className = "";
            log.lastElementChild.innerHTML = "Tie!";
            gameEnd = true;
            return;
        }
        if (gameMode && player) {botPlay();}
        if (gameEnd && gameMode && player) {
            // this code should not run if the bot plays perfectly
            clearInterval(autoplay);
        }
    }
}
function botPlay() {
    // checking if the bot can win this move and play that move
    for (let i = 0; i < 9; i++) {
        if (checkWin(moveOnBoard(i, 1), 1) !== -1) {
            play(spaces[i]);
            return;
        }
    }
    // checking if the player can win next move and block that move
    for (let i = 0; i < 9; i++) {
        if (checkWin(moveOnBoard(i, -1), -1) !== -1) {
            play(spaces[i]);
            return;
        }
    }
    // bot must play center if player played any other space on the first move
    if (moves === 1 && board[4] === 0) {
        play("center");
        return;
    }
    // bot must play a corner space if player played center on the first move
    if (moves === 1 && board[4] === -1) {
        let corners = [0,2,6,8];
        play(spaces[corners[Math.floor(Math.random() * 4)]]);
        return;
    }
    if (moves === 3) {
        if (board[1] === -1) {
            if (board[3] === -1) {
                // - X -
                // X O -
                // - - -
                play(spaces[[0,2,6][Math.floor(Math.random() * 3)]]);
                return;
            } else if (board[5] === -1) {
                // - X -
                // - O X
                // - - -
                play(spaces[[0,2,8][Math.floor(Math.random() * 3)]]);
                return;
            }
        } else if (board[7] === -1) {
            if (board[3] === -1) {
                // - - -
                // X O -
                // - X -
                play(spaces[[0,6,8][Math.floor(Math.random() * 3)]]);
                return;
            } else if (board[5] === -1) {
                // - - -
                // - O X
                // - X -
                play(spaces[[2,6,8][Math.floor(Math.random() * 3)]]);
                return;
            }
        }
        if (board[4] === -1) {
            // check if player played center then corner, then play any other corner
            if (board[0] === -1) {play(spaces[[2,6,8][Math.floor(Math.random() * 3)]]);return;}
            if (board[2] === -1) {play(spaces[[0,6,8][Math.floor(Math.random() * 3)]]);return;}
            if (board[6] === -1) {play(spaces[[0,2,8][Math.floor(Math.random() * 3)]]);return;}
            if (board[8] === -1) {play(spaces[[0,2,6][Math.floor(Math.random() * 3)]]);return;}
        }
    }
    let possibleMoves = playable();
    play(spaces[possibleMoves[Math.floor(Math.random() * possibleMoves.length)]]);
}
function checkWin(board, player) {
    for (let i = 0; i < winConditions.length && !gameEnd; i++) {
        if (board[winConditions[i][0]] === player
        && board[winConditions[i][1]] === player
        && board[winConditions[i][2]] === player) {
            return i;
        }
    }
    return -1;

}
function playable() {
    let index = 0;
    let possibleMoves = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === 0) {
            possibleMoves[index] = i;
            index++;
        }
    }
    return possibleMoves;
}
function win(space1, space2, space3) {
    let playerId = (player) ? "p2" : "p1";
    log.lastElementChild.className = playerId + " " + playerId + "-highlight";
    log.lastElementChild.innerHTML =  ((player) ? "O" : "X") + " wins!";
    document.getElementById(spaces[space1]).className = "space-" + playerId + " " + playerId + "-highlight";
    document.getElementById(spaces[space2]).className = "space-" + playerId + " " + playerId + "-highlight";
    document.getElementById(spaces[space3]).className = "space-" + playerId + " " + playerId + "-highlight";
    gameEnd = true;
}
function toggleGameMode() {
    gameMode = !gameMode;
    document.getElementById("game-mode").innerHTML = "Game Mode: " + ((gameMode) ? "1 Player" : "2 Player");
}
function moveOnBoard(space, player) {
    let newBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 9; i++) {
        newBoard[i] = board[i];
    }
    if (newBoard[space] === 0) {
        newBoard[space] = player;
    }
    return newBoard;
}
function autoplay() {
    play(spaces[playable()[Math.floor(Math.random() * playable().length)]]);
    if (gameEnd) {
        gameEnd = false;
        moves = 0;
        board = [0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < 9; i++) {
            document.getElementById(spaces[i]).className = "space-empty";
            document.getElementById(spaces[i]).innerHTML = "-";
        }
        document.getElementById("log").innerHTML = "<p>Game start</p><p class='p1'>X's turn</p>";
    }
}