
const tableCategory= document.querySelector('.table-category') as HTMLDivElement;

interface Category{
	_id: object,
	name: string
}
if (tableCategory){
	urlCategories();

}
function urlCategories(){
	fetch('http://localhost:3000/admin/api/categories')
	.then(res => res.json())
	.then(data =>{
		displayCategories(data);
	})
}

function displayCategories(categories : Category[]){
	let html : string = '';
	const listCategory = document.querySelector('#list-category') as HTMLElement;
	categories.forEach((category: Category,index:number) =>{
		html +=`<tr>
				<th scope="row">${index+1}</th>
				<td><h4 class="name">${category.name}</h4></td>
				<td>
							<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showCate('${category._id}')">Edit</button>
							<button type="button" class="btn btn-danger" onclick="deleteCate('${category._id}')"
								>Delete</button>
					</td>
				</tr>`;

	})
	listCategory.innerHTML=html;
}

function showCate(id :string|object){
	const url =`http://localhost:3000/admin/api/category?_id=${id}`;
	const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
	fetch(request)
        .then(res => res.json())
        .then(data => {
           getCategory(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getCategory(category :Category){
	const name =document.querySelector('#name') as HTMLInputElement;
	const id =document.querySelector('input[name="id"]') as HTMLInputElement;

	name.value =category.name;
	id.value = category._id.toString();
}
async function updateCate(x: any) {
    const parent = x.parentElement.parentElement;
    const name = parent.querySelector('#name') as HTMLInputElement;
    const id = parent.querySelector('input[name="id"]') as HTMLInputElement;
    const formData = new URLSearchParams();
    formData.append("name", name.value);
    formData.append("id", id.value);
    try {
        const response = await fetch("/admin/update/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }

        window.location.href = "/admin/categories";
    } catch (error) {
        alert("Có lỗi xảy ra khi gửi request");
    }
}

async function deleteCate(id:any) {
    alert("bạn có muốn xoá danh mục");
	try {
		const response = await fetch("/admin/delete/category?_id="+id,{
			method: "DELETE",

		})
		if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }
		window.location.href = "/admin/categories";
	} catch (error) {
		alert("Có lỗi xảy ra khi gửi request");
	}
}
