import products from "./data/products.js";

const productsContainer = document.querySelector(".products");

function renderProducts(products) {
  products.forEach((product) => {
    const productElement = document.createElement("article");
    productElement.classList.add("product");
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
  });
}

renderProducts(products);
