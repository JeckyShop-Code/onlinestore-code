import { renderedCard } from "/js/components/generateProductCard.js";
import * as searchProduct from "/js/components/productsSearchAlgoritm.js";

const viewProductsContainer = document.getElementById('view-products');

const filterCategorySelect = document.getElementById('categories');

const inputSearch = document.getElementById('input-search');
const selectSearch = document.getElementById('selectSearchBy');
const btnSearch = document.getElementById('btn-search');

const dataUrl = '/data/products.json';

if (sessionStorage.getItem('homeSearch') != '') {
    let name = sessionStorage.getItem('inputProductName');
    inputSearch.value = name;

    document.title = `${name} | JeckyShop`

    fetch(dataUrl)
    .then(response => response.json())
    .then(data =>  renderedCard(viewProductsContainer, searchProduct.searchByName(name, data)))
}

const searchCategoryParam = new URLSearchParams(window.location.search);
const categorySelected = searchCategoryParam.get('category');

if (categorySelected != null) {
    document.title = `${categorySelected} | JeckyShop`

    inputSearch.value = '';

    searchByCategory(categorySelected);
    
    filterCategorySelect.value = categorySelected;
}

let optionSelected = 'name';
selectSearch.addEventListener('change', (event)=> {
    optionSelected = event.target.value;
    if (optionSelected == 'name') {
        inputSearch.type = 'text';
        inputSearch.placeholder = 'Buscar por nombre del producto';
    }else {
        inputSearch.type = 'number';
        inputSearch.placeholder = 'Buscar por ID del producto';
    }
});

function searchByName(productName = '') {
    fetch(dataUrl)
    .then(response => response.json())
    .then(data =>  renderedCard(viewProductsContainer, searchProduct.searchByName(productName, data)))
}

function searchById(productId = 0) {
    fetch(dataUrl)
    .then(response => response.json())
    .then(data =>  renderedCard(viewProductsContainer, searchProduct.searchById(productId, data)))
}

function searchByCategory(category = '') {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => renderedCard(viewProductsContainer, searchProduct.searchByCategory(category, data)))
}

function getAllProducts() {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => renderedCard(viewProductsContainer, searchProduct.getAllProducts(data)))
}

btnSearch.addEventListener('click', ()=> {
    if (inputSearch.value == '') {
        alert('No olvides ingresar el nombre del producto que deseas buscar!');
        return;
    }

    if (optionSelected == 'name') {
        let productName = inputSearch.value;
        sessionStorage.setItem('inputProductName', productName);

        searchByName(productName);
    }
    if (optionSelected == 'id') {
        let productId = inputSearch.value;

        searchById(productId);
    }
});

document.addEventListener('keydown', (event)=> {
    if (event.key == 'Enter') {
        btnSearch.click();
    }
})

filterCategorySelect.addEventListener('change', (event)=> {
    let categorySelected = event.target.value;

    if (categorySelected == 'Ninguna') {
        return;
    }
    if (categorySelected == 'Todos') {
        renderedCard(viewProductsContainer, getAllProducts());
        return;
    }

    searchByCategory(categorySelected);
})


