const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

if (productId != null) {
    redirect_url = `http://localhost:5500/templates/product/product-information.html?productId=${productId}`
    window.open(redirect_url, '_self')
}
