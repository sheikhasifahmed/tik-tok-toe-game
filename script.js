const modal = document.querySelector(".modal-input");
const modalEnd = document.querySelector(".modal-end");
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
const winner = document.getElementById("winner");
const score_0 = document.getElementById("score-0");
const score_1 = document.getElementById("score-1");
const score_draw = document.getElementById("score-draw");
const btnEnd = document.getElementById("btn-end");
const finalWinner = document.getElementById("final-winner");
const finalResult = document.getElementById("final-result");
const scoreTag = document.getElementById("score-tag");

let score = [0, 0, 0];
let allScore = [];
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
function getScoresFromLocalStorage() {
  let scoreStr = localStorage.getItem("score");
  let scoreObject = JSON.parse(scoreStr);

  for (const [k, v] of Object.entries(scoreObject)) {
    allScore[k] = v;
  }
  return allScore;
}

getScoresFromLocalStorage();

function start() {
  modal.style.display = "block";
  overlay.style.display = "block";
  scoreTag.classList.remove("hide");
  btnStart.classList.add("hide");
}

function closeInputModel() {
  player[0] = player1Input.value.toUpperCase();
  player[1] = player2Input.value.toUpperCase();
  if (player[0] !== "" && player[1] !== "") {
    if (player[0] !== player[1]) {
      modal.style.display = "none";
      overlay.style.display = "none";
      gameActive = true;
      turnTag.innerText = "Turn for: ";
      playerTurn.innerText = `${player[ActivePlayer]}`;
      scoreUpdate();
      player1Input.value = "";
      player2Input.value = "";
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
      checkWinner();
      checkdraw();

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

function scoreUpdate() {
  score_0.innerText = `${player[0]}: ${score[0]}`;
  score_1.innerText = `${player[1]}: ${score[1]}`;
  score_draw.innerText = `Draw: ${score[2]}`;
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

        winner.innerText = `🎈! ${player[ActivePlayer]} !🎈`;
        info.innerText = `is the winner`;

        // cellBody.style.backgroundColor = `${fontColor[ActivePlayer]}`;
        btnReset.classList.remove("hide");
        btnEnd.classList.remove("hide");
        // info.style.color = "yellowgreen";

        function cellBackgroundChange() {
          let color = "green";
          let cell1 = document.getElementById(`cell${comb[0]}`);
          let cell2 = document.getElementById(`cell${comb[1]}`);
          let cell3 = document.getElementById(`cell${comb[2]}`);
          cell1.style.backgroundColor = color;
          cell2.style.backgroundColor = color;
          cell3.style.backgroundColor = color;
        }
        cellBackgroundChange();
        score[ActivePlayer]++;
        scoreUpdate();
        btnEnd.classList.remove("hide");
        break;
      }
    }
  }
}
function checkdraw() {
  if (scoreMap.includes("") === false && gameActive === true) {
    info.style.color = "whitesmoke";
    info.innerText = "The game has drawn";
    gameActive = false;
    score[2]++;
    scoreUpdate();
    btnReset.classList.remove("hide");
    btnEnd.classList.remove("hide");
  }
}

function reset() {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.backgroundColor = "rgba(245, 245, 245, 0.466)";
  });
  scoreMap = [1, "", "", "", "", "", "", "", "", ""];

  info.innerText = "";
  winner.innerText = "";
  btnReset.classList.add("hide");
  cellBody.style.backgroundColor = "transparent";
}

function playAgain() {
  reset();
  gameActive = true;
  turnTag.innerText = "Turn for: ";
  playerTurn.innerText = `${player[ActivePlayer]}`;
  btnEnd.classList.add("hide");
}

function storScoreToLocalStorage() {
  let scoreObject = {};

  allScore.forEach((element, i) => {
    scoreObject[i] = element;
  });
  let str = JSON.stringify(scoreObject);
  localStorage.setItem("score", str);
}

function endGame() {
  modalEnd.style.display = "block";
  overlay.style.display = "block";
  reset();
  finalWinnerCheck();
  scoreReset();
  finalResultShow();
  scoreTag.classList.add("hide");
  storScoreToLocalStorage();
  ActivePlayer = 0;
}

function scoreReset() {
  let curScore = {
    [player[0]]: `${score[0]}`,
    [player[1]]: `${score[1]}`,
    DRAW: `${score[2]}`,
  };
  allScore.push(curScore);

  score = [0, 0, 0];
  score_0.innerText = ``;
  score_1.innerText = ``;
  score_draw.innerText = ``;
}

function closeEndModel() {
  modalEnd.style.display = "none";
  overlay.style.display = "none";
  btnEnd.classList.add("hide");
  btnStart.classList.remove("hide");
  finalResult.textContent = "";
}

function finalWinnerCheck() {
  let finWin;
  if (score[0] == score[1]) {
    finalWinner.innerText = `Scores level!
There is no final winner!`;
  } else {
    if (score[0] > score[1]) finWin = player[0];
    if (score[1] > score[0]) finWin = player[1];
    finalWinner.innerText = `congrates! 🎈🎈  ${finWin}  🎈🎈 !
  You are the final winner`;
  }
}

function finalResultShow() {
  let finRes = allScore[allScore.length - 1];

  for (const [k, v] of Object.entries(finRes)) {
    let p = document.createElement("p");
    p.innerText = `${k}:  ${v}`;
    finalResult.appendChild(p);
  }
}
