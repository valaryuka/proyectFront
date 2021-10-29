function getProducts() {
    const API_URL = "http://localhost:3000/products";
    axios.get( API_URL)
        .then(response => {
            const products = response.data.products; // response.data ya es un JSON
            console.log(products);
            products.forEach((product) =>{
                $("tbody").append(
                    `
                    <tr>
                        <td>${product.code}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>
                            <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar" onclick="delProduct(011)">&#xE872;</i></a>
                        </td>
                    </tr>
                    `
                );
                
            });
            
        }).catch(err => {
            console.log(err) 
    });  
}

$('#myDiv').click(function(){ //Some code 
}); 

getProducts();