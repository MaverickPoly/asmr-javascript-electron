const button = document.querySelector(".btn");
const jokeContent = document.querySelector(".joke-content");


async function getJoke() {
    const res = await window.electronAPI.fetchRandomJoke();
    if (res.success) {
        jokeContent.textContent = res.joke;
    } else {
        jokeContent.textContent = "Ooops! Something went wrong..."
    }
}

button.addEventListener("click", getJoke);

getJoke();
