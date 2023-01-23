class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    //call clear function everytime create a new calculator
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  //parse and display the numbers user seletced
  appendNumber(number) {
    //check if we already have the period key when type the period key
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  //display the operation user has chosen
  chooseOperation(operation) {
    //if current operand is empty, wont execute the rest of the code
    if (this.currentOperand === "") return;
    //if we typed previous value and current value, we want to execute the code below
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //if we dont have prev value or current value, below function wont be executed
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      //if we dont have valid operation, we dont want to do any computation
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    //if enter nothing or just a decimal place
    if(isNaN(integerDigits)){
      integerDisplay = ''
    }else{
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay
    }
  }
  

  updateDisplay() {
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand)
    if(this.operation != null){
      this.previousOperandTextElement.innerText = 
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }else{
      this.previousOperandTextElement.innerText = ''
    } 
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

let calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
