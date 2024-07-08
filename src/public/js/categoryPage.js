const urlProduct = "api/karma/products";
const listProduct = document.querySelector('.category-list');
function getapiProducts(url) {
    fetch("http://localhost:3000/" + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => {
        if (listProduct) {
            showProducts(data);
        }
    });
}
let path = window.location.pathname;
let formattedPath = path.slice(1);
formattedPath = formattedPath.split('?')[0];
if (formattedPath == 'store') {
    getapiProducts(urlProduct);
}
else {
    getapiProducts(formattedPath);
}
function showProducts(products) {
    let html = "";
    products.forEach((product) => {
        html += `
						<div class="col-lg-4 col-md-6">
							<div class="single-product" data-id=${product._id}>
								<div class="product-details">
									<a href="/product?id=${product._id}">
										<img class="img-fluid" src="/img/product/${product.image}" alt="">
										<h6 class="name">${product.name}</h6>
										<div class="price">
											<h6>${product.price_sales ? product.price_sales : product.price}</h6>
											<h6 class="l-through">${product.price_sales ? product.price : ""}</h6>
										</div>
									</a >
									<div class="prd-bottom">

										<div  class="social-info add-to-cart-btn">
											<span class="ti-bag"></span>
											<p class="hover-text">add to bag</p>
										</div>
										<div class="social-info">
											<span class="lnr lnr-heart"></span>
											<p class="hover-text">Wishlist</p>
										</div>
										<div class="social-info">
											<span class="lnr lnr-sync"></span>
											<p class="hover-text">compare</p>
										</div>
										<div class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</div>
									</div>
								</div>
							</div>
						</div>
		`;
    });
    listProduct.innerHTML = html;
}
const area = document.querySelector('.product_image_area');
if (area) {
    getProductDetail();
}
function getProductDetail() {
    let query = new URLSearchParams(window.location.search);
    if (query.has("id")) {
        fetch("http://localhost:3000/product?id=" + query.get("id"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
            showProductDetail(data);
        });
    }
}
function showProductDetail(product) {
    const image = document.querySelector('.s_Product_carousel');
    let html = "";
    for (let i = 0; i <= 0; i++) {
        html += `<div class="single-prd-item col-12">
		<img class="img-fluid" src="/img/product/${product.image}" alt="">
	</div>`;
    }
    image.innerHTML = html;
    const name = document.querySelector('.name');
    const id = document.querySelector('.s_product_inner');
    id.setAttribute('data-id', product._id.toString());
    name.innerText = product.name;
    const price_sales = document.querySelector('.price_sales');
    price_sales.textContent = product.price_sales ? product.price_sales.toString() : product.price.toString();
}
