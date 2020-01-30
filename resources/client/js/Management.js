let UserID
function pageLoad() {
    checkadmin()
    document.getElementById("UserDatabaseDiv").style.display="none";
}


function WordTableCreate() {
    document.getElementById("UserDatabaseDiv").style.display="none";

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





    let UsersHTML = `<table align="center">` +

        '<tr>' +
        '<th style="position: sticky">UserID</th>' +
        `<th style="position: sticky">Username</th>` +
        `<th style="position: sticky">FirstName</th>` +
        `<th style="position: sticky">LastName</th>` +
        `<th style="position: sticky">Email</th>` +
        `<th class="last" style="position: sticky">UserType</th>` +


        '</tr>';

    fetch('/users/list', {method: 'get'}
    ).then(response => response.json()
    ).then(Users => {
        if (Users.hasOwnProperty('error')) {
            alert(Users.error);
        } else {
            for (let User of Users) {
            if (User.userType === "Admin") {
                console.log("Make user")
            UsersHTML += `<tr>` +
                `<td>${User.UserID}</td>` +
                `<td>${User.userName}</td>` +
                `<td>${User.firstName}</td>` +
                `<td>${User.lastName}</td>` +
                `<td>${User.Email}</td>` +
                `<td>${User.userType}</td>` +
                `<td> <a class="MakeUserButton" data-id="${User.UserID}">Make User</a></td>` +
                `<td> <a class="DeleteUserButton" data-id="${User.UserID}">Delete</a></td>` +
                `<td> <a class="EditUserButton" data-id="${User.UserID}">Edit</a></td>` +
                `</tr>`;
                } else {
                console.log("Make Admin")
                UsersHTML += `<tr>` +
                `<td>${User.UserID}</td>` +
                `<td>${User.userName}</td>` +
                `<td>${User.firstName}</td>` +
                `<td>${User.lastName}</td>` +
                `<td>${User.Email}</td>` +
                `<td>${User.userType}</td>` +
                `<td> <a class="MakeAdminButton" data-id="${User.UserID}">Make Admin</a></td>` +
                    `<td> <a class="DeleteUserButton" data-id="${User.UserID}">Delete</a></td>` +
                    `<td> <a class="EditUserButton" data-id="${User.UserID}">Edit</a></td>` +
                `</tr>`;
            }
        }
        }
        UsersHTML += '</table>';
        document.getElementById("Content").innerHTML = UsersHTML;
        let UserButtons = document.getElementsByClassName("MakeUserButton");
        for (let UserButton of UserButtons) {
            UserButton.addEventListener("click", MakeUser);
        }
        let AdminButtons = document.getElementsByClassName("MakeAdminButton");
        for (let AdminButton of AdminButtons) {
            AdminButton.addEventListener("click", MakeAdmin);

        }
        let DeleteButtons = document.getElementsByClassName("DeleteUserButton");
        for (let DeleteButton of DeleteButtons) {
            DeleteButton.addEventListener("click", DeleteUser);

        }
        let EditUserButtons = document.getElementsByClassName("EditUserButton");
        for (let EditUserButton of EditUserButtons) {
            EditUserButton.addEventListener("click", editUser);

        }
    });
}


function DeleteUser(event) {
        const UserID = event.target.getAttribute("data-id")
        const formData = new FormData();
        formData.append("UserID", UserID);

// Next we declare the formData as this is how the API will be taking in data, inside of this form is all the input boxes from earlier now populated with data. We also append the form data as the API requires the UserID which is automatically being set as a variable we can simply pass it.
        fetch('/users/delete', {method: 'post', body: formData}
        ).then(response => response.json()
        ).then(responseData => {

            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);// Error catching
            } else {
                console.log("User deleted")
                window.document.location = '/client/WordDatabase.html';
                // If the API runs with no issues the data inside of the input boxes will be put into the database and they user will be redirected to the index.html
            }
        });
    }

function MakeUser(event) {
    const UserID = event.target.getAttribute("data-id")
    const formData = new FormData();
    formData.append("targetuser", UserID);
    fetch("/users/makeuser", {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);

        } else {
            window.document.location = '/client/WordDatabase.html';
        }
    });
}

function MakeAdmin(event) {
    const UserID = event.target.getAttribute("data-id")
    const formData = new FormData();
    formData.append("targetuser", UserID);
    fetch("/users/makeadmin", {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);

        } else {
            window.document.location = '/client/WordDatabase.html';
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

            } else {
                adminstatus = Boolean(false);
                window.location.href = '/client/index.html';
            }
        }
    });
}

function editUser(event) {
    const UserID = event.target.getAttribute("data-id")
    console.log(UserID)
    if (UserID === null || UserID === "0" || UserID === "") {
    } else {
        if (UserID === null) {
            document.getElementById("firstName").value = '';
            document.getElementById("lastName").value = '';
            document.getElementById("userName").value = '';
            document.getElementById("Email").value = '';
            document.getElementById("Password").value = '';
            console.log(document.getElementById("firstName").value)
            console.log(document.getElementById("firstName").value)

        } else {
            console.log(document.getElementById("firstName").value)
            document.getElementById("UserDatabaseDiv").style.display = "Block";
            document.getElementById("Content").style.display="none"

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
}

    function saveEditUser(event) { // This function is used to save the data if any data has been adjusted, it is called when the save button is clicked on the page.

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


        const formData = new FormData();
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

function Back() {
    document.getElementById("DeleteCreateUserDIV").style.display="none";
    document.getElementById("UserDatabaseDiv").style.display = "none";
}