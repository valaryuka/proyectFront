const API_URL = "http://localhost:3000/products";

function getProducts() {    
    axios.get( API_URL)
        .then(response => {
            const products = response.data.products; // response.data ya es un JSON
            products.forEach((product) =>{
                $("tbody").append(
                    `
                    <tr id="${product.code}">
                        <td>${product.code}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>
                            <a href="#editProductModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                            <a href="#deleteProductModal" onclick="setInfoModal(${product.code})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
                        </td>
                    </tr>
                    `
                );   
            });
            
        }).catch(err => {
            console.log(err) 
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

function setInfoModal(code){
    $("#delete-product").attr("onclick", `deleteProduct(${code})`);
}


getProducts();