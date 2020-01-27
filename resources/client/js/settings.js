function editUser(event) {

    const id = event.target.getAttribute("data-id");

    if (id === null) {

        document.getElementById("editHeading").innerHTML = 'Edit user:';


        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("userName").value = '';
        document.getElementById("Email").value = '';
        document.getElementById("Password").value = '';
        document.getElementById("listDiv").style.display = 'none';
        document.getElementById("editDiv").style.display = 'block';

    } else {

        fetch('/fruit/get/' + UserID, {method: 'get'}
        ).then(response => response.json()
        ).then(fruit => {

            if (fruit.hasOwnProperty('error')) {
                alert(fruit.error);
            } else {

                document.getElementById("editHeading").innerHTML = 'Editing ' + fruit.name + ':';

                document.getElementById("fruitId").value = id;
                document.getElementById("fruitName").value = fruit.name;
                document.getElementById("fruitImage").value = fruit.image;
                document.getElementById("fruitColour").value = fruit.colour;
                document.getElementById("fruitSize").value = fruit.size;

                document.getElementById("listDiv").style.display = 'none';
                document.getElementById("editDiv").style.display = 'block';

            }

        });

    }

}