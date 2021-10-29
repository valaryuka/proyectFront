const API_URL = "http://localhost:3000/products";

function getProducts() {    
    axios.get( API_URL)
        .then(resp => {
            const products = resp.data.products; // response.data ya es un JSON
            products.forEach((product) =>{
                $("tbody").append(
                    `
                    <tr id="${product.code}">
                        <td>${product.code}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>
                            <a href="#editProductModal" onclick="setEditProduct('${product.code}', '${product.name}', '${product.price}', '${product.quantity}')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                            <a href="#deleteProductModal" onclick="setDeleteProduct(${product.code})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
                        </td>
                    </tr>
                    `
                );   
            });
            
        }).catch(err => {
            console.log(err); 
    });  
}

function addProduct() {

    const name = $("#add-name").val();
    const price = $("#add-price").val();
    const quantity = $("#add-quantity").val();


    axios.post(API_URL, {name, price, quantity})
            .then(resp => {
                const product = resp.data.message;
                console.log(resp.data)
                // $("tbody").append(`
                //     <tr id="${product.code}">
                //         <td>${product.code}</td>
                //         <td>${product.name}</td>
                //         <td>${product.price}</td>
                //         <td>${product.quantity}</td>
                //         <td>
                //             <a href="#editProductModal" onclick="setEditProduct('${product.code}', '${product.name}', '${product.price}', '${product.quantity}')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                //             <a href="#deleteProductModal" onclick="setDeleteProduct(${product.code})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
                //         </td>
                //     </tr>
                // `);
            }).catch(err => {
                console.log(err);
        }); 
}

function deleteProduct(code) {
    console.log(code)
    axios.delete(`${API_URL}/?code=${code}`)
            .then(resp => {
                $(`#${code}`).remove();
            }).catch(err => {
                console.log(err);
        }); 
}

function editProduct(code) {
    console.log(code)
    const name = $("#edit-name").val();
    const price = $("#edit-price").val();
    const quantity = $("#edit-quantity").val();

    console.log(quantity)
    axios.put(API_URL, {code, name, price, quantity})
            .then(resp => {
                $(`#${code} td:first`).val(code);
                $(`#${code} td:nth-child(2)`).val(name);
                $(`#${code} td:nth-child(3)`).val(price);
                $(`#${code} td:nth-child(4)`).val(quantity);
                location.reload();
                console.log(resp)
            }).catch(err => {
                console.log(err);
        }); 
}

function setDeleteProduct(code){
    $("#delete-product").attr("onclick", `deleteProduct(${code})`);
}

function setEditProduct(code, name, price, quantity) {
    $("#edit-name").val(name);
    $("#edit-price").val(price);
    $("#edit-quantity").val(quantity);
    $("#edit-product").attr("onclick", `editProduct(${code})`);
}


getProducts();