const API_URL = "http://localhost:3000/signIn";
const button = document.getElementById('signIn');

button.addEventListener('click', event => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    axios.post(
        API_URL, {email, pass},
        )
        .then(response => {
            console.log(response.data); // response.data ya es un JSON
            location.href = 'http://localhost:5500/products.html';
        }).catch(err => {
            
            const msgError = document.getElementById('msg-error');
            msgError.innerHTML = `<p class="text-danger">${err.response.data.error}</p>`;
            setTimeout(()=>{
                msgError.innerHTML = `<p></p>`;
            },3000);     
    });   

});

