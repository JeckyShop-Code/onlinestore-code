import { renderedCard } from "./components/generateProductCard.js";
import { searchByCategory } from "./components/productsSearchAlgoritm.js";

const dataUrl = '../data/products.json';

function viewProductsCategory(category = '', slider) {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => renderedCard(slider, searchByCategory(category, data, 5)))
}

const accessoriesCategorySlider = document.getElementById("ac-slider");
const technologyCategorySlider = document.getElementById("tc-slider");
const beautyCategorySlider = document.getElementById("bc-slider");
const homeCategorySlider = document.getElementById("hc-slider");
const toolsCategorySlider = document.getElementById("tlc-slider");

viewProductsCategory('Accesorios', accessoriesCategorySlider);
viewProductsCategory('Tecnologia', technologyCategorySlider);
viewProductsCategory('Belleza', beautyCategorySlider);
viewProductsCategory('Hogar', homeCategorySlider);
viewProductsCategory('Herramientas', toolsCategorySlider);

const inputSearch = document.getElementById('home-search-input');
const btnSearch = document.getElementById('btn-home-search');

btnSearch.addEventListener('click', () => {
    const inputValue = inputSearch.value;

    if (inputValue == '') {
        alert('No olvides ingresar el nombre del producto que deseas buscar!')
        return;
    }

    sessionStorage.setItem('inputProductName', inputValue)
    window.open('templates/catalog/catalog.html', '_self')
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        btnSearch.click();
    }
});