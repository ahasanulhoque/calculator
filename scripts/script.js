const numPad = document.querySelector("#calculator-numbers");
const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector("#decimal");
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const back = document.querySelector('#backspace');
const display = document.querySelector("#display");


let displayedNumber = '';
let firstNumber = '';
let operation = '';
let operationChosen = true;
let equalsChosen = false;


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

decimal.addEventListener('click', () => {
    decimal.setAttribute('disabled', '');
});

equals.addEventListener('click', () => {
    showSolution();
});                                  

back.addEventListener('click', () => {
    deleteLastNumber();
});

clear.addEventListener('click', () => {
    clearDisplay();
});

function updateDisplay(num){
    //The if statement below allows the user to enter multiple digits
    if(!operationChosen && !equalsChosen 
        && displayedNumber != 'Err' & displayedNumber.length <  14){
        displayedNumber = displayedNumber + num;
    } else if(operationChosen || equalsChosen) displayedNumber = num;
    operationChosen = false;             //Flip back to false to allow user enter multiple digits
    display.textContent = displayedNumber;
}

function chooseOperation(selectedOp){
    //The if statement below allows the user to string together operations. The second part of the condition
    //also checks to see if equals has just been pressed and an operation is being performed on the result.

    //operation and opeartionChosen are used for separate checks: do I operate in background
    //(used by this function, operation) or do I add multiple digits (used in updateDisplay(), opeartionChosen)
    if(firstNumber != '' && operation != ''){
        firstNumber = operate(operation, +firstNumber, +displayedNumber);
    } else {
        firstNumber = displayedNumber;
    }
    operationChosen = true;
    if(selectedOp=="+") operation = "add";
    else if(selectedOp=="-") operation = "subtract";
    else if(selectedOp=="X") operation = "multiply";
    else if (selectedOp=="/") operation = "divide";

    decimal.removeAttribute('disabled');
}

//Takes in an operator, then calls the correct function
function operate(operator, a, b){
    if(operator == "divide" && b == 0){
        alert("You cannot divide by 0!");
        operationChosen = true;
        return 'Err';
    }

    if(operator == "add") return add(a,b);
    else if(operator == "subtract") return subtract(a,b);
    else if(operator == "multiply") return multiply(a,b);
    else if(operator == "divide") return divide(a,b);
}

function showSolution(){
    let result = operate(operation, +firstNumber, +displayedNumber);
    equalsChosen = true;   //Flip flag so the if statement in updateDisplay() is not true
    if((result.toString()).indexOf('.') != -1 && (result.toString()).length >= 14) {
        result = result.toFixed(14-(result.toString()).indexOf('.'));
    } else if ((result.toString()).length >= 14) {
        result = result.toExponential(6)
    }
    updateDisplay(result);
    decimal.removeAttribute('disabled');
    operationChosen = true;
    equalsChosen = false;
    operation = '';                 //Make this an empty string so operations can be carried out on the result
}                                   //See the first condition in chooseOperation()

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

function clearDisplay(){
    displayedNumber = '';
    firstNumber = '';
    operation = '';
    decimal.removeAttribute('disabled');
    display.textContent = String.fromCharCode(160);
}

function deleteLastNumber(){
    if(displayedNumber.charAt(displayedNumber.length-1) == '.') decimal.removeAttribute('disabled');
    displayedNumber = displayedNumber.slice(0,displayedNumber.length-1);
    display.textContent = displayedNumber;
}

//Keyboard support
document.addEventListener('keydown', function(e) {
    if(e.key == '0' || e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' || 
        e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' || e.key == '9' ||
        e.key == '.'){
        updateDisplay(e.key);
    } else if(e.key == '+' || e.key == '-' || e.key == 'X' || e.key == '/'){
        chooseOperation(e.key);
    } else if(e.key == '*' || e.key == 'x'){
        chooseOperation('X');
    } else if(e.code == 'KeyC'){
        clearDisplay();
    } else if(e.code == 'Backspace'){
        deleteLastNumber();
    } else if(e.key == '=' || e.code == 'Enter' || e.code == 'NumpadEnter'){
        showSolution();
    }

    if(e.key == '.'){
        decimal.setAttribute('disabled', '');
    }
});