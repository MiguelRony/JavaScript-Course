const myLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead
    
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${ isRead ? 'read' : 'not read yet'}.`;
    }
}

function addBookToLibrary(title, author, pages, isRead){
    myLibrary.push(new Book(title, author, pages, isRead))
}

addBookToLibrary('Harry Potter','Me', 1234, false);
addBookToLibrary('Bible','Jesus', 2000,false);
addBookToLibrary('Don Quixote','Miguel de Cervantes', 4321,false);
addBookToLibrary("Alice's Adventures in Wonderland",'Lewis Carroll', 342,false);
addBookToLibrary("Gulliver's Travels",'Jonathan Swift', 500,false);
addBookToLibrary('Oliver Twist','Charles Dickens', 784,false);

const container = document.getElementById('books-section');

function createCard(book){
    const card = document.createElement('div');
    const img = document.createElement('div');
    const info = document.createElement('div');
    card.className = 'card';
    img.className = 'img';
    info.className = 'info'

    info.textContent = book.info();
    card.appendChild(img);
    card.appendChild(info);
    return card;
}

myLibrary.map((e) => {
    container.appendChild(createCard(e));
} )