
// Services for organizing functions
myApp.factory('bookService', function($http) {
  return {

    getBooks: function() {

      const url = "http://localhost:8080/dw/api/books";

      console.log("making http request to API");
      const responsePromise = $http({
        method: 'GET',
        url: url
      });

      // Using then() we turn a promise of a response into a promise of books
      const booksPromise = responsePromise.then(function(response) {

        console.log("API response received from promise of reponse");
        const books = response.data;

        console.log("preparing books");

        console.log("returning books");
        return books;
      });

      console.log("returning promise of books");
      return booksPromise;
    },

    getBook: function(bookId) {

      const url = 'http://localhost:8080/dw/api/books/' + bookId;

      console.log("making http request to API");
      const responsePromise = $http({
        method: 'GET',
        url: url
      });

      // Using then() we turn a promise of a response into a promise of book
      const bookPromise = responsePromise.then(function(response) {

        console.log("API response received from promise of reponse");
        const book = response.data;

        console.log("preparing book");

        console.log("returning book");
        return book;
      });

      console.log("returning promise of book");
      return bookPromise;
  },

    addBook: function(book) {

      const url = "http://localhost:8080/dw/api/books";

      let date = new Date();
      book.releaseDate = new Date(date.getTime());

      console.log("making http request to API");
      const responsePromise = $http({
        method: 'POST',
        url: url,
        data: book
      });

      const addBookPromise = responsePromise.then(function(response) {

        //console.log("API response received from promise of reponse");
        const book = response.data;
        console.log("Adding book");
        console.log("Book added", book);
        return book;
      });

      return addBookPromise;
  }

  };
});
