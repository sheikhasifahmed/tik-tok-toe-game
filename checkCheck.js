const info = document.getElementById("info");
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
  // info.innerText = `Now Player ${player} turn`;
}

function checkWinner() {
  for (const comb of winningCombination) {
    let a = scoreMap[comb[0]];
    let b = scoreMap[comb[1]];
    let c = scoreMap[comb[2]];

    if (a !== "" && b !== "" && c !== "") {
      if (a === b && b === c) {
        gameActive = false;
        info.innerText = `Player ${player} is the winner`;
        console.log(`Player ${player} is the winner`);
        break;
      }
    }
  }
}
function checkdraw() {
  if (scoreMap.includes("") === false) {
    info.innerText = "The game has drawn";
    console.log("The game has drawn");
  }
}
