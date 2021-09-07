const scoresModal = document.getElementById("scores-modal");
const scoresClose = document.getElementById("scores-close");
const scoreList = document.getElementById("score-list");

function showPrevScore() {
  scoresModal.style.display = "block";
  overlay.style.display = "block";
  scoreList.textContent = "";
  prepScores();
}

scoresClose.addEventListener("click", function () {
  scoresModal.style.display = "none";
  overlay.style.display = "none";
});

function prepScores() {
  for (let i = 1; i <= allScore.length; i++) {
    let tr = document.createElement("tr");
    let n = document.createElement("td");
    n.innerText = i;
    tr.append(n);

    for (const [k, v] of Object.entries(allScore[i - 1])) {
      let td = document.createElement("td");
      td.innerText = `${k}: ${v}`;
      tr.appendChild(td);
    }
    scoreList.appendChild(tr);
  }
}
