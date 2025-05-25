const markdown = require("markdown").markdown;

const markdownToHtml = (text) => {
    return markdown.toHTML(text);
}

module.exports = {markdownToHtml};