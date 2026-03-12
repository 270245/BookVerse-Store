let books = []; // load books.json via fetch in SPCK if needed
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const booksContainer = document.getElementById('books');
const cartCountEl = document.getElementById('cartCount');

fetch('books.json')
  .then(res => res.json())
  .then(data => { books = data; renderBooks(); });

function renderBooks() {
  booksContainer.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('book');
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    booksContainer.appendChild(div);
  });
  updateCartCount();
}

function searchBooks() {
  const term = document.getElementById('search').value.toLowerCase();
  booksContainer.innerHTML = '';
  books.filter(book => book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term))
    .forEach(book => {
      const div = document.createElement('div');
      div.classList.add('book');
      div.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.price}</p>
        <button onclick="addToCart(${book.id})">Add to Cart</button>
      `;
      booksContainer.appendChild(div);
    });
}

function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  cart.push(book);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${book.title} added to cart`);
}

function updateCartCount() {
  cartCountEl.textContent = cart.length;
}

function toggleDark() {
  document.body.classList.toggle('dark');
}