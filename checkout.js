function completePayment() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;

  if(!name || !address || !contact){
    alert('Please fill in all fields');
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cart.length === 0){
    alert('Your cart is empty');
    return;
  }

  let total = cart.reduce((sum, book) => sum + parseInt(book.price.replace('R','')), 0);

  alert(`Thank you ${name}!\nYour order of ${cart.length} book(s) totalling R${total} has been placed.\nDelivery to: ${address}`);

  // Save order for trace page
  localStorage.setItem('lastOrder', JSON.stringify(cart));

  // Clear cart
  localStorage.removeItem('cart');
  window.location.href = 'bookstore.html';
}