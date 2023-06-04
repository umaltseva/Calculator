// Length Converter
let lengthScale = [
    {
        to: 'm',
        coef: 1
    },
    {
        to: 'cm',
        coef: 0.01
    },
    {
        to: 'km',
        coef: 1000
    }
];

let lengthConvertFromSelect = document.querySelector('.length-converter .convertFrom select');
let lengthConvertToSelect = document.querySelector('.length-converter .convertTo select');
let lengthConvertFromInput = document.querySelector('.length-converter .convertFrom input');
let lengthConvertToInput = document.querySelector('.length-converter .convertTo input');

function convertLength() {
    try {
        let convFrom = lengthConvertFromSelect.selectedIndex;
        let convTo = lengthConvertToSelect.selectedIndex;
        let factor = lengthScale[convFrom].coef / lengthScale[convTo].coef;

        lengthConvertToInput.value = Math.round((Number(lengthConvertFromInput.value) * factor + Number.EPSILON) * 1000000) / 1000000;
    } catch (error) {
        console.log(error);
    }
}

lengthConvertFromSelect.addEventListener('change', convertLength);
lengthConvertToSelect.addEventListener('change', convertLength);
lengthConvertFromInput.addEventListener('input', convertLength);


// Weight Converter
let weightScale = [
    {
        to: 'g',
        coef: 1
    },
    {
        to: 'kg',
        coef: 1000
    },
    {
        to: 't',
        coef: 1000000
    }
];

let weightConvertFromSelect = document.querySelector('.weight-converter .convertFrom select');
let weightConvertToSelect = document.querySelector('.weight-converter .convertTo select');
let weightConvertFromInput = document.querySelector('.weight-converter .convertFrom input');
let weightConvertToInput = document.querySelector('.weight-converter .convertTo input');

function convertWeight() {
    try {
        let convFrom = weightConvertFromSelect.selectedIndex;
        let convTo = weightConvertToSelect.selectedIndex;
        let factor = weightScale[convFrom].coef / weightScale[convTo].coef;

        weightConvertToInput.value = Math.round((Number(weightConvertFromInput.value) * factor + Number.EPSILON) * 1000000) / 1000000;
    } catch (error) {
        console.log(error);
    }
}

weightConvertFromSelect.addEventListener('change', convertWeight);
weightConvertToSelect.addEventListener('change', convertWeight);
weightConvertFromInput.addEventListener('input', convertWeight);


// Area Converter
let areaScale = [
    {
        to: 'cmsquare',
        coef: 1
    },
    {
        to: 'msquare',
        coef: 10000
    },
    {
        to: 'ksquare',
        coef: 1000000000
    },
    {
        to: 'hectare',
        coef: 100000000
    }
];

let areaConvertFromSelect = document.querySelector('.area-converter .convertFrom select');
let areaConvertToSelect = document.querySelector('.area-converter .convertTo select');
let areaConvertFromInput = document.querySelector('.area-converter .convertFrom input');
let areaConvertToInput = document.querySelector('.area-converter .convertTo input');

function convertArea() {
    try {
        let convFrom = areaConvertFromSelect.selectedIndex;
        let convTo = areaConvertToSelect.selectedIndex;
        let factor = areaScale[convFrom].coef / areaScale[convTo].coef;

        areaConvertToInput.value = Math.round((Number(areaConvertFromInput.value) * factor + Number.EPSILON) * 1000000) / 1000000;
    } catch (error) {
        console.log(error);
    }
}

areaConvertFromSelect.addEventListener('change', convertArea);
areaConvertToSelect.addEventListener('change', convertArea);
areaConvertFromInput.addEventListener('input', convertArea);


// Converter Keys
let converterKeys = document.querySelectorAll('.converter-keys .num');
let allClearButton = document.querySelector('.converter-keys .all-clear');

function handleNumberClick() {
    lengthConvertFromInput.value += this.value;
    convertLength();
    weightConvertFromInput.value += this.value;
    convertWeight();
    areaConvertFromInput.value += this.value;
    convertArea();
}

function handleAllClear() {
    lengthConvertFromInput.value = '';
    lengthConvertToInput.value = '';
    weightConvertFromInput.value = '';
    weightConvertToInput.value = '';
    areaConvertFromInput.value = '';
    areaConvertToInput.value = '';
}

converterKeys.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});

allClearButton.addEventListener('click', handleAllClear);

