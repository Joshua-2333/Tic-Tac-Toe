// Player factory
const player = (name, mark) => {
  return { name, mark };
};

// Gameboard factory
const gameboard = (() => {
  const board = Array(9).fill(null);

  const getBoard = () => board;
  const setMark = (index, mark) => {
    if (board[index] === null) {
      board[index] = mark;
    }
  };
  const resetBoard = () => {
    board.fill(null);
  };

  return { getBoard, setMark, resetBoard };
})();

// Game factory
const game = (() => {
  let currentPlayer;
  let gameboardSquares;
  let player1;
  let player2;
  let gameOver = false;
  let gameboardContainer = document.querySelector('.gameboard');

  const startGame = () => {
    player1 = player(document.getElementById('player1-name').value, 'X');
    player2 = player(document.getElementById('player2-name').value, 'O');
    currentPlayer = player1;
    gameboardContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const square = document.createElement('div');
      square.classList.add('gameboard-square');
      square.addEventListener('click', () => {
        if (gameOver) return;
        const mark = currentPlayer.mark;
        gameboard.setMark(i, mark);
        square.textContent = mark;
        square.classList.add(mark);

        if (checkWin(mark)) {
          gameOver = true;
          document.querySelector('.game-result').textContent = `${currentPlayer.name} wins!`;
        } else if (checkDraw()) {
          gameOver = true;
          document.querySelector('.game-result').textContent = 'It\'s a draw!';
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          document.querySelector('.turn-message').textContent = `Turn: ${currentPlayer.name}`;
        }
      });
      gameboardContainer.appendChild(square);
    }
  };

  const checkWin = (mark) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      if (condition.every((index) => gameboard.getBoard()[index] === mark)) {
        return true;
      }
    }

    return false;
  };

  const checkDraw = () => {
    return gameboard.getBoard().every((mark) => mark !== null);
  };

  const restartGame = () => {
    gameOver = false;
    currentPlayer = player1;
    gameboard.resetBoard();
    gameboardContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const square = document.createElement('div');
      square.classList.add('gameboard-square');
      square.addEventListener('click', () => {
        if (gameOver) return;
        const mark = currentPlayer.mark;
        gameboard.setMark(i, mark);
        square.textContent = mark;
        square.classList.add(mark);

        if (checkWin(mark)) {
          gameOver = true;
          document.querySelector('.game-result').textContent = `${currentPlayer.name} wins!`;
        } else if (checkDraw()) {
          gameOver = true;
          document.querySelector('.game-result').textContent = 'It\'s a draw!';
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          document.querySelector('.turn-message').textContent = `Turn: ${currentPlayer.name}`;
        }
      });
      gameboardContainer.appendChild(square);
    }
    document.querySelector('.game-result').textContent = '';
    document.querySelector('.turn-message').textContent = `Turn: ${player1.name}`;
  };

  document.getElementById('start-game-btn').addEventListener('click', startGame);
  document.getElementById('restart-game-btn').addEventListener('click', restartGame);
})();