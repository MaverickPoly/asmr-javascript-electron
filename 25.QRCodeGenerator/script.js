const button = document.getElementById("generate")
const input = document.getElementById("qr-input");
const image = document.getElementById("qrcode");

button.addEventListener("click", async () => {
    const value = input.value;
    if (!value) {
        return alert("Please enter a value!");
    }
    const url = await window.electronAPI.generateQRCode(value);
    image.classList.add("active");
    image.src = url;
})
