let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cartItems');
const totalEl = document.getElementById('total');

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach((book, index) => {
    let priceNumber = parseInt(book.price.replace('R',''));
    total += priceNumber;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <p>${book.title} - ${book.price}</p>
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(div);
  });
  totalEl.textContent = `Total: R${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

renderCart();