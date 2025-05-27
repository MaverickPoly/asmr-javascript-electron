const status = document.getElementById("status");
const timeInput = document.getElementById("alarm");
const button = document.querySelector(".btn");

let statusInterval = null;
let totalSeconds = 0;

button.onclick = () => {
    const timeValue = timeInput.value;
    if (!timeValue) {
        return alert("Please enter a time!");
    }
    const currentTime = new Date;
    const [curHour, curMin, curSec] = [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()]
    const [hourInp, minuteInp] = timeValue.split(":").map((val) => parseInt(val));

    const totalCur = curHour * 60 * 60 + curMin * 60 + curSec;
    const totalInp = hourInp * 60 * 60 + minuteInp * 60;

    totalSeconds = totalInp - totalCur;

    if (totalSeconds <= 0) {
        totalSeconds += 24 * 3600;
    }
    if (statusInterval) {
        clearInterval(statusInterval);
    }

    statusInterval = setInterval(updateStatus, 1000);
    setTimeout(showNotification, totalSeconds * 1000);
}

function updateStatus() {
    totalSeconds--;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds  % 60;

    const format = (el) => String(el).padStart(2, "0");

    status.textContent = `Left: ${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function showNotification() {
    clearInterval(statusInterval);
    statusInterval = null;

    window.electronAPI.showNotification("Hold on!", "Alarm has rung! Stop coding right now!");
}
