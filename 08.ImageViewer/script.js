const image = document.querySelector("img");

document.querySelector(".open-btn").addEventListener("click", async () => {
    const imagePath = await window.electronAPI.openImage();
    if (imagePath) {
        image.src = imagePath;
        image.classList.remove("hidden");
    }
});