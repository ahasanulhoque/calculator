const numPad = document.querySelector("#calculator-numbers");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
let display = document.querySelector("#display");


let calculator = {
    displayedNumber: '',
    firstNumber: '',
    secondNumber: '',
    operation: '',
    operationChosen: true,
    equalsChosen: false,
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        updateDisplay(number.textContent);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperation(operator.textContent);
    });
});

equals.addEventListener('click', () => {
    let result = operate(calculator.operation, +calculator.firstNumber, +calculator.displayedNumber);
    calculator.equalsChosen = true;
    updateDisplay(result);
    calculator.equalsChosen = false;
});

clear.addEventListener('click', () => {
    calculator.displayedNumber = '';
    calculator.firstNumber = '';
    calculator.secondNumber = '';
    calculator.operation = '';
    display.textContent = 0;
});

function updateDisplay(num){
    if(!calculator.operationChosen && !calculator.equalsChosen) calculator.displayedNumber = calculator.displayedNumber + num;
    else calculator.displayedNumber = num;
    calculator.operationChosen = false;
    display.textContent = calculator.displayedNumber;
}

function chooseOperation(selectedOp){
    calculator.operationChosen = true;
    calculator.firstNumber = calculator.displayedNumber;
    if(selectedOp=="+") calculator.operation = "add";
    else if(selectedOp=="-") calculator.operation = "subtract";
    else if(selectedOp=="X") calculator.operation = "multiply";
    else if (selectedOp=="/") calculator.operation = "divide";
}

//Takes in an operator, then calls the correct function
function operate(operator, a, b){
    if(operator == "add") return add(a,b);
    else if(operator == "subtract") return subtract(a,b);
    else if(operator == "multiply") return multiply(a,b);
    else if(operator == "divide") return divide(a,b);
}

//Basic operations are below
function add(a,b){
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}