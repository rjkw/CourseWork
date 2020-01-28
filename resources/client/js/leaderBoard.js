let userName;
let UserID;
    function pageLoad() {
        document.getElementById("Content").style.display="none";
        let leaderboardHTML = `<table align="center">` +
            '<tr>' +
            '<th style="font-family: hot_sauceitalic", font>Placement</th>' +
            `<th style="font-family: hot_sauceitalic">UserName</th>` +
            '<th class="last" style="font-family: hot_sauceitalic" >Score</th>' +
            '</tr>';

        fetch('/leaderboard/list', {method:'get'}
        ).then(response => response.json()
        ).then(positions => {
            for (let position of positions) {
                leaderboardHTML += `<tr>` +
                    `<td style="">${position.Placement}</td>` +
                    `<td>${UserID = position.UserID}</td>` +
                    `<td class="last">${position.Score}</td>` +
                    `</tr>`;

                fetch("/users/userName/" + UserID, {method: 'get'}
                ).then(response => response.json()
                ).then(responseData => {

                    if (responseData.hasOwnProperty('error')) {
                        alert(responseData.error);
                    } else {
                            userName = responseData.userName;
                        LeaderBoards(userName)

                    }
                });


            }
            leaderboardHTML += '</table>';
            document.getElementById("Content").innerHTML = leaderboardHTML;
        });


    }
function LeaderBoards() {
    let leaderboardHTML = `<table align="center">` +
        '<tr>' +
        '<th style="font-family: hot_sauceitalic", font>Placement</th>' +
        `<th style="font-family: hot_sauceitalic">UserName</th>` +
        '<th class="last" style="font-family: hot_sauceitalic" >Score</th>' +
        '</tr>';


    fetch('/leaderboard/list', {method: 'get'}
    ).then(response => response.json()
    ).then(positions => {
        for (let position of positions) {
            leaderboardHTML += `<tr>` +
                `<td style="">${position.Placement}</td>` +
                `<td>${userName}</td>` +
                `<td class="last">${position.Score}</td>` +
                `</tr>`;

        }
        leaderboardHTML += '</table>';
        document.getElementById("Leaderboards").innerHTML = leaderboardHTML;
    });


}








