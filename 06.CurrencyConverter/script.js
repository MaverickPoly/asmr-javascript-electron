// Get elements
const input = document.querySelector("#input");
const currencySelect = document.querySelector(".currencySelect");
const convertButton = document.querySelector(".btn");
const resultContainer = document.getElementById("result");

let currencyRates;


async function populateCurrencyRates() {
    currencyRates = await window.electron.getCurrencyRates();
    Object.keys(currencyRates).forEach((currency) => {
        const option = document.createElement("option");
        option.text = currency;
        option.value = currency;
        currencySelect.appendChild(option);
    });
}

convertButton.addEventListener("click", () => {
    const amount = input.value;
    const currency = currencySelect.value;
    if (isNaN(amount) || amount <= 0) {
        return alert("Invalid amount!")
    }
    if (!currencyRates) {
        return;
    }

    const res = (currencyRates[currency] * amount).toFixed(1).toString();
    resultContainer.textContent = `${res} ${currency}`;
});

window.addEventListener("DOMContentLoaded", populateCurrencyRates);

