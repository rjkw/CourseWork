let userName;
    function pageLoad() {
        let leaderboardHTML = `<table align="center">` +
            '<tr>' +
            '<th style="font-size: 20px">Score</th>' +
            `<th style="font-size: 20px">Placement</th>` +
            '<th class="last" style="font-size: 20px">UserID</th>' +
            '</tr>';


        fetch('/leaderboard/list', {method: 'get'}
        ).then(response => response.json()
        ).then(positions => {
            for (let position of positions) {
                leaderboardHTML += `<tr>` +
                    `<td>${position.Score}</td>` +
                    `<td>${position.Placement}</td>` +
                    `<td class="last">${position.UserID}</td>` +
                    `</tr>`;
            }
            leaderboardHTML += '</table>';
            document.getElementById("Content").innerHTML = leaderboardHTML;
        });

        fetch("/users/userName/" + 2, {method: 'get'}
        ).then(response => response.json()
        ).then(responseData => {

            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
                userName =  responseData.userName;
                alert(userName);
            }
        });

    }


