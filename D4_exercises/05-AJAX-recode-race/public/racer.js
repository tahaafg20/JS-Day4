// TODO: write your code here
document.addEventListener("keyup", event => {
    var firstPlace = document.querySelectorAll("tr td:first-child");
    if (event.keyCode === 80) {
        // var playerA = document.querySelector("#player1_race")
        var currentPlaceA = document.querySelector("#player1_race td.active");
        var nextPlaceA = currentPlaceA.nextElementSibling;
        if (currentPlaceA.classList.contains("finish")) {
            var finalB = document.querySelector("#player2_race td.active");
            currentPlaceA.classList.remove("active");
            finalB.classList.remove("active");
            alert("PLAYER A WON! (RED BUS)");
            firstPlace.forEach(function (playerFirstPlace) {
                playerFirstPlace.classList.add("active");
                // currentPlaceB.classList.remove("active")
            });
        } else {
            currentPlaceA.classList.remove("active");
            nextPlaceA.classList.add("active");
        }

    } else if (event.keyCode === 81) {
        // var playerB = document.querySelector("#player2_race")
        var currentPlaceB = document.querySelector("#player2_race td.active");
        var nextPlaceB = currentPlaceB.nextElementSibling;
        if (currentPlaceB.classList.contains("finish")) {
            var finalA = document.querySelector("#player1_race td.active");
            currentPlaceB.classList.remove("active");
            alert("PLAYER B WON! (BLUE BUS)");
            finalA.classList.remove("active");
            firstPlace.forEach(function (playerFirstPlace) {
                // currentPlaceA.classList.remove("active")
                playerFirstPlace.classList.add("active");
            });
        } else {
            currentPlaceB.classList.remove("active");
            nextPlaceB.classList.add("active");
        }
    }
});


var startButton = document.querySelector("#gamestart");

startButton.addEventListener("click", validation);

function showGame() {
    var form = document.querySelector("#startgame_form");
    var gameBoard = document.querySelector("#gameBoard");
    form.classList.add("d-none");
    gameBoard.classList.remove("d-none");
}

function validation(e) {
    e.preventDefault();
    var player1Name = document.querySelector("#player1").value;
    var player2Name = document.querySelector("#player2").value;

    var playerNames = {
        "player1": `${player1Name}`,
        "player2": `${player2Name}`
    };
    if (player1Name != player2Name && player1Name != "" && player2Name != "") {
        var sessionUrl = "/sessions";
        fetch(sessionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (resp) {
                return resp.json();
            }) // Convert data to json
            .then(function (data) {
                const sessionId = data["session"].id;
                var sendData = `/sessions/${sessionId}/games`;
                fetch(sendData, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(playerNames)
                    })
                    .then(function (resp1) {
                        return resp1.json();
                    }) // Convert data to json
                    .then(function (data1) {
                        
                    })
                    .catch(function () {});
            })
            .catch(function () {
                // catch any errors
            });

        function countdown(parent, callback) {

            // This is the function we will call every 1000 ms using setInterval

            function count() {

                if (paragraph) {

                    // Remove the paragraph if there is one
                    paragraph.remove();

                }

                if (texts.length === 0) {

                    // If we ran out of text, use the callback to get started
                    // Also, remove the interval
                    // Also, return since we dont want this function to run anymore.
                    clearInterval(interval);
                    callback();
                    return;

                }

                // Get the first item of the array out of the array.
                // Your array is now one item shorter.
                var text = texts.shift();

                // Create a paragraph to add to the DOM
                // This new paragraph will trigger an animation
                paragraph = document.createElement("p");
                paragraph.textContent = text;
                paragraph.className = text + " nums";

                parent.appendChild(paragraph);

            }

            // These are all the text we want to display
            var texts = ['three', 'two', 'one'];

            // This will store the paragraph we are currently displaying
            var paragraph = null;

            // Initiate an interval, but store it in a variable so we can remove it later.
            var interval = setInterval(count, 1000);

        }

        // Start a countdown by passing in the parentnode you want to use.
        // Also add a callback, where you start your game.
        countdown(document.getElementById("readyGo"), function () {

            document.getElementById("readyGo").innerHTML = `<p class="nums">start</p>`;

        });
        showGame();
    } else {
        alert("name is invalid");
    }
}