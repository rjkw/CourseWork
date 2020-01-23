let userName;
    function pageLoad() {
        let leaderboardHTML = `<table align="center">` +
            '<tr>' +
            '<th style="font-family: hot_sauceitalic", font>Placement</th>' +
            `<th style="font-family: hot_sauceitalic">UserID</th>` +
            '<th class="last" style="font-family: hot_sauceitalic" >Score</th>' +
            '</tr>';


        fetch('/leaderboard/list', {method:     'get'}
        ).then(response => response.json()
        ).then(positions => {
            for (let position of positions) {
                leaderboardHTML += `<tr>` +
                    `<td style="">${position.Placement}</td>` +
                    `<td>${position.UserID}</td>` +
                    `<td class="last">${position.Score}</td>` +
                    `</tr>`;
            }
            leaderboardHTML += '</table>';
            document.getElementById("Content").innerHTML = leaderboardHTML;
        });

        fetch("/users/userName/" + UserID, {method: 'get'}
        ).then(response => response.json()
        ).then(responseData => {

            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
                userName =  responseData.userName;

            }
        });

    }


