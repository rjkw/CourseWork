function pageLoad() {


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

