const textarea = document.querySelector("#markdown");
const html = document.querySelector(".html");



async function convert() {
    const text = textarea.value;
    const mdHtml = await window.markdown.toHtml(text);
    html.innerHTML = mdHtml;
}