let output = document.querySelector('#output');
let history = document.querySelector('#history');
let memory = '';
let system = 'dec';
let radix = 10;
let numberRegex = /[0-9]+/g;
let systems = ['dec', 'bin', 'hex'];

setDec();

function setDec() {
    document.querySelectorAll('.hex-disable').forEach(el => el.disabled = false);
    document.querySelectorAll('.bin-disable').forEach(el => el.disabled = false);
    document.querySelectorAll('.hex').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.hex-hide').forEach(el => el.style.display = 'block');
    numberRegex = /[0-9]+/g;
    radix = 10;
}

function setBin() {
    document.querySelectorAll('.hex-disable').forEach(el => el.disabled = false);
    document.querySelectorAll('.bin-disable').forEach(el => el.disabled = true);
    document.querySelectorAll('.hex').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.hex-hide').forEach(el => el.style.display = 'block');
    numberRegex = /[0-1]+/g;
    radix = 2;
}

function setHex() {
    document.querySelectorAll('.bin-disable').forEach(el => el.disabled = false);
    document.querySelectorAll('.hex-disable').forEach(el => el.disabled = true);
    document.querySelectorAll('.hex').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.hex-hide').forEach(el => el.style.display = 'none');
    numberRegex = /[0-9A-F]+/gi;
    radix = 16;
}

function changeSystem() {
    let index = systems.indexOf(system);
    index = (index + 1) % systems.length;
    system = systems[index];
    document.querySelector('#systems').innerHTML = system;
    output.value = '';
    switch (system) {
        case 'dec':
            setDec();
            break;
        case 'bin':
            setBin();
            break;
        case 'hex':
            setHex();
            break;
    }
}

function convertToDec(input) {
    return input.replace(numberRegex, match => Number.parseInt(match, radix));
}

function convertFromDec(input) {
    return input.replace(/[0-9]+/g, match => Number.parseInt(match).toString(radix).toUpperCase());
}

function fact(x) {
    if (x == 0) {
        return 1;
    }
    if (x < 0) {
        return undefined;
    }
    for (let i = x - 1; i > 0; i--) {
        x *= i;
    }
    return x;
}

function calculate(input) {
    if (system != 'dec') {
        input = convertToDec(input);
    }
    input = input.replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/√/g, 'Math.sqrt')
        .replace(/e/g, 'Math.E');
    let result = eval(input);
    if (system != 'dec') {
        result = convertFromDec(String(result));
    }
    return result;
}

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    if (/[\+\-×÷%\^]$/gu.test(output.value) && /[\+\-×÷%\^]$/gu.test(value) ||
        (/[\(]$/g.test(output.value) || output.value.length == 0) && /[\+×÷%\^]$/gu.test(value))
        return;

    switch (value) {
        case '=':
            try {
                history.value = output.value;
                output.value = calculate(output.value);
            } catch (e) {
                let prev = output.value;
                output.value = "Error";
                setTimeout(() => {
                    output.value = prev;
                    blockInput = false;
                }, 1500);
            }
            break;
        case 'MS':
            memory = calculate(output.value);
            break;
        case 'MR':
            output.value += String(memory);
            break;
        case 'MC':
            memory = '';
            break;
        case 'M+':
            memory = calculate(String(memory) + "+ (" + output.value + ")");
            break;
        case 'M-':
            memory = calculate(String(memory) + "- (" + output.value + ")");
            break;
        case 'systems':
            changeSystem();
            break;
        case '±':
            output.value = calculate(output.value) * -1;
            break;
        case 'x':
            output.value += '×';
            break;
        case '!':
            output.value = fact(Math.floor(calculate(output.value)));
            break;
        case '√':
            output.value += '√(';
            break;
        case 'all-clear':
            output.value = '';
            break;
        case 'clear':
            output.value = output.value.slice(0, -1);
            break;
        case '0':
        case '00':
            if (output.value.length != 0)
                output.value += value;
            break;
        default:
            output.value += value;
    }
});

function switchMode(id) {
    switch (id) {
        case 'default':
            document.querySelector('.converter').style.display = "none";
            document.querySelector('.calculator').style.display = "block";
            break;
        default:
            document.querySelector('.calculator').style.display = "none";
            document.querySelector('.converter').style.display = "block";
            document.querySelector('.length-converter').style.display = "none";
            document.querySelector('.weight-converter').style.display = "none";
            document.querySelector('.area-converter').style.display = "none";

            document.querySelector(`.${id}`).style.display = "block";
            break;
    }
}
