

const apiProducts:string= 'admin/api/products';
const apiCategories:string= 'admin/api/categories';
interface Product{
	_id:object,
	category:string,
	name:string,
	image:string,
	price:number,
	price_sales?:number,

}

interface Category{
	_id:object,
	name:string,
}
const listProducts=document.querySelector('#list-product');
function getProducts(url:string){
	fetch('http://localhost:3000/'+url)
	.then(res => res.json())
	.then(data=>{
		if(listProducts){
			displayProducts(data);
		}
		
	})
}

getProducts(apiProducts);

function displayProducts(products:Product[]){
	let html = '';
	products.forEach((product :Product,index:number)=>{
		html +=`<tr>
					<th scope="row">${index+1}</th>
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
		`
	})
	listProducts.innerHTML= html;


}
const category=document.querySelector('#category_id');

function getCategories(url: string){
	fetch('http://localhost:3000/'+url)
	.then(res=>res.json())
	.then(data=>{
			showCategories(data);
	})
}
if(category){
getCategories(apiCategories);
}
function showCategories(categories: Category[]){
	
	let html: string = '';
	categories.forEach((category: Category)=>{
		html +=`<option value="${category._id}">
					${category.name}
				</option>`
	});
	category.innerHTML= html;

}

function showDetail(id :string|object){
	const url = `http://localhost:3000/admin/api/product?_id=${id}`;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Sử dụng Request trong fetch
    fetch(request)
        .then(res => res.json())
        .then(data => {
            displayDetail(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
async function displayDetail(product :Product){
	const name = document.querySelector("#name") as HTMLInputElement;
	const price = document.querySelector("#price") as HTMLInputElement;
	const priceSales = document.querySelector("#price_sales") as HTMLInputElement;
	const category = document.querySelector('#category_id') as HTMLSelectElement;
	const id =document.querySelector('input[name="id"]') as HTMLInputElement;
	name.value =product.name;
	price.value =product.price.toString();
	priceSales.value = product.price_sales? product.price_sales.toString() : "";
	const categoryName = await getCategoryName(product.category);
  	category.value = categoryName._id;
	
	
	id.value = product._id.toString();
	
}
 

async function updateProduct(x :any){
	const parent= x.parentElement.parentElement;
	const name = parent.querySelector('#name') as HTMLInputElement;
	const price = parent.querySelector("#price") as HTMLInputElement;
	const priceSales = parent.querySelector("#price_sales") as HTMLInputElement;
	const category = parent.querySelector('#category_id') as HTMLSelectElement;
	const id =parent.querySelector('input[name="id"]') as HTMLInputElement;
	const file = parent.querySelector('#img').files[0];
	const formData = new FormData();
	formData.append("name", name.value);
	formData.append("price", price.value);
	formData.append("price_sales", priceSales.value);
	formData.append("category", category.value);
	formData.append("image", file);
	try {
		const response = await fetch("/admin/update/product?_id="+id.value, {
            method: 'POST',
            body: formData
        });

		if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }

        window.location.href = "/admin/products";
	} catch (error) {
		alert("Có lỗi xảy ra khi gửi request");
	}
}

async function deleteProduct(id : string| object) {
	alert("bạn có muốn xoá sản phẩm");
	try {
		const response = await fetch("/admin/delete/product?_id="+id,{
			method: "DELETE",

		})
		if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }
		window.location.href = "/admin/products";
	} catch (error) {
		alert("Có lỗi xảy ra khi gửi request");
	}
}

async function getCategoryName(id :string| object) {
	try {
		const response = await fetch("/admin/api/category?_id="+id,{
			method: "GEt",

		});
		const data = await response.json();
		 // Kiểm tra dữ liệu trả về từ API
		return data;
	} catch (error) {
		console.error('Error fetching category:', error);
		return '';
	}
		
		
	
}