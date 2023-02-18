//javascript by Jeremy
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

const homePage = document.getElementById("home");
const rulesPage = document.getElementById("rules")
const gamePage = document.getElementById("gamePage");
const leaderBoardPage = document.getElementById("leaderBoard");
const $userList = document.getElementById("userList");
const $navHomeBTN = document.getElementById("navHome");
const $navLeaderBTN = document.getElementById("navLeader");
const $startBTN = document.getElementById("startBTN");
const $ruleBTN = document.getElementById("rulesBTN");
const $backtoHome = document.getElementById("backtoHome");
const $saveBTN = document.getElementById("saveBTN");
const $reset = document.getElementById('resetBTN')
const cells = document.querySelectorAll(".innerCell");
const statusText = document.getElementById('statusText');
const restart = document.getElementById('restartBTN');
const playerOneScore = document.getElementById('player1Score');
const playerTwoScore = document.getElementById('player2Score');
const $userName1 = document.getElementById('userNameOne');
const $userName2 = document.getElementById('userNameTwo');
const playerOneName = document.getElementById('playerOne');
const playerTwoName = document.getElementById('playerTwo');

var oWinCount = 0;
var xWinCount = 0;


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let running = false;
let oPosition = "<img src='images/O.png' class='ox' alt = 'O'>";
let xPosition = "<img src='images/X.png' class='ox' alt = 'X'>";
let placeHolderIMG = oPosition;

initializeGame();

$startBTN.addEventListener('click', function(event) {

  homePage.classList.remove('show');
  homePage.classList.add("hide");

  gamePage.classList.remove('hide');
  gamePage.classList.add('show');

  rulesPage.classList.remove('show');
  rulesPage.classList.add('hide');

  let playerOneUserName = $userName1.value;
  let playerTwoUserName = $userName2.value;
  playerOneName.innerText = playerOneUserName;
  playerTwoName.innerText = playerTwoUserName;

})

$ruleBTN.addEventListener('click', function(event) {
  rulesPage.classList.remove('hide');
  rulesPage.classList.add('show');

  homePage.classList.remove('show');
  homePage.classList.add("hide");

  gamePage.classList.remove('show');
  gamePage.classList.add('hide');

  leaderBoardPage.classList.add('hide');
  leaderBoardPage.classList.remove('show');

})

$backtoHome.addEventListener('click', function(event) {
  event.preventDefault;

  homePage.classList.add('show');
  homePage.classList.remove("hide");

  gamePage.classList.add('hide');
  gamePage.classList.remove('show');

  leaderBoardPage.classList.add('hide');
  leaderBoardPage.classList.remove('show');

  rulesPage.classList.remove('show');
  rulesPage.classList.add('hide');

})

$navHomeBTN.addEventListener('click', function(event) {
  location.reload();

  homePage.classList.add('show');
  homePage.classList.remove("hide");

  gamePage.classList.add('hide');
  gamePage.classList.remove('show');

  leaderBoardPage.classList.add('hide');
  leaderBoardPage.classList.remove('show');

  rulesPage.classList.remove('show');
  rulesPage.classList.add('hide');

})

$navLeaderBTN.addEventListener('click', function(event) {

  homePage.classList.remove('show');
  homePage.classList.add("hide");

  gamePage.classList.add('hide');
  gamePage.classList.remove('show');

  leaderBoardPage.classList.remove('hide');
  leaderBoardPage.classList.add('show');

  rulesPage.classList.remove('show');
  rulesPage.classList.add('hide');

  leaderBoardFunction();

})

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restart.addEventListener("click", restartGame);
  statusText.innerText = `${currentPlayer}'s Turn`;

  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if(options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  if(currentPlayer == "O") {
    placeHolderIMG = oPosition;
  }
  else if(currentPlayer == "X") {
    placeHolderIMG = xPosition;
  }
  cell.innerHTML = placeHolderIMG;
}

