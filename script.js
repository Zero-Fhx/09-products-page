import products from "./data/products.js";

const productsContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const categoriesInput = document.querySelectorAll("input[name='category']");
const priceInputs = document.querySelectorAll("input[name='price-filter']");
const productModal = document.getElementById("product-modal");
const modalQuantityInput = document.getElementById("modal-quantity");
const modalCloseButton = document.getElementById("modal-close-button");
const productForm = document.getElementById("modal-form");

const state = {
  filter: {
    search: "",
    categories: [],
    price: {
      min: 0,
      max: Infinity,
    },
  },
  cart: [],
  actualProduct: null,
};

const UI = {
  createBubbleFeedback(text, button) {
    const bubble = document.createElement("span");
    bubble.classList.add("bubble-feedback");
    bubble.textContent = text;

    button.style.position = "relative";
    button.appendChild(bubble);

    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
  },

  clearProducts() {
    productsContainer.querySelectorAll("article").forEach((article) => {
      article.remove();
    });
  },

  showNoProductsMessage() {
    const noProductsMessage = document.createElement("article");
    noProductsMessage.classList.add("no-products");
    noProductsMessage.textContent = "No se encontraron productos.";
    productsContainer.appendChild(noProductsMessage);
  },
};

const ProductManager = {
  render(products) {
    if (products.length === 0) {
      UI.showNoProductsMessage();
      return;
    }

    products.forEach((product) => {
      const productElement = this.createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  },

  createProductElement(product) {
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

    this.attachProductEvents(productElement, product);
    return productElement;
  },

  attachProductEvents(productElement, product) {
    const addToCartButton = productElement.querySelector(".add-to-cart");

    addToCartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      CartManager.addToCart(product.id);
      UI.createBubbleFeedback("+1", event.currentTarget);
    });

    productElement.addEventListener("click", () => {
      ModalManager.showProductDetails(product.id);
    });
  },

  filterProducts() {
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(state.filter.search);
      const matchesCategory = state.filter.categories.length
        ? state.filter.categories.includes(product.category)
        : true;
      const matchesPrice =
        product.price >= state.filter.price.min &&
        product.price <= state.filter.price.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    UI.clearProducts();
    this.render(filteredProducts);
  },
};

const FilterManager = {
  initialize() {
    categoriesInput.forEach((input) => {
      input.checked = true;
      state.filter.categories.push(input.dataset.category);
    });
    ProductManager.filterProducts();
  },

  handleCategoryChange(e) {
    const category = e.target.dataset.category;

    if (e.target.checked) {
      if (!state.filter.categories.includes(category)) {
        state.filter.categories.push(category);
      }
    } else {
      const remainingCategories = state.filter.categories.filter(
        (cat) => cat !== category
      );

      if (remainingCategories.length === 0) {
        e.target.checked = true;
        return;
      }

      state.filter.categories = remainingCategories;
    }
    ProductManager.filterProducts();
  },

  handlePriceChange(e) {
    const key = e.target.id === "min-price" ? "min" : "max";
    const value = parseFloat(e.target.value);
    state.filter.price[key] = isNaN(value)
      ? key === "min"
        ? 0
        : Infinity
      : value;
    ProductManager.filterProducts();
  },

  handleSearchChange(e) {
    state.filter.search = e.target.value.toLowerCase();
    ProductManager.filterProducts();
  },
};

const ModalManager = {
  showProductDetails(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      state.actualProduct = productId;
      modalQuantityInput.value = 1;
      document.getElementById("modal-product-title").textContent =
        product.title;
      document.getElementById("modal-product-description").textContent =
        product.description;
      document.getElementById("modal-product-image").src = product.image;
      document.getElementById(
        "modal-product-price"
      ).textContent = `$${product.price.toFixed(2)}`;

      this.clearModalBubbles();
      productModal.showModal();
    }
  },

  closeWithAnimation() {
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
  },

  clearModalBubbles() {
    const submitButton = productForm.querySelector('button[type="submit"]');
    const oldBubbles = submitButton.querySelectorAll(".bubble-feedback");
    oldBubbles.forEach((bubble) => bubble.remove());
  },

  handleSubmit(e) {
    e.preventDefault();
    const quantity = parseInt(modalQuantityInput.value);
    if (quantity > 0) {
      CartManager.addToCart(state.actualProduct, quantity);

      const submitButton = productForm.querySelector('button[type="submit"]');
      UI.createBubbleFeedback(`+${quantity}`, submitButton);

      this.closeWithAnimation();
      console.log(state.cart);
    }
  },
};

const CartManager = {
  addToCart(productId, quantity = 1) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const cartItemExists = state.cart.find((item) => item.id === productId);

    if (cartItemExists) {
      cartItemExists.quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        price: product.price,
        quantity: quantity,
      });
    }

    this.updateCartCount();
  },

  updateCartCount() {
    const cartCount = state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    document.querySelector(".cart .count").textContent = cartCount;
  },

  getTotalPrice(product) {
    return +(product.price * product.quantity).toFixed(2);
  },

  getTotalCartPrice() {
    const total = state.cart.reduce(
      (total, item) => total + this.getTotalPrice(item),
      0
    );
    return +total.toFixed(2);
  },
};

function setupEventListeners() {
  searchInput.addEventListener(
    "input",
    FilterManager.handleSearchChange.bind(FilterManager)
  );

  categoriesInput.forEach((input) => {
    input.addEventListener(
      "change",
      FilterManager.handleCategoryChange.bind(FilterManager)
    );
  });

  priceInputs.forEach((input) => {
    input.addEventListener(
      "input",
      FilterManager.handlePriceChange.bind(FilterManager)
    );
  });

  modalCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    ModalManager.closeWithAnimation();
    state.actualProduct = null;
  });

  productForm.addEventListener(
    "submit",
    ModalManager.handleSubmit.bind(ModalManager)
  );

  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
      ModalManager.closeWithAnimation();
    }
  });

  productModal.addEventListener("cancel", (e) => {
    e.preventDefault();
    ModalManager.closeWithAnimation();
  });
}

function initializeApp() {
  setupEventListeners();
  FilterManager.initialize();
}

initializeApp();
