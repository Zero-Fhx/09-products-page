import products from "./data/products.js";

const productsContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const categoriesInput = document.querySelectorAll("input[name='category']");
const priceInputs = document.querySelectorAll("input[name='price-filter']");
const productModal = document.getElementById("product-modal");
const modalQuantityInput = document.getElementById("modal-quantity");
const modalCloseButton = document.getElementById("modal-close-button");
const productForm = document.getElementById("modal-form");

const filter = {
  search: "",
  categories: [],
  price: {
    min: 0,
    max: Infinity,
  },
};

const cart = [];
let actualProduct = null;

function renderProducts(products) {
  if (products.length === 0) {
    const noProductsMessage = document.createElement("article");
    noProductsMessage.classList.add("no-products");
    noProductsMessage.textContent = "No se encontraron productos.";
    productsContainer.appendChild(noProductsMessage);
    return;
  }

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

function showFilteredProducts() {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(filter.search);
    const matchesCategory = filter.categories.length
      ? filter.categories.includes(product.category)
      : true;
    const matchesPrice =
      product.price >= filter.price.min && product.price <= filter.price.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  productsContainer.querySelectorAll("article").forEach((article) => {
    article.remove();
  });

  renderProducts(filteredProducts);
}

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

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart .count").textContent = cartCount;
}

function getTotalPrice(product) {
  return +(product.price * product.quantity).toFixed(2);
}

function getTotalCartPrice() {
  const total = cart.reduce((total, item) => total + getTotalPrice(item), 0);
  return +total.toFixed(2);
}

function initializeFilters() {
  categoriesInput.forEach((input) => {
    input.checked = true;
    filter.categories.push(input.dataset.category);
  });
}

function handleCategoryChange(e) {
  const category = e.target.dataset.category;

  if (e.target.checked) {
    if (!filter.categories.includes(category)) {
      filter.categories.push(category);
    }
  } else {
    const remainingCategories = filter.categories.filter(
      (cat) => cat !== category
    );

    if (remainingCategories.length === 0) {
      e.target.checked = true;
      return;
    }

    filter.categories = remainingCategories;
  }
  showFilteredProducts();
}

function handlePriceChange(e) {
  const key = e.target.id === "min-price" ? "min" : "max";
  const value = parseFloat(e.target.value);
  filter.price[key] = isNaN(value) ? (key === "min" ? 0 : Infinity) : value;
  showFilteredProducts();
}

function handleSearchChange(e) {
  filter.search = e.target.value.toLowerCase();
  showFilteredProducts();
}

searchInput.addEventListener("input", handleSearchChange);

categoriesInput.forEach((input) => {
  input.addEventListener("change", handleCategoryChange);
});

priceInputs.forEach((input) => {
  input.addEventListener("input", handlePriceChange);
});

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

productModal.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeModalWithAnimation();
});

initializeFilters();
renderProducts(products);
