function pageLoad() {
            document.getElementById("Signup").style.display="none";
            document.getElementById("loginButton").addEventListener("click", login);
    }


function login() {

    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    fetch("/users/login", {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(responseData => {

        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);
        } else {

            Cookies.set("sessionToken", responseData.sessionToken);

            window.location.href = '/client/index.html';
        }
    });
}

function Signup() {
    document.getElementById("Login").style.display="none";
    document.getElementById("Signup").style.display="Block";
}

function NewAccount() {
    const form = document.getElementById("SignupForm");
    const formData = new FormData(form);
    fetch('/users/create', {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(responseData => {

        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);
        } else {
            window.location.href = '/client/index.html';
        }
    });
}