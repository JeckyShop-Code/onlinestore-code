export function searchByCategory(category, data, limit = 0) {
    if (category == null) {
        return;
    }

    let limitSearch = 0

    if (limit > 0) {
        limitSearch = limit
    }
    else {
        limitSearch = data.length
    }

    let products = [];

    for (let i = 0; i < data.length; i++) {
        if (products.length == limitSearch) {
            break
        }
        if (data[i].category == category) {
            products.push(data[i])
        }
    }

    return products;
}

export function searchByName(name = '', data) {

    if (name == null) {
        return;
    }

    let products = [];

    let productName = '';

    for (let i = 0; i < data.length; i++) {
        productName = data[i].name;

        if (productName.toLowerCase().includes(name.toLowerCase())) {
            products.push(data[i]);
        }
    }

    return products;
}

export function searchById(id, data) {

    if (id == null) {
        return;
    }

    let products = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            products.push(data[i]);
        }
    }

    return products;
}

export function getAllProducts(data) {
    let products = [];

    for (let i = 0; i < data.length; i++) {
        products.push(data[i]);
    }

    return products;
}

