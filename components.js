
myApp.component('bookListPage', {

  controller: function(bookService, $location) {

    // open the console and check the order of these logs
    console.log("calling getBooks()");
    const booksPromise = bookService.getBooks();
    console.log("received promise of books");
    booksPromise.then(books => {
      console.log("books received from promise of books");
      this.books = books;
    });

    this.goToBookPage = function(book) {
      // $location lets us change to one of the paths in $routeProvider
      $location.path("/books/" + book.id);
    };

    this.addBook = function() {

        const addBookPromise = bookService.addBook(this.newBook);
        addBookPromise.then(
            booksPromise.then(books => {
                console.log("books received from promise of books");
                this.books = books;
                this.newBook = {};
        }));

        this.goToBookPage = function(book) {
      // $location lets us change to one of the paths in $routeProvider
            $location.path("/books/" + book.id);
        };
    };
  },

  template: `
    <section>
        <form>
            <!-- ng-model to set $scope data from the view (html) -->
            <p>Title: <input ng-model="$ctrl.newBook.title"></p>
            <p>Author: <input ng-model="$ctrl.newBook.author"></p>
            <p>Pages: <input ng-model="$ctrl.newBook.numPages"></p>
            <button ng-click="$ctrl.addBook($ctrl.newBook)">Add</button>
        </form>
    </section>

    <div class="list">
        <!-- ng-repeat repeats the HTML element for each item in the array -->
        <div ng-repeat="b in $ctrl.books">
            <book-detail book="b" ng-click="$ctrl.goToBookPage(b)" />
        </div>
    </div>
  `
});


myApp.component('bookPage', {

  controller: function($routeParams, bookService) {

    this.bookId = $routeParams.bookId;

    console.log("calling getBook()");
    const bookPromise = bookService.getBook(this.bookId);
    console.log("received promise of book");
    bookPromise.then(book => {
      console.log("book received from promise of book");
      this.book = book;
    });
  },

  template: `
    <div class="book">
        <book-detail book=$ctrl.book />
    </div>
  `
  // templateUrl: 'book-detail.html' // This needs an http server
});


myApp.component('bookDetail', {

  bindings: {
    book: '<'
  },

  controller: function() {
    // we can add things to this instead of $scope
    this.formatDate = function(date) {
      return date.getFullYear() + "-" + (date.getMonth() + 1);
    };
  },

  template: `
    <section>
      <div class="details">
        <header>Title: {{ $ctrl.book.title }}</header>
        <p>Author: {{ $ctrl.book.author }}</p>
        <p>Date: <format-date date="$ctrl.book.releaseDate"/></p>
      </div>
    </section>
  `
  // templateUrl: 'book-detail.html' // This needs an http server
});


myApp.component('formatDate', {

  bindings: {
    date: '<'
  },

  controller: function() {
    // we can add things to this instead of $scope
    this.formatDate = function(date) {
      date = new Date(date);
      return date.getFullYear() + "-" + (date.getMonth() + 1);
    };
  },

  template: `{{ $ctrl.formatDate($ctrl.date) }}`
});
