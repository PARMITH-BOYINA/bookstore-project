let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayBooks(filteredBooks) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  filteredBooks.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";

    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.category}</p>
      <p class="price">₹${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;

    bookList.appendChild(div);
  });
}

function addToCart(id) {
  const book = books.find(b => b.id === id);
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>
        ${item.title} - ₹${item.price}
        <button onclick="removeFromCart(${index})">❌ Remove</button>
      </p>
    `;

    cartDiv.appendChild(div);
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  localStorage.setItem("order", JSON.stringify(cart));
  localStorage.removeItem("cart");
  window.location.href = "order.html";
}
function displayCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>
        ${item.title} - ₹${item.price}
        <button onclick="removeFromCart(${index})">❌ Remove</button>
      </p>
    `;

    cartDiv.appendChild(div);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1); // remove item
  localStorage.setItem("cart", JSON.stringify(cart)); // update storage
  displayCart(); // refresh UI
}
// Search
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(value)
  );
  displayBooks(filtered);
});

// Category filter
document.getElementById("categoryFilter").addEventListener("change", e => {
  const value = e.target.value;
  if (value === "all") {
    displayBooks(books);
  } else {
    displayBooks(books.filter(b => b.category === value));
  }
});

// Init
displayBooks(books);
displayCart();