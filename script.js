import products from "./data/products.js";

const productsContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const categoriesInput = document.querySelectorAll("input[name='category']");
const priceInputs = document.querySelectorAll("input[name='price-filter']");
const productModal = document.getElementById("product-modal");
const modalQuantityInput = document.getElementById("modal-quantity");
const modalCloseButton = document.getElementById("modal-close-button");
const productForm = document.getElementById("modal-form");
const cartSidebar = document.getElementById("cartSidebar");
const cartCloseButton = document.getElementById("cart-close-button");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartLink = document.querySelector(".cart a");
const checkoutButton = document.getElementById("checkout-button");
const purchaseModal = document.getElementById("purchase-notification");
const notificationCloseButton = document.getElementById(
  "notification-close-button"
);
const purchaseItems = document.getElementById("purchase-items");
const purchaseTotalAmount = document.getElementById("purchase-total-amount");

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
    const currentValue = isNaN(value) ? (key === "min" ? 0 : Infinity) : value;

    const minInput = document.getElementById("min-price");
    const maxInput = document.getElementById("max-price");
    const minValue = parseFloat(minInput.value);
    const maxValue = parseFloat(maxInput.value);

    minInput.classList.remove("price-error");
    maxInput.classList.remove("price-error");

    if (!isNaN(minValue) && !isNaN(maxValue)) {
      if (minValue > maxValue) {
        minInput.classList.add("price-error");
        maxInput.classList.add("price-error");

        return;
      }
    }

    state.filter.price[key] = currentValue;
    ProductManager.filterProducts();
  },

  validatePriceInputs() {
    const minInput = document.getElementById("min-price");
    const maxInput = document.getElementById("max-price");
    const minValue = parseFloat(minInput.value);
    const maxValue = parseFloat(maxInput.value);

    minInput.classList.remove("price-error");
    maxInput.classList.remove("price-error");

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      minInput.classList.add("price-error");
      maxInput.classList.add("price-error");
      return false;
    }

    return true;
  },

  handleSearchChange(e) {
    state.filter.search = e.target.value.toLowerCase().trim();
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
  saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },

  loadFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        state.cart = JSON.parse(savedCart);
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error);
        state.cart = [];
      }
    }
  },

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
    this.saveToLocalStorage();
  },

  updateCartCount() {
    const cartCount = state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    document.querySelector(".cart .count").textContent = cartCount;
    this.updateCheckoutButton();
  },

  updateCheckoutButton() {
    const isEmpty = state.cart.length === 0;

    checkoutButton.disabled = isEmpty;
    checkoutButton.textContent = isEmpty ? "Carrito vacío" : "Finalizar compra";
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

  toggleSidebar() {
    cartSidebar.classList.toggle("open");
    this.renderItems();
  },

  closeSidebar() {
    cartSidebar.classList.remove("open");
  },

  renderItems() {
    cartItems.innerHTML = "";

    if (state.cart.length === 0) {
      cartItems.innerHTML = "<p>Tu carrito está vacío</p>";
      cartTotal.textContent = "0.00";
      return;
    }

    state.cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return;

      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${product.title}</div>
          <div class="cart-item-price">$${product.price.toFixed(2)} x ${
        cartItem.quantity
      }</div>
        </div>
        <button class="remove-item" data-id="${cartItem.id}">×</button>
      `;

      const removeButton = cartItemElement.querySelector(".remove-item");
      removeButton.addEventListener("click", () => {
        this.removeItem(cartItem.id);
        this.renderItems();
        this.updateCartCount();
      });

      cartItems.appendChild(cartItemElement);
    });

    cartTotal.textContent = this.getTotalCartPrice().toFixed(2);
  },

  removeItem(productId) {
    const index = state.cart.findIndex((item) => item.id === productId);
    if (index > -1) {
      state.cart.splice(index, 1);
      this.saveToLocalStorage();
    }
  },

  completePurchase() {
    const cartCopy = [...state.cart];

    state.cart = [];
    this.updateCartCount();
    this.saveToLocalStorage();
    this.closeSidebar();

    NotificationManager.showPurchaseNotification(cartCopy);
  },
};

const NotificationManager = {
  showPurchaseNotification(cartData) {
    purchaseItems.innerHTML = "";

    let totalAmount = 0;

    cartData.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return;

      const itemTotal = product.price * cartItem.quantity;
      totalAmount += itemTotal;

      const purchaseItem = document.createElement("div");
      purchaseItem.classList.add("purchase-item");
      purchaseItem.innerHTML = `
        <span class="item-text">${product.title} (x${
        cartItem.quantity
      }) - $${itemTotal.toFixed(2)}</span>
      `;

      purchaseItems.appendChild(purchaseItem);
    });

    purchaseTotalAmount.textContent = totalAmount.toFixed(2);
    purchaseModal.showModal();
  },

  closeNotification() {
    purchaseModal.classList.add("closing");
    purchaseModal.addEventListener(
      "animationend",
      (event) => {
        if (event.animationName === "hide-notification") {
          purchaseModal.close();
          purchaseModal.classList.remove("closing");
        }
      },
      { once: true }
    );
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

  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    CartManager.toggleSidebar();
  });

  cartCloseButton.addEventListener(
    "click",
    CartManager.closeSidebar.bind(CartManager)
  );

  checkoutButton.addEventListener("click", () => {
    if (!checkoutButton.disabled && state.cart.length > 0) {
      CartManager.completePurchase();
    }
  });

  cartSidebar.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (cartSidebar.classList.contains("open")) {
      if (!cartSidebar.contains(e.target) && !e.target.closest(".cart")) {
        CartManager.closeSidebar();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
      CartManager.closeSidebar();
    }
  });

  notificationCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    NotificationManager.closeNotification();
  });

  purchaseModal.addEventListener("click", (e) => {
    if (e.target === purchaseModal) {
      NotificationManager.closeNotification();
    }
  });

  purchaseModal.addEventListener("cancel", (e) => {
    e.preventDefault();
    NotificationManager.closeNotification();
  });
}

function initializeApp() {
  CartManager.loadFromLocalStorage();
  CartManager.updateCartCount();
  setupEventListeners();
  FilterManager.initialize();
}

initializeApp();
