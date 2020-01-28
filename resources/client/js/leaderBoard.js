let userName;
let UserID;
    function pageLoad() {
        let leaderboardHTML = `<table align="center">` +
            '<tr>' +
            '<th style="font-family: hot_sauceitalic", font>Placement</th>' +
            `<th style="font-family: hot_sauceitalic">UserName</th>` +
            '<th class="last" style="font-family: hot_sauceitalic" >Score</th>' +
            '</tr>';

        fetch('/leaderboard/userNameList', {method:'get'}
        ).then(response => response.json()
        ).then(positions => {
            for (let position of positions) {
                leaderboardHTML += `<tr>` +
                    `<td style="">${position.Placement}</td>` +
                    `<td>${position.userName}</td>` +
                    `<td class="last">${position.Score}</td>` +
                    `</tr>`;


            }
            leaderboardHTML += '</table>';
            document.getElementById("Content").innerHTML = leaderboardHTML;
        });


    }







