const leftBtns = document.querySelectorAll('.left-button');
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
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const equalsBtn = document.getElementById('equals');

const display = document.querySelector('.display');
let displayValue = '';


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
operatorBtns.forEach((button) => {
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
    displayValue += button.id;
    display.textContent = displayValue;
  }
  button.addEventListener('click', buttonHandler);
});


// clear display
clearBtn.addEventListener('click', () => {
  displayValue = ''
  display.textContent = displayValue;
});


// delete
deleteBtn.addEventListener('click', () => {
  displayValue = displayValue.slice(0, displayValue.length - 1);
  display.textContent = displayValue;
})


// positive/negative
posNegBtn.addEventListener('click', () => {
  if (displayValue.includes('-')) {
    displayValue = displayValue.slice(1, displayValue.length);
  } else {
    displayValue = '-' + displayValue;
  }
  display.textContent = displayValue;
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



function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '*') return multiply(a, b);
  if (operator === '/') return divide(a, b);
};
