const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');

let notes = [];

function showNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

showNotes();

createBtn.addEventListener('click', () => {
    const inputBox = document.createElement('div');
    inputBox.className = 'input-box';

    const titleInput = document.createElement('input');
    titleInput.className = 'title';
    titleInput.setAttribute('type', 'text');
    titleInput.placeholder = 'title...';
    titleInput.column=1
    
    titleInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollWidth + 'px';
    });

    const detailInput = document.createElement('textarea');
    detailInput.className = 'details';
    detailInput.rows = 1;
    detailInput.placeholder = 'details...';

    detailInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    const deleteButton = document.createElement('img');
    deleteButton.src = 'images/delete.png';

    inputBox.appendChild(titleInput);
    inputBox.appendChild(detailInput);
    inputBox.appendChild(deleteButton);

    notesContainer.appendChild(inputBox);
    notes.push(inputBox); // Add the new note element to the notes array
    updateStorage();
});

notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        notes = notes.filter(note => note !== e.target.parentElement); // Remove note from the notes array
        updateStorage();
    }
});

notesContainer.addEventListener('input', () => {
    updateStorage();
});

notesContainer.addEventListener('input', function(e) {
    if (e.target.tagName === 'TEXTAREA') {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        document.execCommand('insertLineBreak');
        e.preventDefault();
    }
});
