let count = 0;

const countElement = document.querySelector(".count");

const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");


const updateElement = () => {
    countElement.textContent = count.toString();
}

decrementBtn.addEventListener("click", () => {
    count--;
    updateElement();
});

incrementBtn.addEventListener("click", () => {
    count++;
    updateElement();
})

updateElement();
