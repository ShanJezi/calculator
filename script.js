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
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const equalsBtn = document.getElementById('equals');

const display = document.querySelector('.display');
const topDisplay = document.querySelector('.top-display');
let displayValue = '0';
let topDisplayValue = '';

updateDisplay();


function updateDisplay() {
  display.textContent = displayValue;
  topDisplay.textContent = topDisplayValue;
}


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
    if (displayValue === '0') {
      displayValue = '';
    };
    displayValue += button.id;
    updateDisplay();
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



operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    if (topDisplayValue && displayValue) {
      getAnswer();
    }
    topDisplayValue = displayValue + ' ' + button.textContent + ' ';
    displayValue = '0';
    updateDisplay();
  });
});


// add
// addBtn.addEventListener('click', () => {
//   if (topDisplayValue && displayValue) {
//     getAnswer();
//   }
//   topDisplayValue = displayValue + ' ' + addBtn.textContent + ' ';
//   displayValue = '0';
//   updateDisplay();
// })


function getAnswer() {
  let topDisplayArray = topDisplayValue.split(' ');
  let operator = topDisplayArray[1];
  let a = parseFloat(topDisplayArray[0]);
  let b = parseFloat(displayValue);
  operate(operator, a, b);
  updateDisplay();
}

equalsBtn.addEventListener('click', getAnswer);



function add(a, b) {
  displayValue = a + b;
}

function subtract(a, b) {
  displayValue = a - b;
}

function multiply(a, b) {
  displayValue = a * b;
}

function divide(a, b) {
  displayValue = a / b;
}

function operate(operator, a, b) {
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '*') return multiply(a, b);
  if (operator === '/') return divide(a, b);
};
