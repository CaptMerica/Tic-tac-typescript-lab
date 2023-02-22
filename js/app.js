"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.querySelector('#button');
/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('.board').addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
function handleBtnClick(evt) {
    if (!outputEl?.textContent || !inputEl?.value)
        return;
    if (!evt.target || !('id' in evt.target))
        return;
    const currentOutputValue = parseInt(outputEl.textContent);
    const inputValue = parseInt(inputEl.value);
    if (isNaN(currentOutputValue) || isNaN(inputValue))
        return;
    if (evt.target.id === 'plus') {
        outputEl.textContent = (currentOutputValue + inputValue).toString();
    }
    else {
        outputEl.textContent = (currentOutputValue - inputValue).toString();
    }
}
