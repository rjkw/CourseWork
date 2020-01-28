function pageLoad() {
        let sessionToken = Cookies.get("sessionToken")
        fetch("/users/UserID/"  + sessionToken, {method: 'get'}
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
                UserID = responseData.UserID;
                document.getElementById("UserIDs").innerText="User ID: N/A";
                editUser(UserID);

            }
        });
    }



function editUser(UserID) {
    if (UserID === null) {

        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("userName").value = '';
        document.getElementById("Email").value = '';
        document.getElementById("Password").value = '';

    } else {

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

function saveEditUser() {
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


const id = document.getElementById("UserID").value;
const form = document.getElementById("UserForm");
const formData = new FormData(form);
formData.append("UserID", UserID);
fetch('/users/update', {method: 'post', body: formData}
).then(response => response.json()
).then(responseData => {

    if (responseData.hasOwnProperty('error')) {
        alert(responseData.error);
    } else {
        window.location.href = '/client/index.html';
    }
});
}