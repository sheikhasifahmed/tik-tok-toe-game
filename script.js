const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const info = document.getElementById("info");
const turnTag = document.getElementById("turn-tag");
const playerTurn = document.getElementById("turn-player");
const cells = document.querySelectorAll(".cell");
const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");
const modelInfo = document.getElementById("model-info");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-reset");
const cellBody = document.querySelector("#cell-body");

let player = [];
let icon = ["X", "O"];
let fontColor = ["orangered", "yellow"];

let ActivePlayer = 0;
let scoreMap = [1, "", "", "", "", "", "", "", "", ""];
winningCombination = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

let gameActive = false;

function start() {
  modal.style.display = "block";
  overlay.style.display = "block";

  btnStart.style.display = "none";
}
function closeModel() {
  player[0] = player1Input.value;
  player[1] = player2Input.value;
  if (player[0] !== "" && player[1] !== "") {
    if (player[0] !== player[1]) {
      modal.style.display = "none";
      overlay.style.display = "none";
      gameActive = true;
      turnTag.innerText = "Turn for: ";
      playerTurn.innerText = `${player[ActivePlayer]}`;
    } else modelInfo.innerText = "Both player cannot have same name!!!";
  } else modelInfo.innerText = "You cannot left the players name empty!!!";
}

cells.forEach((cell) =>
  cell.addEventListener("click", function (event) {
    let clickedCell = event.target;
    let index = clickedCell.getAttribute("index");
    if (clickedCell.innerText === "" && gameActive === true) {
      cell.style.color = fontColor[ActivePlayer];
      clickedCell.innerText = icon[ActivePlayer];
      scoreMap[index] = player[ActivePlayer];

      checkdraw();
      checkWinner();
      playerChange();
    }
  })
);

function playerChange() {
  ActivePlayer == 0 ? (ActivePlayer = 1) : (ActivePlayer = 0);
  if (gameActive === true) playerTurn.innerText = `${player[ActivePlayer]}`;
  else {
    turnTag.innerText = "";
    playerTurn.innerText = "";
  }
}

function checkWinner() {
  for (const comb of winningCombination) {
    let a = scoreMap[comb[0]];
    let b = scoreMap[comb[1]];
    let c = scoreMap[comb[2]];

    if (a !== "" && b !== "" && c !== "") {
      if (a === b && b === c) {
        gameActive = false;
        // info.style.color = "red";
        info.innerText = `🎈🎈🎈!! ${player[ActivePlayer]} !!🎈🎈🎈
        is the winner`;

        cellBody.style.backgroundColor = `${fontColor[ActivePlayer]}`;
        btnReset.classList.remove("hide");
        // info.style.color = "yellowgreen";

        break;
      }
    }
  }
}
function checkdraw() {
  if (scoreMap.includes("") === false) {
    info.style.color = "whitesmoke";
    info.innerText = "The game has drawn";
    gameActive = false;
    btnReset.classList.remove("hide");
  }
}

function reset() {
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  scoreMap = [1, "", "", "", "", "", "", "", "", ""];
  gameActive = true;
  info.innerText = "";
  turnTag.innerText = "Turn for: ";
  playerTurn.innerText = `${player[ActivePlayer]}`;
  btnReset.classList.add("hide");
  cellBody.style.backgroundColor = "transparent";
  // ActivePlayer=0;
}
