function pageLoad() {
    checkadmin()
    document.getElementById("UserDatabaseDiv").style.display="none";
document.getElementById("UserIDDiv").style.display="none";
}


function WordTableCreate() {
    document.getElementById("UserDatabaseDiv").style.display="none";
    document.getElementById("UserIDDiv").style.display="none";
    let WordsHTML = `<table align="center">` +
        '<tr>' +
        '<th style="position: sticky">WordID</th>' +
        `<th style="position: sticky">Definition</th>` +
        '<th class="last" style="position: sticky">Difficulty</th>' +
        '</tr>';


    fetch('/words/list', {method: 'get'}
    ).then(response => response.json()
    ).then(Words => {
        for (let Word of Words) {
            WordsHTML += `<tr>` +
                `<td>${Word.WordID}</td>` +
                `<td>${Word.Definition}</td>` +
                `<td class="last">${Word.Difficulty}</td>` +
                `</tr>`;
        }
        WordsHTML += '</table>';
        document.getElementById("Content").innerHTML = WordsHTML;
    });
}

function UserTableCreate() {
    document.getElementById("UserDatabaseDiv").style.display="none";
    document.getElementById("UserIDDiv").style.display="block";
    let UsersHTML = `<table align="center">` +

        '<tr>' +
        '<th style="position: sticky">UserID</th>' +
        `<th style="position: sticky">Username</th>` +
        `<th style="position: sticky">FirstName</th>` +
        `<th style="position: sticky">LastName</th>` +
        `<th style="position: sticky">Email</th>` +
        '<th class="last" style="position: sticky">UserType</th>' +
        '</tr>';

    fetch('/users/list', {method: 'get'}
    ).then(response => response.json()
    ).then(Users => {
        for (let User of Users) {
            UsersHTML += `<tr>` +
                `<td>${User.UserID}</td>` +
                `<td>${User.userName}</td>` +
                `<td>${User.firstName}</td>` +
                `<td>${User.lastName}</td>` +
                `<td>${User.Email}</td>` +
                `<td class="last">${User.userType}</td>` +
                `</tr>`;
        }
        UsersHTML += '</table>';
        document.getElementById("Content").innerHTML = UsersHTML;
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

            } else {
                adminstatus = Boolean(false);
                window.location.href = '/client/index.html';
            }
        }
    });
}

function editUser() {
    let UserID = document.getElementById("UserID").value;

    if (UserID === null || UserID === "0" || UserID === "") {
        alert("Please enter a valid UserID! See table ->")
    } else {
        if (UserID === null ) {
            document.getElementById("firstName").value = '';
            document.getElementById("lastName").value = '';
            document.getElementById("userName").value = '';
            document.getElementById("Email").value = '';
            document.getElementById("Password").value = '';

        } else
            document.getElementById("UserDatabaseDiv").style.display = "Block";
            document.getElementById("UserIDDiv").style.display = "none";
             fetch('/users/User/' + UserID, {method: 'get'}
              ).then(response => response.json()
              ).then(User => {

            if (User.hasOwnProperty('error')) {
                alert(User.error);
            } else {
                document.getElementById("firstName").value = User.firstName;
                document.getElementById("lastName").value = User.lastName;
                document.getElementById("userName").value = User.userName;
                document.getElementById("Email").value = User.Email;
                document.getElementById("Password").value = User.Password;

            }

        });

    }
}

