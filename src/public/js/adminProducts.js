const apiProducts = 'admin/api/products';
const apiCategories = 'admin/api/categories';
const listProducts = document.querySelector('#list-product');
function getProducts(url) {
    fetch('http://localhost:3000/' + url)
        .then(res => res.json())
        .then(data => {
        if (listProducts) {
            displayProducts(data);
        }
    });
}
getProducts(apiProducts);
function displayProducts(products) {
    let html = '';
    products.forEach((product, index) => {
        html += `<tr>
					<th scope="row">${index + 1}</th>
					<td><h4 class="name">${product.name}</h4></td>
					<td><img src="/img/product/${product.image}" class="img-fluid" alt=""></td>
					<td><span>${product.price}</span></td>
					<td><span>${product.price_sales}</span></td>
					<td>
							<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetail('${product._id}')">Edit</button>
							<button type="button" class="btn btn-danger" onclick="deleteProduct('${product._id}')"
								>Delete</button>
					</td>
				</tr>
		`;
    });
    listProducts.innerHTML = html;
}
const category = document.querySelector('#category_id');
function getCategories(url) {
    fetch('http://localhost:3000/' + url)
        .then(res => res.json())
        .then(data => {
        showCategories(data);
    });
}
if (category) {
    getCategories(apiCategories);
}
function showCategories(categories) {
    let html = '';
    categories.forEach((category) => {
        html += `<option value="${category._id}">
					${category.name}
				</option>`;
    });
    category.innerHTML = html;
}
function showDetail(id) {
    const url = `http://localhost:3000/admin/api/product?_id=${id}`;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    fetch(request)
        .then(res => res.json())
        .then(data => {
        displayDetail(data);
    })
        .catch(error => {
        console.error('Error:', error);
    });
}
async function displayDetail(product) {
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const priceSales = document.querySelector("#price_sales");
    const category = document.querySelector('#category_id');
    const id = document.querySelector('input[name="id"]');
    name.value = product.name;
    price.value = product.price.toString();
    priceSales.value = product.price_sales ? product.price_sales.toString() : "";
    const categoryName = await getCategoryName(product.category);
    category.value = categoryName._id;
    id.value = product._id.toString();
}
async function updateProduct(x) {
    const parent = x.parentElement.parentElement;
    const name = parent.querySelector('#name');
    const price = parent.querySelector("#price");
    const priceSales = parent.querySelector("#price_sales");
    const category = parent.querySelector('#category_id');
    const id = parent.querySelector('input[name="id"]');
    const file = parent.querySelector('#img').files[0];
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("price_sales", priceSales.value);
    formData.append("category", category.value);
    formData.append("image", file);
    try {
        const response = await fetch("/admin/update/product?_id=" + id.value, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }
        window.location.href = "/admin/products";
    }
    catch (error) {
        alert("Có lỗi xảy ra khi gửi request");
    }
}
async function deleteProduct(id) {
    alert("bạn có muốn xoá sản phẩm");
    try {
        const response = await fetch("/admin/delete/product?_id=" + id, {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }
        window.location.href = "/admin/products";
    }
    catch (error) {
        alert("Có lỗi xảy ra khi gửi request");
    }
}
async function getCategoryName(id) {
    try {
        const response = await fetch("/admin/api/category?_id=" + id, {
            method: "GEt",
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        return '';
    }
}
