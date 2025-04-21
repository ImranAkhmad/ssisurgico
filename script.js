const products = [
  { id: 1, name: 'Product 1', price: 10, category: 'electronics', description: 'This is product 1.' },
  { id: 2, name: 'Product 2', price: 20, category: 'clothing', description: 'This is product 2.' },
  { id: 3, name: 'Product 3', price: 30, category: 'home', description: 'This is product 3.' },
  // Add more products here
];

const users = [
  { username: 'JohnDoe', email: 'johndoe@example.com', password: 'password123' },
  // Add more users for simulation
];

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
  } else {
    window.location.href = 'checkout.html';
  }
}

function completeCheckout() {
  alert('Thank you for your purchase!');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

function searchProducts() {
  const searchValue = document.getElementById('search-bar').value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
  displayFilteredProducts(filteredProducts);
}

function filterByCategory() {
  const category = document.getElementById('category-filter').value;
  const filteredProducts = category ? products.filter(product => product.category === category) : products;
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
  const productContainer = document.getElementById('products');
  productContainer.innerHTML = '';
  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="https://via.placeholder.com/150" alt="${product.name}">
      <p>${product.name}</p>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

if (window.location.href.includes("index.html")) {
  displayProducts();
}

if (window.location.href.includes("cart.html")) {
  displayCart();
}

let cart = [];

function addToCart(button) {
  const product = button.parentElement;
  const id = product.getAttribute("data-id");
  const name = product.getAttribute("data-name");
  const price = parseFloat(product.getAttribute("data-price"));
  const image = product.getAttribute("data-image");

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <strong>${item.name}</strong><br>
        $${item.price.toFixed(2)}
      </div>
      <div class="cart-controls">
        <button onclick="decreaseQuantity('${item.id}')">–</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity('${item.id}')">+</button>
      </div>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });
}

function increaseQuantity(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.quantity += 1;
  renderCart();
}

function decreaseQuantity(id) {
  const item = cart.find(i => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}
  function goBack() {
    window.history.back();
  }
