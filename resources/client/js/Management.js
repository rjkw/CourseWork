function pageLoad() {
    checkadmin()

}


function WordTableCreate() {
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
