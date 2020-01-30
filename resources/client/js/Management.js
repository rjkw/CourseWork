let UserID
function pageLoad() { // This function is ran when the page is loaded due to my html body having the attribute onload="pageLoad()"
    checkadmin()  // On page load the first function we run is a check admin function this is to ensure that the user accessing the page is a an admin, and if they are not it will redirect them to the main page.
    document.getElementById("UserDatabaseDiv").style.display="none"; // Hides the div with the form in for editing users.
}


function WordTableCreate() {
    document.getElementById("UserDatabaseDiv").style.display="none"; // Hides the div with the form in for editing users.

    let WordsHTML = `<table align="center">` + // Next we have the function to create the WordsDatabase HTML table.
        // First we open the table tag to begin drawing the table.
        '<tr>' +
        '<th style="position: sticky">WordID</th>' +
        `<th style="position: sticky">Definition</th>` +
        '<th class="last" style="position: sticky">Difficulty</th>' +
        '</tr>';
    // First we assign the headings using the <th> tag.


    fetch('/words/list', {method: 'get'}
    ).then(response => response.json()
    ).then(Words => {
        if (Words.hasOwnProperty('error')) {
            alert(Words.error); // Error catching
        } else {
            for (let Word of Words) {
                WordsHTML += `<tr>` +
                    `<td>${Word.WordID}</td>` +
                    `<td>${Word.Definition}</td>` +
                    `<td class="last">${Word.Difficulty}</td>` +
                    `</tr>`;
                // We then call the words/list API which lists of the entire Words database records - the WordID,Definition and Difficulty.
                // After this we run a for loop to loop through the entire table and place it into a table data cell depending on its name.
            }
        }
        WordsHTML += '</table>';
        document.getElementById("Content").innerHTML = WordsHTML;
        // We then close the table tag and replace the <div>s innerHTML called with the ID "Content" and replace it with the WordsHTML which is the variable for our table.
    });
}

function UserTableCreate() { // Next we have the function to create the UserTable HTML table.
    document.getElementById("UserDatabaseDiv").style.display="none";// Hides the div with the form in for editing users.
    let UsersHTML = `<table align="center">` +
        // First we open the table tag to begin drawing the table.
        '<tr>' +
        '<th style="position: sticky">UserID</th>' +
        `<th style="position: sticky">Username</th>` +
        `<th style="position: sticky">FirstName</th>` +
        `<th style="position: sticky">LastName</th>` +
        `<th style="position: sticky">Email</th>` +
        `<th class="last" style="position: sticky">UserType</th>` +
        '</tr>';
    // First we assign the headings using the <th> tag.

    fetch('/users/list', {method: 'get'}
    ).then(response => response.json()
    ).then(Users => {
        if (Users.hasOwnProperty('error')) {
            alert(Users.error); // Error catching
        } else {
            for (let User of Users) {
                // I then call the users/list API which lists off all the records in the UserTable table, it does this by using a for loop.
                // This table is slightly different to my Words Table as I am able to edit the Users from this page so I run some validation to check the usertype.
            if (User.userType === "Admin") {
                // If the user is an Admin this path will run
                console.log("Make user")
            UsersHTML += `<tr>` +
                `<td>${User.UserID}</td>` +
                `<td>${User.userName}</td>` +
                `<td>${User.firstName}</td>` +
                `<td>${User.lastName}</td>` +
                `<td>${User.Email}</td>` +
                `<td>${User.userType}</td>` +
                // First it draws the table data, all of the records.
                `<td> <a class="MakeUserButton" data-id="${User.UserID}">Make User</a></td>` +
                `<td> <a class="DeleteUserButton" data-id="${User.UserID}">Delete</a></td>` +
                `<td> <a class="EditUserButton" data-id="${User.UserID}">Edit</a></td>` +
                `</tr>`;
            // After that I add a few more <td> cells,this is how I will interact with the table.
                // A <td> tag for a Make user button, Delete button and a edit button.
                // I Also include a data-id tag, this will allow me to call the data in the button when I call the event.
                } else {
                // If the user is not an admin this path will run instead.
                console.log("Make Admin")
                UsersHTML += `<tr>` +
                `<td>${User.UserID}</td>` +
                `<td>${User.userName}</td>` +
                `<td>${User.firstName}</td>` +
                `<td>${User.lastName}</td>` +
                `<td>${User.Email}</td>` +
                `<td>${User.userType}</td>` +
                    // First it draws the table data, all of the records.
                `<td> <a class="MakeAdminButton" data-id="${User.UserID}">Make Admin</a></td>` +
                    `<td> <a class="DeleteUserButton" data-id="${User.UserID}">Delete</a></td>` +
                    `<td> <a class="EditUserButton" data-id="${User.UserID}">Edit</a></td>` +
                    // After that I add a few more <td> cells,this is how I will interact with the table.
                    // A <td> tag for a Make Admin button, Delete button and a edit button.
                    // I Also include a data-id tag, this will allow me to call the data in the button when I call the event.
                `</tr>`;
            }
        }
        }
        UsersHTML += '</table>';
        document.getElementById("Content").innerHTML = UsersHTML;
        // We then close the table tag and replace the <div>s innerHTML called with the ID "Content" and replace it with the UsersHTML which is the variable for our table.

        let UserButtons = document.getElementsByClassName("MakeUserButton");
        for (let UserButton of UserButtons) {
            UserButton.addEventListener("click", MakeUser);
        }
        // We then introduce add event listeners, this is what allows me to pass the data to the function.
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

// Next I declare the formData as this is how the API will be taking in data, inside of this form is all the input boxes from earlier now populated with data. We also append the form data as the API requires the UserID which is automatically being set as a variable we can simply pass it.
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
     UserID = event.target.getAttribute("data-id") // Get the UserID from the event listener declared above.
    const formData = new FormData();
    formData.append("targetuser", UserID); // Appends the formdata so the API nows which UserID to edit as I am parsing the UserID
    fetch("/users/makeuser", {method: 'post', body: formData} // Fetches the makeuser API and changes the usertype from admin to user.
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error); // Error catching

        } else {
            window.document.location = '/client/WordDatabase.html'; // Redirects to the page.
        }
    });
}

