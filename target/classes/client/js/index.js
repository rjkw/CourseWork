function pageLoad() {



const sessionToken =Cookies.get("sessionToken")

    if (sessionToken === undefined ) {
        showLoginLogOut("logged out");

    } else {
        showLoginLogOut("logged in");
    }

    if (sessionToken === undefined) {
    } else {
        checkadmin(sessionToken)
    }



    document.getElementById("p6").addEventListener("click", function() {logout( );});
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

function hideadmin(userType) {
    if (userType == adminstatus) {
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

            window.location.href = '/client/index.html';

        }
    });

}


function checkadmin() {
    var adminnstatus = false;
    fetch("/users/checkAdmin", {method: 'get'}
    ).then(response => response.json()
    ).then(responseData => {

        if (responseData.hasOwnProperty('error')) {
            if (results = false) {
                adminnstatus=false;
                alert("bad poop")
            } else if (results=true) {
                adminnstatus=true;
                alert("good poop")
            }
        } else {
            alert(responseData.error);

        }
    });
}