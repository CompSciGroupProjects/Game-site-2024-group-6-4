const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resultElement = document.getElementById('winner');
const playerResult = document.getElementById('choice');
const compResult = document.getElementById('compChoice');

const computerOptions = ['rock', 'paper', 'scissors'];

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * computerOptions.length);
    return computerOptions[randomNumber];
}

function playGame(playerChoice) {
    const computerChoice = generateComputerChoice();

    if (playerChoice === 'scissors' && computerChoice === 'scissors') {
        resultElement.textContent = 'Draw';
        playerResult.textContent = "Scissors"
        compResult.textContent = "Scissors"
    }else if (playerChoice === 'rock' && computerChoice === 'rock') {
        resultElement.textContent = 'Draw';
        playerResult.textContent = "Rock"
        compResult.textContent = "Rock"
    }else if (playerChoice === 'paper' && computerChoice === 'paper') {
        resultElement.textContent = 'Draw';
        playerResult.textContent = "Paper"
        compResult.textContent = "Paper"
    } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
        resultElement.textContent = 'Player wins';
        playerResult.textContent = "Rock"
        compResult.textContent = "Scissors"
    } else if (playerChoice === 'paper' && computerChoice === 'rock') {
        resultElement.textContent = 'Player wins';
        playerResult.textContent = "Paper"
        compResult.textContent = "Rock"
    } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
        resultElement.textContent = 'Player wins';
        playerResult.textContent = "Scissors"
        compResult.textContent = "Paper"
    } else if (playerChoice === 'rock' && computerChoice === 'paper') {
        resultElement.textContent = 'Computer wins';
        playerResult.textContent = "Rock"
        compResult.textContent = "Paper"
    } else if (playerChoice === 'paper' && computerChoice === 'scissors') {
        resultElement.textContent = 'Computer wins';
        playerResult.textContent = "Paper"
        compResult.textContent = "Scissors"
    } else if (playerChoice === 'scissors' && computerChoice === 'rock') {
        resultElement.textContent = 'Computer wins';
        playerResult.textContent = "Scissors"
        compResult.textContent = "Rock"
    }
}

rockButton.addEventListener('click', () => playGame('rock'));
paperButton.addEventListener('click', () => playGame('paper'));
scissorsButton.addEventListener('click', () => playGame('scissors'));
