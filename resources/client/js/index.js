let adminstatus = Boolean(false);

function pageLoad() {


    document.getElementById("p5").style.display = "none";
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
    } else if (option == "logged in") {
        document.getElementById("p4").style.display = "none";
        document.getElementById("p6").style.display = "block";

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

