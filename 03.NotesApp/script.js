const table = document.querySelector("table");
const input = document.querySelector(".input");
const createButton = document.querySelector("#create-btn");


let notes;

async function fetchNotes() {
    notes = (await window.db.getNotes()).rows;

    table.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Actions</th>
        </tr>
    `;

    for (const note of notes) {
        const tr = document.createElement("tr");

        const id = document.createElement("td");
        id.innerText = note.id;
        const title = document.createElement("td");
        title.innerText = note.title;
        const created_at = document.createElement("td");
        created_at.innerText = note.created_at;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("btn-delete");
        deleteBtn.onclick = () => deleteNote(note.id);

        tr.appendChild(id);
        tr.appendChild(title);
        tr.appendChild(created_at);
        tr.appendChild(deleteBtn);

        table.appendChild(tr);
    }
}

fetchNotes();

async function deleteNote(id) {
    const result = await window.db.deleteNote(id);
    console.log("Deleted:", result);
    fetchNotes();
}


createButton.addEventListener("click", () => {
    const title = input.value;
    console.log("Title:", title);
    if (title === "") {
        return alert("Title cannot be empty!");
    }

    input.value = "";

    window.db.addNote(title);
    fetchNotes();
});
