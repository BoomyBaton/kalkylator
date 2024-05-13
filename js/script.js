let lcd = null;  
let memory = 0;  
let arithmetic = null;  
let newEntry = false;  

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard');
    keyBoard.addEventListener('click', buttonClick);
}

function buttonClick(e) {
    let btn = e.target.id;
    if (btn[0] === 'b') {  
        addDigit(btn.substring(1));
    } else if (btn === 'comma') {
        addComma();
    } else if (['add', 'sub', 'mul', 'div'].includes(btn)) {
        setOperator(btn);
    } else if (btn === 'enter') {
        calculate();
    } else if (btn === 'clear') {
        memClear();
    }
}

function addDigit(digit) {
    if (newEntry) {
        lcd.value = '';
        newEntry = false;
    }
    lcd.value = (lcd.value === '0') ? digit : lcd.value + digit;
}

function addComma() {
    if (!lcd.value.includes('.')) {
        lcd.value += '.';
    }
}

function setOperator(operator) {
    if (memory !== 0 && arithmetic !== null) {
        calculate();
    } else {
        memory = parseFloat(lcd.value);  
    }
    arithmetic = operator;
    newEntry = true;  
}

function calculate(isEqualsPressed) {
    console.log("Calculating...");  
    if (!newEntry && arithmetic !== null) {
        let current = parseFloat(lcd.value);
        switch (arithmetic) {
            case 'add':
                memory += current;
                break;
            case 'sub':
                memory -= current;
                break;
            case 'mul':
                memory *= current;
                break;
            case 'div':
                memory = (current !== 0) ? memory / current : 'Error';
                break;
        }

        
        if (memory === 1337) {
            lcd.value = "LEET";
        } else {
            lcd.value = memory.toString();
        }

        if (isEqualsPressed) {
            arithmetic = null;  
            memory = 0;  
        }
        newEntry = true;
    }
}


function clearLCD() {
    lcd.value = '0';
}

function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
    newEntry = false;
}

window.onload = init;
