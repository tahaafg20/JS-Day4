// TODO: write your code here

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
    player1: `${player1Name}`,
    player2: `${player2Name}`
  };
  if (player1Name != player2Name && player1Name != "" && player2Name != "") {
    var sessionUrl = "/sessions";
    fetch(sessionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(resp) {
        
        return resp.json();
      }) // Convert data to json
      .then(function(data) {
        const sessionId = data["session"].id;
        var sendData = `/sessions/${sessionId}/games`;
        fetch(sendData, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(playerNames)
        })
          .then(function(resp1) {
            return resp1.json();
          }) // Convert data to json
          .then(function(data1) {
            var playerAId = data1.game["player"][0].id;
            var playerBId = data1.game["player"][1].id;
            var gameId = data1.game["id"];
            var winnerUrl = `/games/${gameId}/finish`;
            countdown(document.getElementById("readyGo"), function() {
              document.addEventListener("keyup", event => {
                var firstPlace = document.querySelectorAll("tr td:first-child");
                if (event.keyCode === 80) {
                  // var playerA = document.querySelector("#player1_race")
                  var currentPlaceA = document.querySelector("#player1_race td.active");
                  var nextPlaceA = currentPlaceA.nextElementSibling;
                  if (currentPlaceA.classList.contains("finish")) {
                    stop();
                    var stoppedTime1 = document.getElementById("sec").innerHTML;
                    // document.removeEventListener("keyup");
                    var winnerDetails = { "winner": `${parseInt(playerAId)}` ,
                    "elapsed_time": `${parseInt(stoppedTime1)}`};
                    fetch(winnerUrl, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(winnerDetails)
                      })
                      .then(function(resp) {
                        
                        return resp.json();
                      }) // Convert data to json
                      .then(function(data2) {
                        Object.keys(data2.game["player"]).forEach(function(key) {
                          if (data2.game["player"][key].id === parseInt(data2.game["winner"])){
                            var finalGameId = data2.game.id;
                            var gameTime = data2.game["elapsed_time"];
                            var winnerName = data2.game["player"][key].name;
                            alert(`Here is the result for the game(${finalGameId}). CONGRATS ${winnerName}, you could win in ${gameTime} seconds.`);
                          }
                      });
                      });
                    var finalB = document.querySelector("#player2_race td.active");
                    currentPlaceA.classList.remove("active");
                    finalB.classList.remove("active");
                    alert("PLAYER A WON! (RED BUS)");
                    
                    firstPlace.forEach(function(playerFirstPlace) {
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
                    stop();
                    // document.removeEventListener("keyup", );
                    var stoppedTime2 = document.getElementById("sec").innerHTML;
                    var winnerDetails2 = { "winner": `${parseInt(playerBId)}` ,
                    "elapsed_time": `${parseInt(stoppedTime2)}`};
                    fetch(winnerUrl, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(winnerDetails2)
                    })
                      .then(function(resp) {
                        
                        return resp.json();
                      }) // Convert data to json
                      .then(function(data3) {
                        Object.keys(data3.game["player"]).forEach(function(key) {
                          if (data3.game["player"][key].id === parseInt(data3.game["winner"])){
                            var finalGameId = data3.game.id;
                            var gameTime = data3.game["elapsed_time"];
                            var winnerName = data3.game["player"][key].name;
                            alert(`Here is the result for the game(${finalGameId}). CONGRATS ${winnerName}, you could win in ${gameTime} seconds.`);
                          }
                      });
                      // console.log(data3)
                    });
                    var finalA = document.querySelector("#player1_race td.active");
                    currentPlaceB.classList.remove("active");
                    alert("PLAYER B WON! (BLUE BUS)");
                    finalA.classList.remove("active");
                    firstPlace.forEach(function(playerFirstPlace) {
                      // currentPlaceA.classList.remove("active")
                      playerFirstPlace.classList.add("active");
                    });
                  } else {
                    currentPlaceB.classList.remove("active");
                    nextPlaceB.classList.add("active");
                  }
                }
              });
            });
          })
          .catch(function() {});
      })
      .catch(function() {
        // catch any errors
      });
      // function() {
      //   play();
      // }
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
          startStop();
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
      var texts = ["three", "two", "one"];

      // This will store the paragraph we are currently displaying
      var paragraph = null;

      // Initiate an interval, but store it in a variable so we can remove it later.
      var interval = setInterval(count, 1000);
    }

    // Start a countdown by passing in the parentnode you want to use.
    // Also add a callback, where you start your game.
    
    showGame();
    
  } else {
    alert("name is invalid");
  }
}

var x;
var startstop = 0;

function startStop() {
  /* Toggle StartStop */

  startstop = startstop + 1;

  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }
}

function start() {
  x = setInterval(timer, 10);
} /* Start */

function stop() {
  clearInterval(x);
} /* Stop */

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */

function timer() {
  /* Main Timer */

  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);
  hourOut = checkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;
  }

  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
  document.getElementById("hour").innerHTML = hourOut;
}

/* Adds 0 when value is <10 */

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {
  /*Reset*/

  milisec = 0;
  sec = 0;
  min = 0;
  hour = 0;

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";
}

// function play() {

// }
