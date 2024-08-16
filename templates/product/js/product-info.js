import { searchById } from "/js/components/productsSearchAlgoritm.js";
import { formatPrice } from "/js/components/generateProductCard.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
const dataUrl = '/data/products.json';

const whatsAppNumber = 573127240055;

function createProductImages(productImages) {
    const htmlImagesContainer = document.getElementById('pr-image-view');
    htmlImagesContainer.src = productImages[0].images[0];

    const menuImagesSelect = document.getElementById('product-images');
    let imagesFragment = document.createDocumentFragment();

    productImages[0].images.forEach(imageUrl => {
        let image = `<img src="${imageUrl}" onclick="selectImage(this)" alt="" loading="lazy">`;
        let imgDiv = document.createElement('div');
        imgDiv.innerHTML = image;

        imagesFragment.appendChild(imgDiv);
    });

    menuImagesSelect.appendChild(imagesFragment)
}

function formatUrl(id = 0, name = '', price = 0) {
    return encodeURIComponent(`Informacion del producto: ID=${id} NOMBRE=${name} PRECIO=${price}`);
}

function createProductDetails(productDetails) {
    document.title = `${productDetails[0].name} | JeckyShop`;

    sessionStorage.setItem('prDetailId', productDetails[0].id);
    sessionStorage.setItem('prDetailName', productDetails[0].name);
    sessionStorage.setItem('prDetailPrice', productDetails[0].price);

    formatUrl(0, productDetails[0].name, 0)

    const htmlDetailsContainer = document.getElementById('product-details');

    let htmlStructure = `<div class="pi-product-id">
                    <p class="pi-tid">ID:</p>
                    <p class="pi-id">${productDetails[0].id}</p>
                </div>
                <p class="pi-product-name">${productDetails[0].name}</p>
                <div class="pi-categories">
                    <p class="pi-ctitle">Categoría:</p>
                    <p class="pi-category">${productDetails[0].category}</p>
                </div>
                <div class="pi-product-price">
                    <p class="pi-ptitle">Precio:</p>
                    <p class="pi-price"><i class="fa-solid fa-dollar-sign"></i>${formatPrice(productDetails[0].price)}</p>
                </div>
                <div class="pi-product-buy">
                    <a href="https://wa.me/${whatsAppNumber}?text=${formatUrl(productDetails[0].id, productDetails[0].name, productDetails[0].price)}" id="btn-buy" class="pi-btn-buy" target="_blank"><i class="fa-solid fa-bag-shopping"></i>Comprar</a href="">
                </div>
                <div class="pi-product-description">
                    <p class="pi-dtitle">DESCRIPCIÓN</p>
                    <div class="pi-description">
                        ${productDetails[0].description}
                    </div>
                </div>`;
    let divContainer = document.createElement('div');
    divContainer.innerHTML = htmlStructure;

    htmlDetailsContainer.appendChild(divContainer);
}

function loadProductDetails(data) {
    createProductImages(data);
    createProductDetails(data);
}

fetch(dataUrl)
    .then(response => response.json())
    .then(data => loadProductDetails(searchById(productId, data)))
    .catch(error => console.log(error));

