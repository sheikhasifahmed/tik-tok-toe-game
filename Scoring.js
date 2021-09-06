const scoresModal = document.getElementById("scores-modal");
const scoresClose = document.getElementById("scores-close");
const scoreList = document.getElementById("score-list");

function showPrevScore() {
  scoresModal.style.display = "block";
  overlay.style.display = "block";
  prepScores();
}

scoresClose.addEventListener("click", function () {
  scoresModal.style.display = "none";
  overlay.style.display = "none";
});

function prepScores() {
  for (const score of allScore) {
    let ul = document.createElement("ul");
    for (const [k, v] of Object.entries(score)) {
      let li = document.createElement("li");
      li.innerText = `${k}: ${v}`;
      ul.appendChild(li);
    }
    scoreList.appendChild(ul);
  }
}
