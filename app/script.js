'use strict';

const radioButtons = document.querySelectorAll('[name="theme"]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const outputScreenText = document.querySelector('.calculator-screen--text');
const resetButton = document.querySelector('[data-reset]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

let expressionString = '';
let canChooseOperator = false;

const updateOutputScreenText = function () {
    outputScreenText.textContent = expressionString;
};

// Switch between themes
radioButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const html = document.documentElement;
        html.dataset.theme = this.dataset.toggleTheme;
    });
});

// Append numbers to the screen
numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Prevents uncessary clicking of '.' button
        if (this.textContent === '.' && expressionString.includes('.')) return;

        expressionString += this.textContent;
        updateOutputScreenText();

        canChooseOperator = true;
    });
});

// Add an operator to the screen
operationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Prevents uncessary clicking of operator buttons
        if (!canChooseOperator) return;

        expressionString = `${expressionString} ${this.textContent} `;
        updateOutputScreenText();

        outputScreenText.classList.add('summary');
        canChooseOperator = false;
    });
});

// Reset to default
resetButton.addEventListener('click', function () {
    expressionString = '';
    canChooseOperator = false;
    outputScreenText.classList.remove('summary');
    updateOutputScreenText();
});

// Delete a character from the screen
deleteButton.addEventListener('click', function () {
    expressionString = (expressionString + '').trim().slice(0, -1);
    if (expressionString.length <= 5)
        outputScreenText.classList.remove('summary');
    updateOutputScreenText();
});

// Calculate the expression
equalsButton.addEventListener('click', function () {
    const str = (expressionString + '').replace(/[^-()\d/*+.]/g, '');
    expressionString = eval(str);
    outputScreenText.textContent = expressionString.toLocaleString('en');
    outputScreenText.classList.remove('summary');
});
