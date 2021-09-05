const info = document.getElementById("info");
const turnTag = document.getElementById("turn-tag");
const playerTurn = document.getElementById("turn-player");
const cells = document.querySelectorAll(".cell");
let player = "X";
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

let gameActive = true;

cells.forEach((cell) =>
  cell.addEventListener("click", function (event) {
    let clickedCell = event.target;
    let index = clickedCell.getAttribute("index");
    if (clickedCell.innerText === "" && gameActive === true) {
      if (player === "O") cell.style.color = "yellow";
      clickedCell.innerText = player;
      scoreMap[index] = player;
      checkWinner();
      checkdraw();
      playerChange();
    }
  })
);

function playerChange() {
  player == "X" ? (player = "O") : (player = "X");
  if (gameActive === true) playerTurn.innerText = `Player ${player}`;
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
        info.innerText = `🎈Congrats! Player ${player} !🎈
        You are the winner`;
        info.style.color = "yellowgreen";

        break;
      }
    }
  }
}
function checkdraw() {
  if (scoreMap.includes("") === false) {
    info.innerText = "The game has drawn";
    gameActive = false;
  }
}

function reset() {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.color = "orangered";
  });
  scoreMap = [1, "", "", "", "", "", "", "", "", ""];
  gameActive = true;
  info.innerText = "";
  turnTag.innerText = "Turn for: ";
  playerTurn.innerText = "Player X";
  player = "X";
}
