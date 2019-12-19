function pageLoad() {

        if(window.location.search === '?logout') {
            document.getElementById('content').innerHTML = '<h1>Logging out, please wait...</h1>';
            logout();
        } else {
            document.getElementById("loginButton").addEventListener("click", login);
            document.getElementById("logoutButton").addEventListener("click", logout);
        }

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

