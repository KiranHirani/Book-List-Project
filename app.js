//Using ES5 
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

// Add Book to list 
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    // Insert cols 
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook=function(target){
    if(target.className==='delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields 
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

//Show Alert
UI.prototype.showAlert=function(message,className){
    //Create div
    const div=document.createElement('div');
    //Add Classes
    div.className=`alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));

    //Get parent 
    const container=document.querySelector('.container');
    //Get form
    const form=document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div,form); // What we want to insert, before what we want to insert

    //Timeout after 3 secs 
    setTimeout(function(){document.querySelector('.alert').remove()},3000)
}

//Event Listener for add book 
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values 
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instantiate book      
    let book = new Book(title, author, isbn);

    //Instantiate UI
    let ui = new UI();

    //Validate 
    if (title === '' || author === '' || isbn === '') {
     // Error Alert 
     ui.showAlert('Please fill in all fields','error'); //msg, css class 
    } else {
        // Add book to list 
        ui.addBookToList(book);
        
        //Show book added alert 
        ui.showAlert('Book Added!','success')

        //Clear fields 
        ui.clearFields();
    }

    e.preventDefault(); //preventing the form from submitting
})


//Event Listener for delete, we are invoking the element on the parent element 
document.getElementById('book-list').addEventListener('click',function(e){
    const ui=new UI();

    ui.deleteBook(e.target);
 
    //Show message 
    ui.showAlert('Book Removed!','success');
    e.preventDefault();
})