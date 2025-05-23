const inputField = document.querySelector("input");



function addChar(char) {
    inputField.value += char;
}


function clearField() {
    inputField.value = "";
}

function deleteChar() {
    inputField.value = inputField.value.slice(0, -1);
}

function calcPercent() {
    try {
        const val = eval(inputField.value).toString();
        inputField.value = (parseFloat(val) / 100).toString();
    } catch (e) {
        inputField.value = "Error!";
    }
}

function calculate() {
    try {
        inputField.value = eval(inputField.value).toString();
    } catch (e) {
        inputField.value = "Error!";
    }
}

