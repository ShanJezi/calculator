const leftBtns = document.querySelectorAll('.left-button');
const rightBtns = document.querySelectorAll('.right-button');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const delClrBtns = document.querySelectorAll('.del-clr');

const sevenBtn = document.getElementById('7');
const eightBtn = document.getElementById('8');
const nineBtn = document.getElementById('9');
const fourBtn = document.getElementById('4');
const fiveBtn = document.getElementById('5');
const sixBtn = document.getElementById('6');
const oneBtn = document.getElementById('1');
const twoBtn = document.getElementById('2');
const threeBtn = document.getElementById('3');
const decimalBtn = document.getElementById('.');
const zeroBtn = document.getElementById('0');
const posNegBtn = document.getElementById('-');

const deleteBtn = document.getElementById('delete');
const clearBtn = document.getElementById('clear');
const multiplyBtn = document.getElementById('*');
const divideBtn = document.getElementById('/');
const addBtn = document.getElementById('+');
const subtractBtn = document.getElementById('-');
const equalsBtn = document.getElementById('equals');

const display = document.querySelector('.display');
const topDisplay = document.querySelector('.top-display');
let displayValue = '0';
let topDisplayValue = '';

updateDisplay();


// change button styling on hover and click
leftBtns.forEach((button) => {
  button.addEventListener('mouseover', () => {
    button.classList.add('left-button-hover');
  });
  button.addEventListener('mouseout', () => {
    button.classList.remove('left-button-hover');
  });
  button.addEventListener('click', () => {
    button.classList.add('left-button-select');
  })
  //button.addEventListener('transitionend', removeTransition);
});
rightBtns.forEach((button) => {
  button.addEventListener('mouseover', () => {
    button.classList.add('operator-hover');
  });
  button.addEventListener('mouseout', () => {
    button.classList.remove('operator-hover');
  });
  button.addEventListener('click', () => {
    button.classList.add('operator-select');
  })
  //button.addEventListener('transitionend', removeTransition);
});
delClrBtns.forEach((button) => {
  button.addEventListener('mouseover', () => {
    button.classList.add('del-clr-hover');
  });
  button.addEventListener('mouseout', () => {
    button.classList.remove('del-clr-hover');
  });
  button.addEventListener('click', () => {
    button.classList.add('del-clr-select');
  })
  //button.addEventListener('transitionend', removeTransition);
});

// remove button select styling
function removeTransition(e) {
  if(e.propertyName !== 'transform') return;
  this.classList.remove('left-button-select');
  this.classList.remove('operator-select');
  this.classList.remove('del-clr-select');
}


// number buttons populate display
numberBtns.forEach((button) => {
  const buttonHandler = () => {
    if (topDisplayValue.includes('=')) {
      topDisplayValue = '';
      displayValue = '';
      updateDisplay();
    };
    if (displayValue === '0') {
      displayValue = '';
    };
    if (displayValue === '-0') {
      displayValue = '-';
    };
    if (displayValue.length > 9) {
      displayValue = displayValue;
    } else {
      displayValue += button.id;
      updateDisplay();
    }
  }
  button.addEventListener('click', buttonHandler);
});


// clear display
clearBtn.addEventListener('click', () => {
  displayValue = '0';
  topDisplayValue = '';
  updateDisplay();
});


// delete
deleteBtn.addEventListener('click', () => {
  displayValue = displayValue.slice(0, displayValue.length - 1);
  updateDisplay();
})


// positive/negative
posNegBtn.addEventListener('click', () => {
  if (displayValue.includes('-')) {
    displayValue = displayValue.slice(1, displayValue.length);
  } else {
    displayValue = '-' + displayValue;
  }
  updateDisplay();
});


// decimal
decimalBtn.addEventListener('click', () => {
  if (displayValue.includes('.')) {
    displayValue = displayValue;
  } else {
    displayValue = displayValue + '.';
  }
  display.textContent = displayValue;
})


// operators
operatorBtns.forEach((button) => {
  const buttonHandler = () => {
    if (topDisplayValue.includes('=')) {
      topDisplayValue = displayValue + ' ' + button.id + ' ';
      displayValue = '0';
      updateDisplay();
    } else if (topDisplayValue && displayValue) {
      getAnswer();
      topDisplayValue = displayValue + ' ' + button.id + ' ';
      displayValue = '0';
      updateDisplay();
    } else {
      topDisplayValue = displayValue + ' ' + button.id + ' ';
      displayValue = '0';
      updateDisplay();
    }
  };
  button.addEventListener('click', buttonHandler);
});


function getAnswer() {
  let topDisplayArray = topDisplayValue.split(' ');
  let operator = topDisplayArray[1];
  let a = parseFloat(topDisplayArray[0]);
  let b = parseFloat(displayValue);
  if (topDisplayValue.includes('=')) { // makes hitting equals button multiple times perform same operation to previous result
    a = parseFloat(displayValue);
    b = parseFloat(topDisplayArray[2]);
    operate(operator, a, b);
    topDisplayValue = `${a} ${operator} ${b} =`;
  } else if (b === '' || a === '') {
    displayValue = displayValue;
  } else {
    operate(operator, a, b);
    topDisplayValue = `${a} ${operator} ${b} =`;
  };
  updateDisplay();
};


function updateDisplay() {
  if (displayValue === undefined) { // makes divide by zero return error
    display.textContent = "ERROR";
  } else if (topDisplayValue.includes('undefined')) {
    topDisplay.textContent = `${displayValue} = `;
  } else if (displayValue.length > 10) {
    displayValue = parseFloat(displayValue).toExponential(5);
    display.textContent = displayValue;
    topDisplay.textContent = topDisplayValue;
  } else {
    display.textContent = displayValue;
    topDisplay.textContent = topDisplayValue;
  }
}


equalsBtn.addEventListener('click', getAnswer);


// math functions
function add(a, b) {
  displayValue = parseFloat((a + b).toFixed(7)).toString();
}

function subtract(a, b) {
  displayValue = parseFloat((a - b).toFixed(7)).toString();
}

function multiply(a, b) {
  displayValue = parseFloat((a * b).toFixed(7)).toString();
}

function divide(a, b) {
  if (b === 0) {
    displayValue = undefined;
  } else displayValue = parseFloat((a / b).toFixed(7)).toString();
}

function operate(operator, a, b) {
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '*') return multiply(a, b);
  if (operator === '/') return divide(a, b);
};