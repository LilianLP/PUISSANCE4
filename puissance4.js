let player1 = true;
let winner = false;
let turnindicator = document.getElementById('turn-indicator');
let lastPlayedCell;


function play(column) {
    if (winner) {
        return;
    }

    let availableCell = false;

    for (let i = 35 + column; i >= column; i -= 7) {
        if (!document.getElementById(i).classList.contains('player1') && !document.getElementById(i).classList.contains('player2')) {
            if (player1) {
                document.getElementById(i).classList.add('player1');
                lastPlayedCell = i;
                if (checkWin('player1')) {
                    winner = true;
                    turnindicator.innerHTML = "Les rouges ont gagné !";
                    setTimeout(function() {
                        alert('Les rouges ont gagné !');
                    }, 100);
                }
                player1 = false;
            } else {
                document.getElementById(i).classList.add('player2');
                lastPlayedCell = i;
                if (checkWin('player2')) {
                    winner = true;
                    turnindicator.innerHTML = "Les jaunes ont gagné !";
                    setTimeout(function() {
                        alert('Les jaunes ont gagné !');
                    }, 100);
                }
                player1 = true;
            }
            if (player1) {
                turnindicator.innerHTML = "Au tour des rouges";
            }
            else {
                turnindicator.innerHTML = "Au tour des jaunes";
            }
            availableCell = true;
            break;
        }
    }

    if (!availableCell && !winner) {
        setTimeout(function() {
            alert('Match nul !');
        }, 100);
    }
}

function checkWin(player) {
    // check horizontal
    for (let i = 0; i < 42; i += 7) {
        for (let j = i; j < i + 4; j++) {
            if (document.getElementById(j).classList.contains(player) &&
                document.getElementById(j + 1).classList.contains(player) &&
                document.getElementById(j + 2).classList.contains(player) &&
                document.getElementById(j + 3).classList.contains(player)) {
                return true;
            }
        }
    }

    // check vertical
    for (let i = 0; i < 21; i++) {
        if (document.getElementById(i).classList.contains(player) &&
            document.getElementById(i + 7).classList.contains(player) &&
            document.getElementById(i + 14).classList.contains(player) &&
            document.getElementById(i + 21).classList.contains(player)) {
            return true;
        }
    }

    // check diagonal
    for (let i = 0; i < 21; i++) {
        if (i % 7 <= 3) {
            if (document.getElementById(i).classList.contains(player) &&
                document.getElementById(i + 8).classList.contains(player) &&
                document.getElementById(i + 16).classList.contains(player) &&
                document.getElementById(i + 24).classList.contains(player)) {
                return true;
            }
        }

        if (i % 7 >= 3) {
            if (document.getElementById(i).classList.contains(player) &&
                document.getElementById(i + 6).classList.contains(player) &&
                document.getElementById(i + 12).classList.contains(player) &&
                document.getElementById(i + 18).classList.contains(player)) {
                return true;
            }
        }
    }

    return false;
}

// Add event listener to all table cells
let cells = document.getElementsByTagName('td');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function() {
        play(i % 7);
    });
}

function reset() {
    // supprime toutes les classes "player1" et "player2" de chaque cellule
    for (let i = 0; i < 42; i++) {
        document.getElementById(i).classList.remove('player1', 'player2');
    }

    // remet les variables à leur état initial
    player1 = true;
    winner = false;
    turnindicator.innerHTML = "C'est au tour du joueur 1 (rouge)";

}

