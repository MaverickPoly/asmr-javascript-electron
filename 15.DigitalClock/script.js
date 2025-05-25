const clock = document.getElementById("clock");

setInterval(updateClock, 1000);


function updateClock() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
}
