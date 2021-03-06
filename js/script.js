// GLOBAL VARIABLES
var game = [null, null, null, null, null, null, null, null, null];
var winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var playerTurn = 'X';
var counter = 0;

function getPlayerX() {
    var playerX = swal({
        title: "Player X",
        text: "Enter your name",
        type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation: "slide-from-top", },
        function(inputValue){   if (inputValue === false) return false;
            swal("Nice!", "Good luck, " + inputValue, "success"); });
}

function getPlayerO() {
    var playerO = swal({
        title: "Player O",
        text: "Enter your name",
        type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation: "slide-from-top", },
        function(inputValue){   if (inputValue === false) return false;
            swal("Nice!", "Good luck, " + inputValue, "success"); });
}

function doSquareClick() {
    var square = $(this);
    if (counter % 2 === 0) {
        playerTurn = 'X';
    } else {
        playerTurn = 'O';
    };
    square.html(playerTurn);
    square.off('click'); // freeze square after player's turn
    game[this.id] = playerTurn; // add each move to game array
    console.log(game);
    counter++;
    var winner = checkWinner(); // determine game winner
    console.log('winner: ' + winner);
}

function checkWinner() {
    var xWins = winningCombo.some(function(wc) {
        return game[wc[0]] === 'X' && game[wc[1]] === 'X' && game[wc[2]] === 'X';
    });
    if (xWins) {
        swal({
            title: "Very Nice!",
            text: "X wins!",
            imageUrl: "images/borat.png"
        });
        return
    }
    var oWins = winningCombo.some(function(wc) {
        return game[wc[0]] === 'O' && game[wc[1]] === 'O' && game[wc[2]] === 'O';
    });
    if (oWins) {
        swal({
            title: "Mark it O!",
            text: "O wins!",
            imageUrl: "images/walter.png"
        });
        return
    }
    if (counter === 9) {
        swal({
            title: "Cat's Game",
            text: "Try Again",
            imageUrl: "images/grumpycat.png"
        });
    }
}

// GAME PLAY
$(document).ready(function() {
    console.log('ready');
    getPlayerO();
    getPlayerX();
    $('.square').click(doSquareClick);

// CSS Fade Action on Mouseover
$('.square').hover(function() {
    $(this).fadeOut(200);
    $(this).fadeIn(200);
    });
});

// START A NEW GAME
$('#restart').click(newGame);
  function newGame() {
    $('.square').on('click', doSquareClick  ); //unfreeze squares
    game = [null, null, null, null, null, null, null, null, null]; // resets board
    $('.square').text(''); // clear squares
    counter = 0;
}
