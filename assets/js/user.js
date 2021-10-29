const API_URL = "http://localhost:3000/signIn";
const button = document.getElementById('signIn');

//para capturar evento del boton inicio sesion
button.addEventListener('click', event => {
    event.preventDefault();

    //se obtiene los valores de los input
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    //se genera la peticion al API
    axios.post(
        API_URL, {email, pass},
        )
        .then(response => {
            //Si todo sale bien se redirecciona
            console.log(response.data); // response.data ya es un JSON
            if(response.data.ok == true){
                location.href = 'http://localhost:5500/products.html';
            }
            
        }).catch(err => {
            //si algo sale mal se imprime un mensaje
            const msgError = document.getElementById('msg-error');
            msgError.innerHTML = `<p class="text-danger">${err.response.data.error}</p>`;
            //luego de 3 segundos se elimina el mensaje
            setTimeout(()=>{
                msgError.innerHTML = `<p></p>`;
            },3000);     
    });   

});

