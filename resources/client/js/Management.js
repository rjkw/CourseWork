function pageLoad() {
    checkadmin()

}

function WordTableCreate() {
    let WordsHTML = `<table align="center">` +
        '<tr>' +
        '<th style="font-size: 20px">WordID</th>' +
        `<th style ="font-size: 20px">Definition</th>` +
        '<th class="last" style="font-size: 20px">Difficulty</th>' +
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
        '<th style="font-size: 20px">UserID</th>' +
        `<th style ="font-size: 20px">Username</th>` +
        `<th style ="font-size: 20px">FirstName</th>` +
        `<th style ="font-size: 20px">LastName</th>` +
        `<th style ="font-size: 20px">Email</th>` +
        '<th class="last" style="font-size: 20px">UserType</th>' +
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