function MakeAdmin(event) {
     UserID = event.target.getAttribute("data-id") // Get the UserID from the event listener declared above.
    const formData = new FormData();
    formData.append("targetuser", UserID); // Appends the formdata so the API nows which UserID to edit as I am parsing the UserID
    fetch("/users/makeadmin", {method: 'post', body: formData} // Fetches the makeuser API and changes the usertype from user to admin.
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);// Error catching


        } else {
            window.document.location = '/client/WordDatabase.html'; // Redirects to the page.
        }
    });
}

function checkadmin() { // Function to the UserType of the User accessing the page, called in pageLoad()
    fetch("/users/checkAdmin", {method: 'get'} // Fetches the API
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('error')) {
            alert(responseData.error); // Error catching

        } else {
            if (responseData.UserType === "Admin" ){ // Checks responsedatas usertype if it is equal to admin then nothing is done as they are allowed to access the page.

            } else {
                window.location.href = '/client/index.html'; // If they are not an admin they are redirected to the index.html ( main menu).
            }
        }
    });
}

function editUser(event) { // Edit user function which is called when the edit button is pressed, the event is also passed which is how we get the UserID for the user we are editing.
     UserID = event.target.getAttribute("data-id"); // Sets the UserID variable equal to the data-id
    if (UserID === null || UserID === "0" || UserID === "") { // Validation
    } else {
        if (UserID === null) { // Validation that if the UserID is null, prints all the input boxes as empty.
            document.getElementById("firstName").value = '';
            document.getElementById("lastName").value = '';
            document.getElementById("userName").value = '';
            document.getElementById("Email").value = '';
            document.getElementById("Password").value = '';
            console.log(document.getElementById("firstName").value)
            console.log(document.getElementById("firstName").value)

        } else {
            document.getElementById("UserDatabaseDiv").style.display = "Block";
            document.getElementById("Content").style.display="none"
            // If UserID is not null, the table is hidden ("content") and we display the Div with the form inside.

            fetch('/users/User/' + UserID, {method: 'get'} // I then fetch the User/User API, this lists of the users data depending on the UserID.
            ).then(response => response.json()
            ).then(User => {

                if (User.hasOwnProperty('error')) {
                    alert(User.error); // Error catching
                } else {
                    document.getElementById("firstName").value = User.firstName;
                    document.getElementById("lastName").value = User.lastName;
                    document.getElementById("userName").value = User.userName;
                    document.getElementById("Email").value = User.Email;
                    document.getElementById("Password").value = User.Password;
                    // The API response data is then passed into the input boxes which are then able to be edited by the Admin.

                }

            });

        }
    }
}

    function saveEditUser() { // This function is used to save the data if any data has been adjusted, it is called when the save button is clicked on the page.


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

function Back() {
    document.getElementById("UserDatabaseDiv").style.display = "none";
    document.getElementById("Content").style.display="block"
    // Back button if the Admin doesnt want to edit the data.
}