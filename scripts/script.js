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
    calculator.equalsChosen = true;   //Flip flag so the if statement in updateDisplay() is not carried out
    updateDisplay(result);
    calculator.equalsChosen = false;
    calculator.operation = '';       //Make this an empty string so operations can be carried out on the result
});                                  //See the first condition in chooseOperation()

clear.addEventListener('click', () => {
    calculator.displayedNumber = '';
    calculator.firstNumber = '';
    calculator.secondNumber = '';
    calculator.operation = '';
    display.textContent = String.fromCharCode(160);
});

function updateDisplay(num){
    //The if statement below allows the user to enter multiple digits
    if(!calculator.operationChosen && !calculator.equalsChosen && calculator.displayedNumber != 'Err') calculator.displayedNumber = calculator.displayedNumber + num;
    else calculator.displayedNumber = num;
    calculator.operationChosen = false;             //Flip back to false to allow user enter multiple digits
    display.textContent = calculator.displayedNumber;
}

function chooseOperation(selectedOp){
    //The if statement below allows the user to string together operations. The second part of the condition
    //also checks to see if equals has just been pressed and an operation is being performed on the result.

    //calculator.operation and calculator.opeartionChosen are used for separate checks: do I operate in background
    //(used by this function, calculator.operation) or do I add multiple digits (used in updateDisplay(), calculator.opeartionChosen)
    if(calculator.firstNumber != '' && calculator.operation != ''){
        calculator.firstNumber = operate(calculator.operation, +calculator.firstNumber, +calculator.displayedNumber);
    } else {
        calculator.firstNumber = calculator.displayedNumber;
    }
    calculator.operationChosen = true;
    if(selectedOp=="+") calculator.operation = "add";
    else if(selectedOp=="-") calculator.operation = "subtract";
    else if(selectedOp=="X") calculator.operation = "multiply";
    else if (selectedOp=="/") calculator.operation = "divide";
}

//Takes in an operator, then calls the correct function
function operate(operator, a, b){
    if(operator == "divide" && b == 0){
        alert("You cannot divide by 0!");
        calculator.operationChosen = true;
        return 'Err';
    }

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