function changePlayer() {
  currentPlayer = (currentPlayer == "O") ? "X" : "O";
  if(currentPlayer == "X") {
    placeHolderIMG = xPosition;
    statusText.classList.add('statueTextX');
    statusText.classList.remove('statueTextO');
    cells.forEach((cell) => {
      cell.classList.add('innerCellX');
    });
    cells.forEach((cell) => {
      cell.classList.remove('innerCellO');
    });
  }
  else if(currentPlayer == "O") {
    placeHolderIMG = oPosition;
    statusText.classList.add('statueTextO');
    statusText.classList.remove('statueTextX');
    cells.forEach((cell) => {
      cell.classList.add('innerCellO');
    });
    cells.forEach((cell) => {
      cell.classList.remove('innerCellX');
    });
  }
  statusText.innerText = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWin = false;

    for(let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if(cellA == "" || cellB == "" || cellC == ""){
        continue;
      }
      if(cellA == cellB && cellB == cellC){
        roundWin = true;
        break;
      }
    }

    if(roundWin) {
      statusText.innerText = `${currentPlayer} Wins`;
      running = false;
      cells.forEach((cell) => {
        cell.classList.remove('innerCellX');
        cell.classList.remove('innerCellO');
      });
      if(currentPlayer == "O") {
        wCountUpO();
      }
      else if(currentPlayer == "X") {
        wCountUpX();
      }
    }
    else if(!options.includes("")){
      statusText.innerText = `Draw`;
      running = false;
      cells.forEach((cell) => {
        cell.classList.remove('innerCellX');
        cell.classList.remove('innerCellO');
      });
      statusText.classList.remove('statueTextX');
      statusText.classList.remove('statueTextO');
      statusText.classList.add('statueTextDraw');
    }
    else{
      changePlayer();
    }
}

function wCountUpO() {
  oWinCount += 1;
  playerOneScore.innerText = oWinCount;
}

function wCountUpX() {
  xWinCount += 1;
  playerTwoScore.innerText = xWinCount;
}

function restartGame() {
  const imagesXO = document.querySelectorAll(".ox");
  imagesXO.forEach((imageXO) => {
    imageXO.remove();
  });

  if(currentPlayer == "O") {
    currentPlayer = "X";
    cells.forEach((cell) => {
      cell.classList.add('innerCellX');
    });
    statusText.classList.add('statueTextX');
    statusText.classList.remove('statueTextO');
    statusText.classList.remove('statueTextDraw');
  }
  else {
    currentPlayer = "O";
    cells.forEach((cell) => {
      cell.classList.add('innerCellO');
    });
    statusText.classList.add('statueTextO');
    statusText.classList.remove('statueTextX');
    statusText.classList.remove('statueTextDraw');
  }
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.innerText = `${currentPlayer}'s Turn`;
  
  running = true;
}

function leaderBoardFunction() {
  $userList.innerHTML = "";

    let table = document.createElement("TABLE");
    table.setAttribute("id", "table");
    table.setAttribute("border", "1");
    $userList.appendChild(table);

    let listArray = [];

    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        let lists = "Score: " + value + " " + " --- " + " " + "User: " + key.replace(/['"]+/g, '');
        listArray.push(lists)

        sortlistArray = listArray.sort();
        reverseSort = sortlistArray.reverse();  
        console.log(reverseSort);    
      }

      let index, len;
      for (index = 0, len = reverseSort.length; index < len; ++index) {
          let tr = document.createElement("TR");
          tr.setAttribute("id", "myTr");
          document.getElementById("table").appendChild(tr);
      
          let trItems = document.createElement("TD");
          trItems.appendChild(document.createTextNode(reverseSort[index]));
          tr.appendChild(trItems);
        }
}

$saveBTN.addEventListener('click', function(event) {
  localStorage.setItem(JSON.stringify($userName1.value), oWinCount);
  localStorage.setItem(JSON.stringify($userName2.value), xWinCount);

  gamePage.classList.add('hide');
  gamePage.classList.remove('show');

  leaderBoardPage.classList.remove('hide');
  leaderBoardPage.classList.add('show');

  leaderBoardFunction();

  })

  $reset.addEventListener('click', function(event) {
    localStorage.clear();
    sessionStorage.clear();
    $userList.innerHTML = " ";
  })