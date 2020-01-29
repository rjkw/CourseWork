let userName;
let UserID;
// Setting up variables that will  be used.
function pageLoad() {
    // This function is called on pageload which is done with my onload attribute on my html body.
        let leaderboardHTML = `<table align="center">` + // First we declare a a variable for the table that the database will be inputted into.
            '<tr>' +
            '<th style="font-family: hot_sauceitalic", font>Placement</th>' +
            `<th style="font-family: hot_sauceitalic">UserName</th>` +
            '<th class="last" style="font-family: hot_sauceitalic" >Score</th>' +
            '</tr>';
        // This section will declare the Titles of the table, so we can add some styles to make it consistent with the rest of the website and then the actual text.

        fetch('/leaderboard/userNameList', {method:'get'} // Next we fetch the API which includes 
        ).then(response => response.json()
        ).then(positions => {
            for (let position of positions) {
                leaderboardHTML += `<tr>` +
                    `<td style="">${position.Placement}</td>` +
                    `<td>${position.userName}</td>` +
                    `<td class="last">${position.Score}</td>` +
                    // Finally these lines of code are the actual table data (Shown by <td>) This is where the data is actually put into, and this will be populated with data from my Datbase until there is no more entries.
                    `</tr>`;


            }
            leaderboardHTML += '</table>';
// This ends the table tag to ensure that it is fully closed.
            document.getElementById("Content").innerHTML = leaderboardHTML;
// Finally this inputs the actual table (identified as leaderboardHTML) into my “Content” div in my page so that it actually prints.
        });
    }







