function pageLoad() {



const sessionToken =Cookies.get("sessionToken")
    if (sessionToken === undefined ) {
        showThing("logged out")

    } else {
        showThing("logged in");
    }




    document.getElementById("p6").addEventListener("click", function() {logout( );});
}

function showThing(option ) {

    if (option == "logged out") {
        document.getElementById("p6").style.display = "none";
        document.getElementById("p4").style.display = "block";
    } else if (option == "logged in") {
        document.getElementById("p4").style.display = "none";
        document.getElementById("p6").style.display = "block";

    }

}


function logout() {

    fetch("/users/logout", {method: 'get'}
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);

        } else {

            Cookies.remove("sessionToken");

            window.location.href = '/client/index.html';

        }
    });

}
