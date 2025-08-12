import products from "./data/products.js";

const productsContainer = document.querySelector(".products");

const productModal = document.getElementById("product-modal");
const modalQuantityInput = document.getElementById("modal-quantity");
const modalCloseButton = document.getElementById("modal-close-button");
const productForm = document.getElementById("modal-form");

const cart = [];

let actualProduct = null;

function renderProducts(products) {
  products.forEach((product) => {
    const productElement = document.createElement("article");
    productElement.classList.add("product");
    productElement.setAttribute("data-id", product.id);
    productElement.innerHTML = `
      <img src="${product.image}" alt="Imagen de ${product.title}" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p>${product.description}</p>
      </div>
      <footer class="product-actions">
        <span class="price">$${product.price.toFixed(2)}</span>
        <button class="add-to-cart">+</button>
      </footer>
    `;
    productsContainer.appendChild(productElement);

    productElement
      .querySelector(".add-to-cart")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        addToCart(product.id);
      });

    productElement.addEventListener("click", () => {
      showProductDetails(product.id);
    });
  });
}

renderProducts(products);

function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    actualProduct = productId;
    modalQuantityInput.value = 1;
    document.getElementById("modal-product-title").textContent = product.title;
    document.getElementById("modal-product-description").textContent =
      product.description;
    document.getElementById("modal-product-image").src = product.image;
    document.getElementById(
      "modal-product-price"
    ).textContent = `$${product.price.toFixed(2)}`;
    productModal.showModal();
  }
}

function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const cartItemExists = cart.find((item) => item.id === productId);

  if (cartItemExists) {
    cartItemExists.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      price: product.price,
      quantity: 1,
    });
  }

  updateCartCount();
}

function getTotalPrice(product) {
  return +(product.price * product.quantity).toFixed(2);
}

function getTotalCartPrice() {
  const total = cart.reduce((total, item) => total + getTotalPrice(item), 0);
  return +total.toFixed(2);
}

function closeModalWithAnimation() {
  productModal.classList.add("closing");
  productModal.addEventListener(
    "animationend",
    (event) => {
      if (event.animationName === "hide-modal") {
        productModal.close();
        productModal.classList.remove("closing");
      }
    },
    { once: true }
  );
}

modalCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModalWithAnimation();
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const quantity = parseInt(modalQuantityInput.value);
  if (quantity > 0) {
    addToCart(actualProduct, quantity);
    closeModalWithAnimation();
    console.log(cart);
  }
});

productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    closeModalWithAnimation();
  }
});

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart .count").textContent = cartCount;
}
