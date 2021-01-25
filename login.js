const alreadyLoggedIn = localStorage.getItem('loggedIn');
if(alreadyLoggedIn) {
    window.location.href = "/index.html";
}

const users = [
    {
        email: 'ricardo@mail.com',
        password: 'contraseña'
    },
    {
        email: 'arturo@mail.com',
        password: 'contraseña2'
    },
];

function login() {
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;

    const accepted = users.find((user) => user.email === email && user.password === password);

    if(accepted) {
        alert('Access granted, welcome!');
        window.location.href = "/index.html"
        localStorage.setItem('loggedIn', 'true');
    } else {
        alert('Invalid email or password');
    }
}
