const resultElement = document.querySelector('.result');
const clearBtn = document.getElementById('clear-button'); 
const deleteBtn = document.getElementById('delete-button'); 
const divideBtn = document.getElementById('divide-button'); 
const multiplyBtn = document.getElementById('multiply-button');
const subtractBtn = document.getElementById('subtract-button'); 
const addBtn = document.getElementById('add-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');

// Initialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

// Function to append number
const appendNumber = (number) => {
    if(number === '.' && result.includes('.')) return;
    result += number;
    updateDisplay();
}

// Function to update display
const updateDisplay = () => {
    if (operation) {
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    } else {
        resultElement.innerText = result;
    }
}

// Function to select operator
const selectOperator = (operatorValue) => {
    if (result === '') return;

    if (operation !== '' && previousOperand !== '') {
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

// Function to calculate result
const calculateResult = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current !== 0 ? prev / current : "Error";
            break;
        default:
            return;
    }

    result = computation.toString();
    operation = '';
    previousOperand = '';
    updateDisplay();
}

// Add event listeners to buttons
numberBtns.forEach(button => { 
    button.addEventListener('click', () => { 
        appendNumber(button.innerText);     
    }); 
});

// Function to clear display
const clearDisplay = () =>{
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
};

// Function to delete last charaacter from disply
const deleteLastDigit = () => {
    if (operation !== "" && result === "") {
      operation = "";
      result = previousOperand;
      previousOperand = "";
      updateDisplay();
    } else {
      result = result.slice(0, -1);
      updateDisplay();
    }
  };

decimalBtn.addEventListener('click', () => appendNumber('.'));
addBtn.addEventListener('click', () => selectOperator('+'));
subtractBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
equalBtn.addEventListener('click', calculateResult);
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);