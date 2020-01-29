function pageLoad() { // This function is ran when the page is loaded due to my html body having the attribute onload="pageLoad()"
        let sessionToken = Cookies.get("sessionToken")
        fetch("/users/UserID/"  + sessionToken, {method: 'get'}
        // Firstly we fetch the API path and declare a variable for the sessionToken as this is needed to get the Users UserID, we can achieve this by simply getting the Cookies as this page is not availlable for Users not logged in.
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error); // Error catching
            } else {
                UserID = responseData.UserID;
                document.getElementById("UserIDs").innerText="User ID: " + UserID;
                editUser(UserID);
                // Once the API has been fetched and ran we assign the responsedata to a Variable so that we can pass it to the next function., We also edit the innerText of a Label to show their UserID

            }
        });
    }



function editUser(UserID) { // After the pageLoad function has been run, editUser is called and the variable UserID is passed with this.
    if (UserID === null) {

        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("userName").value = '';
        document.getElementById("Email").value = '';
        document.getElementById("Password").value = '';

        // First some validation to ensure that the UserID is not null if it is null all of the input boxes are made empty to prevent any data showing that shouldnt be.

    } else {
        // If the UserID is not null then we fetch the API and give it the UserID so it can get the users specific details for that UserID
        fetch('/users/User/' + UserID, {method: 'get'}
        ).then(response => response.json()
        ).then(User => {

            if (User.hasOwnProperty('error')) {
                alert(User.error); // Error Catching
            } else {
                document.getElementById("firstName").value = User.firstName;
                document.getElementById("lastName").value = User.lastName;
                document.getElementById("userName").value = User.userName;
                document.getElementById("Email").value = User.Email;
                document.getElementById("Password").value = User.Password;
                // If the API runs with no errors then the Input boxes are populated with the data from the database allowing the user to edit their data.

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
        window.location.href = '/client/index.html';
        // If the API runs with no issues the data inside of the input boxes will be put into the database and they user will be redirected to the index.html
    }
});
}