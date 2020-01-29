let UserID
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
    UserID = document.getElementById("UserID").value;
    if (UserID === null || UserID === "0" || UserID === "") {
        alert("Please enter a valid UserID! See table ->")
    } else {
        if (UserID === null) {
            document.getElementById("firstName").value = '';
            document.getElementById("lastName").value = '';
            document.getElementById("userName").value = '';
            document.getElementById("Email").value = '';
            document.getElementById("Password").value = '';
            console.log(document.getElementById("firstName").value)
            console.log(document.getElementById("firstName").value)

        } else if (document.getElementById("firstName").value === "undefined") {
            console.log(document.getElementById("firstName").value)

        } else {

            console.log(document.getElementById("firstName").value)
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

    function saveEditUser() { // This function is used to save the data if any data has been adjusted, it is called when the save button is clicked on the page.
        event.preventDefault();

        if (document.getElementById("firstName").value.trim() === '') {
            alert("Please provide a Firstname!");
            return;
        }

        if (document.getElementById("lastName").value.trim() === '') {
            alert("Please provide a Lastname!");
            return;
        }

        if (document.getElementById("userName").value.trim() === '') {
            alert("Please provide a Username!");
            return;
        }

        if (document.getElementById("Email").value.trim() === '') {
            alert("Please provide an Email");
            return;
        }

        if (document.getElementById("Password").value.trim() === '') {
            alert("Please provide a Password");
            return;
        }

        // Several lines of validation to ensure that the data being entered is not null, as all the tables are linked having some null data could cause errors across the entire website.


        const id = document.getElementById("UserID").value;
        const form = document.getElementById("UserForm");
        const formData = new FormData(form);
        formData.append("UserID", UserID);

// Next we declare the formData as this is how the API will be taking in data, inside of this form is all the input boxes from earlier now populated with data. We also append the form data as the API requires the UserID which is automatically being set as a variable we can simply pass it.
        fetch('/users/update', {method: 'post', body: formData}
        ).then(response => response.json()
        ).then(responseData => {

            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);// Error catching
            } else {
                window.location.href = '/client/WordDatabase.html';
                // If the API runs with no issues the data inside of the input boxes will be put into the database and they user will be redirected to the index.html
            }
        });
    }
}