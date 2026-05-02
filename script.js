// =========================================
// STATE VARIABLES
// =========================================

let number1 = null;
let number2 = null;
let operation = null;
let isOver = false;

const display = document.querySelector('#result-display');


// =========================================
// INPUT HANDLING
// =========================================

// Type digits into the display
function typeDigit(digit) {

    // If previous calculation ended, start fresh
    if (isOver) reset();

    // Prevent multiple decimals
    if (digit === '.' && display.value.includes('.')) return;

    // Clear error messages
    if (display.value === 'Enter a valid number' ||
        display.value === 'Enter two valid numbers' ||
        display.value === 'Division by zero is not allowed') {
        display.value = '';
    }

    display.value += digit;
}


// Delete last digit
function deleteDigit() {
    if (isOver) {
        reset();
        return;
    }

    display.value = display.value.slice(0, -1);
}


// Clear display only
function clearInput() {
    display.value = '';
}


// Reset entire calculator
function reset() {
    display.value = '';
    number1 = null;
    number2 = null;
    operation = null;
    isOver = false;
}


// =========================================
// OPERATOR SELECTION
// =========================================

function selectOperator(op) {

    // If user presses operator after finishing a calculation
    if (isOver) {
        const result = parseFloat(display.value.split('=').pop());
        number1 = result;
        isOver = false;
        operation = op;
        clearInput();
        return;
    }

    // Normal operator selection
    if (display.value !== '' && !isNaN(display.value)) {
        number1 = parseFloat(display.value);
        operation = op;
        clearInput();
    } else {
        display.value = 'Enter a valid number';
    }
}


// =========================================
// CALCULATION
// =========================================

function calculate() {

    if (isOver) return;

    if (display.value === '' || isNaN(display.value) || number1 === null) {
        display.value = 'Enter two valid numbers';
        return;
    }

    number2 = parseFloat(display.value);

    let result;

    switch (operation) {
        case '+':
            result = number1 + number2;
            break;

        case '-':
            result = number1 - number2;
            break;

        case '*':
            result = number1 * number2;
            break;

        case '/':
            if (number2 === 0) {
                display.value = 'Division by zero is not allowed';
                isOver = true;
                return;
            }
            result = number1 / number2;
            break;
    }


    display.value = `${number1} ${operation} ${number2} = ${result.toFixed(2)}`;
    isOver = true;
}