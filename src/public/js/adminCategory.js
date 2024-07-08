const tableCategory = document.querySelector('.table-category');
if (tableCategory) {
    urlCategories();
}
function urlCategories() {
    fetch('http://localhost:3000/admin/api/categories')
        .then(res => res.json())
        .then(data => {
        displayCategories(data);
    });
}
function displayCategories(categories) {
    let html = '';
    const listCategory = document.querySelector('#list-category');
    categories.forEach((category, index) => {
        html += `<tr>
				<th scope="row">${index + 1}</th>
				<td><h4 class="name">${category.name}</h4></td>
				<td>
							<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showCate('${category._id}')">Edit</button>
							<button type="button" class="btn btn-danger" onclick="deleteCate('${category._id}')"
								>Delete</button>
					</td>
				</tr>`;
    });
    listCategory.innerHTML = html;
}
function showCate(id) {
    const url = `http://localhost:3000/admin/api/category?_id=${id}`;
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
function getCategory(category) {
    const name = document.querySelector('#name');
    const id = document.querySelector('input[name="id"]');
    name.value = category.name;
    id.value = category._id.toString();
}
async function updateCate(x) {
    const parent = x.parentElement.parentElement;
    const name = parent.querySelector('#name');
    const id = parent.querySelector('input[name="id"]');
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
    }
    catch (error) {
        alert("Có lỗi xảy ra khi gửi request");
    }
}
async function deleteCate(id) {
    alert("bạn có muốn xoá danh mục");
    try {
        const response = await fetch("/admin/delete/category?_id=" + id, {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Lỗi không xác định");
        }
        window.location.href = "/admin/categories";
    }
    catch (error) {
        alert("Có lỗi xảy ra khi gửi request");
    }
}
