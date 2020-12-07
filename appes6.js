class Book{
   constructor(title,author,isbn){
       this.title=title;
       this.author=author;
       this.isbn=isbn;
   }
}

class UI{
    addBookToList(book) {
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

    deleteBook(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message,className){
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
}

//Local Storage Class 
class Store{

    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        } else{
           books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books=Store.getBooks();
        books.forEach(function(book){
            const ui=new UI();
            ui.addBookToList(book);
        });
    }

    static addBook(book){
    const books=Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
    }

    static deleteBook(isbn){
       const books=Store.getBooks();

       books.forEach(function(book,index){
        console.log('Hi',isbn,index);
           if(book.isbn===isbn){
               console.log('Hi',isbn,index,book.isbn===isbn);
               books.splice(index,1);
           }
       });
       localStorage.setItem('books',JSON.stringify(books));
    }
}


//DOM Load Event 
document.addEventListener('DOMContentLoaded',Store.displayBooks)


//Event Listener for add book 
document.getElementById('book-form').addEventListener('submit', function (e) {
    
    // Get form values 
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instantiate book      
    let book = new Book(title, author, isbn);

    // Instantiate UI
    let ui = new UI();

    //Validate 
    if (title === '' || author === '' || isbn === '') {
     // Error Alert 
     ui.showAlert('Please fill in all fields','error'); //msg, css class 
    } else {
        // Add book to list 
        ui.addBookToList(book);

        //Add book to LS
        Store.addBook(book);
        
        //Show book added alert 
        ui.showAlert('Book Added!','success')

        //Clear fields 
        ui.clearFields();
    }

    e.preventDefault(); //preventing the form from submitting
})


//Event Listener for delete, we are invoking the element on the parent element 
document.getElementById('book-list').addEventListener('click',function(e){
    //Instantiate ui 
    const ui=new UI();

    ui.deleteBook(e.target);

    //Remove from LS 
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent); 
 
    //Show message 
    ui.showAlert('Book Removed!','success');
    e.preventDefault();
})