/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, isPlayingGame, winningScore, diceDOM, input;

gameInit();

// Roll dice
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (isPlayingGame) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        diceDOM.src = 'assets/images/dice-' + dice + '.png';
        diceDOM.style.display = 'block';

        // 3. Update the round score IF the rolled number was not a 1
        if (dice !== 1) {
            roundScore += dice;
            // @ts-ignore
            document.querySelector('#current-' + activePlayer).innerText = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

// Hold score
document.querySelector('.btn-hold').addEventListener('click', () => {
    if (isPlayingGame) {
        // Set winning score
        if (input.value) {
            winningScore = input.value;
        } else {
            winningScore = 100;
        }

        scores[activePlayer] = scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).innerText = scores[activePlayer];

        // Set input pointer to none if either of the players score is greater than 0
        if (scores[0] || scores[1]) {
            input.style.pointerEvents = 'none';
            document.querySelector('.input-wrapper').style.cursor = 'not-allowed';
        }

        if (scores[activePlayer] >= winningScore) {
            document
                .querySelector('.player-' + activePlayer + '-panel')
                .classList.add('winner');
            document.getElementById('name-' + activePlayer).innerText = 'Winner!!!';
            document
                .querySelector('.player-' + activePlayer + '-panel')
                .classList.toggle('active');
            isPlayingGame = false;
        } else {
            nextPlayer();
        }
    }
});

// New game
document.querySelector('.btn-new').addEventListener('click', gameInit);

// Initialize the game
function gameInit() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isPlayingGame = true;

    document.querySelector('.player-0-panel').classList.remove('active', 'winner');
    document.querySelector('.player-1-panel').classList.remove('active', 'winner');
    document.getElementById('name-0').innerText = 'Player 1';
    document.getElementById('name-1').innerText = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('score-0').innerText = '0';
    document.getElementById('score-1').innerText = '0';
    document.getElementById('current-0').innerText = '0';
    document.getElementById('current-1').innerText = '0';

    input = document.getElementById('winning-score');
    input.value = '';
    input.style.pointerEvents = 'auto';
    document.querySelector('.input-wrapper').style.cursor = 'pointer';

    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'none';
}

// Next player turn
function nextPlayer() {
    roundScore = 0;
    diceDOM.style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#current-' + activePlayer).innerText = roundScore;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}

// Sanitize input
document.getElementById('winning-score').addEventListener('keypress', e => {
    let key = e.which ? e.which : e.keyCode;
    if (key > 31 && (key < 48 || key > 57)) {
        e.preventDefault();
    }
});
