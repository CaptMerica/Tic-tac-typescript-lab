/*-------------------------------- Constants --------------------------------*/
const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/
let board: (number | null) []
let turn: number 
let winner: boolean
let tie: boolean


/*------------------------ Cached Element References ------------------------*/
const squareEls: NodeListOf<Element> = document.querySelectorAll('.sqr');
const messageEl: HTMLElement | null = document.getElementById('message')!;
const resetBtnEl: HTMLButtonElement | null = document.querySelector('button')!;

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('.board')
addEventListener('click', handleClick);
resetBtnEl?.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

init();

function init(): void {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  render();
}

function placePiece(idx: number): void {
  board[idx] = turn;
}

function handleClick(evt: MouseEvent): void {
  const sqIdx: number = parseInt((<Element>evt.target).id.replace('sq', ''));

  if (isNaN(sqIdx) || board[sqIdx] || winner) return;
  placePiece(sqIdx);
  checkForTie();
  checkForWinner();
  switchPlayerTurn();
  render();
}

function checkForTie(): void {
  if (board.includes(null)) return;
  tie = true;
}

function checkForWinner(): void {
  winningCombos.forEach((combo: number[]) => {
    if (Math.abs((board[combo[0]] as number) + (board[combo[1]] as number) + (board[combo[2]] as number)) === 3) {
      winner = true;
    }
  });
}

function switchPlayerTurn(): void {
  if (winner) return;
  turn *= -1;
}


function render(): void {
  updateBoard();
  updateMessage();
}

function updateBoard(): void {
  board.forEach((boardVal: number | null , idx: number) => {
    if (boardVal === 1) {
      squareEls[idx].textContent = 'X';
    } else if (boardVal === -1) {
      squareEls[idx].textContent = 'O';
    } else {
      squareEls[idx].textContent = '';
    }
  });
}

function updateMessage(): void {
  if (!winner && !tie) {
    messageEl!.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`;
  } else if (!winner && tie) {
    messageEl!.textContent = "Cat's game! Meow!!!";
  } else {
    messageEl!.textContent = `Congratulations! ${turn === 1 ? 'X' : 'O'} wins! `;
  }
}