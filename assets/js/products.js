const API_URL = "http://localhost:3000/products";


// se hace una petición al API y se obtiene la lista de productos
function getProducts() {    
    axios.get( API_URL)
        .then(resp => {
            //se obtiene la lista de productos
            const products = resp.data.products; 
            // se genera una fila en el html con los datos del producto
            products.forEach((product) =>{
                //se usa jquery para agregar un fila por cada elemento a la tabla
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

//se hace una petición al API para agregar un producto
function addProduct() {

    //se obtienen los valores de los input
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
                location.reload();
            }).catch(err => {
                console.log(err);
        }); 
}

//se hace una petición al API para agregar un producto
function deleteProduct(code) {
    console.log(code)
    axios.delete(`${API_URL}/?code=${code}`)
            .then(resp => {
                $(`#${code}`).remove();
            }).catch(err => {
                console.log(err);
        }); 
}

//se hace una petición al API para editar un producto
function editProduct(code) {
    //se obtiene los datos del input modal edit
    const name = $("#edit-name").val();
    const price = $("#edit-price").val();
    const quantity = $("#edit-quantity").val();

    //se genera la peticion para editar el producto
    axios.put(API_URL, {code, name, price, quantity})
            .then(resp => {
                // $(`#${code} td:first`).val(code);
                // $(`#${code} td:nth-child(2)`).val(name);
                // $(`#${code} td:nth-child(3)`).val(price);
                // $(`#${code} td:nth-child(4)`).val(quantity);
                //location.reload();
            }).catch(err => {
                console.log(err);
        }); 
}

//se agrega evento a boton modal de eliminar producto
function setDeleteProduct(code){
    $("#delete-product").attr("onclick", `deleteProduct(${code})`);
}

//se agrega evento a boton modal de editar producto
function setEditProduct(code, name, price, quantity) {
    //agregamos valores a los input correspondientes
    $("#edit-name").val(name);
    $("#edit-price").val(price);
    $("#edit-quantity").val(quantity);
    $("#edit-product").attr("onclick", `editProduct(${code})`);
}


getProducts();