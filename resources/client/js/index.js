let adminstatus = Boolean(false);
let username;
let token

function pageLoad() {
    document.getElementById("p5").style.display = "none";
    document.getElementById("p5").style.display = "none";
    document.getElementById("p7").style.display = "none";

   token = Cookies.get("sessionToken")
    fetch("/users/UserName/" + token, {method: 'get'}
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);
        } else {
            username = (responseData.userName)
            if (username === undefined) {
                document.getElementById("p7").style.display = "none";
            } else {
                document.getElementById("p7").innerText = "Logged in as: " + username;
                document.getElementById("p7").style.display = "block";
            }
        }
    });





const sessionToken =Cookies.get("sessionToken")
    if (sessionToken === undefined ) {
        showLoginLogOut("logged out");
    } else {
        showLoginLogOut("logged in");
        checkadmin()
    }
}

function showLoginLogOut(option) {

    if (option == "logged out") {
        document.getElementById("p6").style.display = "none";
        document.getElementById("p4").style.display = "block";
        document.getElementById("p3").style.display = "none"
    } else if (option == "logged in") {
        document.getElementById("p4").style.display = "none";
        document.getElementById("p6").style.display = "block";
        document.getElementById("p3").style.display = "block"

    }

}
function hideadmin() {
    if (adminstatus === true)
    {
        document.getElementById("p5").style.display = "block";
    } else {
        document.getElementById("p5").style.display = "none";
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
            adminstatus = Boolean(false);
            window.location.href = '/client/index.html';

        }
    });
}


function checkadmin() {
    fetch("/users/checkAdmin", {method: 'get'}
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);

        } else {
            if (responseData.UserType === "Admin" ){
                adminstatus = Boolean(true);
                hideadmin()
            } else {
                adminstatus = Boolean(false);
                hideadmin()
            }
        }
    });
}

