const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    let boardHTML = '';
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id=square-${index}">${square}</div>`;
    });
    document.querySelector('.gameboard').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const isSquareFilled = (index) => {
    return gameboard[index] !== '';
  };

  const reset = () => {
    document.querySelectorAll('.square').forEach((square) => {
      square.removeEventListener('click', Game.handleClick);
      square.remove();
    });
  };

  return {
    render,
    update,
    isSquareFilled,
    reset,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector('#player1').value, 'X'),
      createPlayer(document.querySelector('#player2').value, '0'),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', handleClick);
    });
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split('-')[1]);

    if (Gameboard.isSquareFilled(index)) {
      return;
    }

    Gameboard.update(index, players[currentPlayerIndex].mark);

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    handleClick,
  };
})();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
  Game.start();
});

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', () => {
  Gameboard.reset();
});
