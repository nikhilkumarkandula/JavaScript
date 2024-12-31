const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNodes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
    attachEventListeners();
}
showNodes();

function updateStorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}

createBtn.addEventListener("click",()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
    attachEventListeners();
})

function attachEventListeners() {
    notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        // Handle delete action
        note.querySelector("img").onclick = function () {
            note.remove();
            updateStorage();
        };

        // Update localStorage on content change
        note.oninput = function () {
            updateStorage();
        };
    });
}
document.addEventListener("keydown", event=>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();

    }
})