'use strict';

// Elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

//game
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

let totalScore, currentScore, activePlayer, isPlay;

const initGame = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlay = true;
  current0.textContent = 0;
  current1.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  diceElement.classList.add('hidden');
};
initGame();

function switchActivePlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
  if (isPlay) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('hidden');
    diceElement.src = `dice${randomNumber}.png`;

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlay) {
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] >= 100) {
      isPlay = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
