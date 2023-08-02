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

  const checkWin = () => {
    let array = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < 8; i++) {
      if (
        gameboard[array[i][0]] === 'X' &&
        gameboard[array[i][1]] === 'X' &&
        gameboard[array[i][2]] === 'X'
      ) {
        return 1;
      } else if (
        gameboard[array[i][0]] === '0' &&
        gameboard[array[i][1]] === '0' &&
        gameboard[array[i][2]] === '0'
      ) {
        return 2;
      }
    }

    return 0;
  };

  return {
    render,
    update,
    isSquareFilled,
    reset,
    checkWin,
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

    if (Gameboard.checkWin() == 1) {
      console.log('winner x');
    }
    if (Gameboard.checkWin() == 2) {
      console.log('winner 0');
    }
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
