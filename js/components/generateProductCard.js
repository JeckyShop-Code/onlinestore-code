
function shortProductName(productName = '') {
    if (productName.length > 38)
        return `${productName.slice(0, 38)}...`;

    return productName;
}

export function formatPrice(productPrice) {
    return productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function generateProductCard(product) {

    let htmlStructure = `
        <a class="product-card" href="/templates/product/product-information.html?productId=${product.id}" target="_blank">
            <div class="card-image">
                <img src="${product.images[0]}" alt="product-image" loading="lazy">
            </div>
            <p class="product-name">${shortProductName(product.name)}</p>
            <div class="product-category">
                <p class="pc-title">categorías:</p>
                <div class="pc-categories">
                    <p>${product.category}</p>
                </div>
            </div>
            <div class="product-price">
                <p class="pp-title">Precio:</p>
                <p class="pp-price"><i class="fa-solid fa-dollar-sign"></i>${formatPrice(product.price)}</p>
            </div>
            <p class="c-btn btn-more-info"><i class="fa-solid fa-circle-info"></i>Click para más información</p>
            <button class="c-btn btn-buy"><i class="fa-solid fa-cart-shopping"></i>Comprar</button>
        </a>`;
    let card = document.createElement('div');
    card.innerHTML = htmlStructure;

    return card.firstElementChild;
}

const notFoundMessage = `
            <div class="not-found-message product-card">
                <div class="nfm-image-container">
                    <img src="/images/not-found-image/product-not-found.svg" alt="product not found image">
                </div>
                <p class="nfm-title">Producto no encontrado :(</p>
                <p class="nfm-subtitle">Por favor, intente con otro término de búsqueda.</p>
            </div>`

export function renderedCard(htmlElement, products) {
    if (products == null) {
        return;
    }
    if (products.length == 0) {
        let msg = document.createElement('div');
        msg.innerHTML = notFoundMessage;
        htmlElement.innerHTML = ''
        htmlElement.appendChild(msg);
        return;
    }

    let cards = document.createDocumentFragment();

    for (let i = 0; i < products.length; i++) {
        cards.appendChild(generateProductCard(products[i]));
    }

    htmlElement.innerHTML = '';
    htmlElement.appendChild(cards);
}