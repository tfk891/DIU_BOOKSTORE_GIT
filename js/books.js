document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const addForm = document.getElementById("addBookForm");
  const bookList = document.getElementById("bookList");
  const searchInput = document.getElementById("searchInput");

  let books = JSON.parse(localStorage.getItem("books") || "[]");
  let claims = JSON.parse(localStorage.getItem("claims") || "{}");

  function renderBooks(filter = "") {
    if (!bookList) return;
    bookList.innerHTML = "";
    books
      .filter(b => b.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach((book, index) => {
        const claimedByUser = claims[book.id] === user.email;
        const div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `
          <strong>${book.name}</strong><br>
          Genre: ${book.genre}<br>
          Author: ${book.author}<br>
          Price: ${book.price}৳<br>
          <button onclick="claimBook('${book.id}')">${claimedByUser ? "Claimed" : "Claim"}</button>
        `;
        bookList.appendChild(div);
      });
  }

  window.claimBook = (bookId) => {
    if (!claims[bookId]) {
      claims[bookId] = user.email;
      localStorage.setItem("claims", JSON.stringify(claims));
      renderBooks(searchInput ? searchInput.value : "");
    }
  };

  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const book = {
        id: Date.now().toString(),
        name: document.getElementById("bookName").value,
        genre: document.getElementById("bookGenre").value,
        author: document.getElementById("bookAuthor").value,
        price: document.getElementById("bookPrice").value,
      };
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
      alert("Book added!");
      window.location.href = "dashboard.html";
    });
  }

  if (bookList) renderBooks();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderBooks(searchInput.value);
    });
  }
});
