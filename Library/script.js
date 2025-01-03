const myLibrary = [];

// function Book(title, author, pages, isRead){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.isRead = isRead;
    
//     this.info = function(){
//         return `${this.title} by ${this.author}, ${this.pages} pages, ${ isRead ? 'read' : 'not read yet'}.`;
//     }
// }

class Book{
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    changeReadStatus(){
        this.isRead ? this.isRead = false : this.isRead = true;
    }

    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${ this.isRead ? 'read' : 'not read yet'}.`;
    }
}

// Book.prototype.changeReadStatus = function(){
//     this.isRead ? this.isRead = false : this.isRead = true;
// }

function addBookToLibrary(title, author, pages, isRead){
    myLibrary.push(new Book(title, author, pages, isRead))
}

addBookToLibrary('Harry Potter','Me', 1234, false);
addBookToLibrary('Bible','Jesus', 2000,false);
addBookToLibrary('Don Quixote','Miguel de Cervantes', 4321,false);
addBookToLibrary("Alice's Adventures in Wonderland",'Lewis Carroll', 342,false);
addBookToLibrary("Gulliver's Travels",'Jonathan Swift', 500,true);
addBookToLibrary('Oliver Twist','Charles Dickens', 784,false);

const container = document.getElementById('books-section');

function createCard(book, index){
    const card = document.createElement('div');
    const img = document.createElement('div');
    const info = document.createElement('div');
    const btns = document.createElement('div');
    const del = document.createElement('button');
    const check = document.createElement('input');
    const label = document.createElement('label');
    const readLabel = document.createElement('span');

    del.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        container.replaceChildren();
        renderCards();
    })

    check.addEventListener('change', () => {
        book.changeReadStatus();
        book.isRead ? readLabel.textContent = 'read' : readLabel.textContent = 'not read';
    })

    card.className = 'card';
    img.className = 'img';
    info.className = 'info'
    del.className = 'cancel'
    del.textContent = "Delete";
    btns.className = 'btns';
    check.type = 'checkbox';
    check.id = `read${index}`;
    check.name = `read${index}`;
    label.htmlFor = `read${index}`;
    label.className = "button";
    check.checked = book.isRead;
    readLabel.textContent = book.isRead ? 'read' : 'not read';

    info.textContent = book.info();
    card.appendChild(img);
    card.appendChild(info);
    btns.appendChild(del);
    btns.appendChild(check);
    btns.appendChild(label);
    btns.appendChild(readLabel);
    card.appendChild(btns);
    return card;
}

function renderCards(){
    myLibrary.map((e, index) => {
        const card = createCard(e, index);
        card.setAttribute('data-index', index)
        container.appendChild(card);
    });
}

renderCards();

const dialog = document.querySelector('dialog')
const btn = document.getElementById('newBook');
const add = document.getElementById('add');
const cancel = document.getElementById('cancel');
const form = document.getElementById('bookForm');

cancel.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close()
});

btn.addEventListener('click', () => dialog.showModal());

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const pages = form.elements['pages'].value;
    const read = form.elements['read'].checked;

    container.replaceChildren();
    addBookToLibrary(title, author, pages, read);
    renderCards();
});

add.addEventListener('click', (e) => {
    dialog.close()
});