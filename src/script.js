document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const newGameButton = document.querySelector(".new-game");
  const wins = document.querySelectorAll(".wins");
  const modal = document.getElementById("playerModal");
  const startX = document.getElementById("startX");
  const startO = document.getElementById("startO");
  const winModal = document.getElementById("winModal");
  const winText = document.getElementById("winText");

  let currentPlayer = "X";
  let board = Array(9).fill("");
  let gameActive = false;
  let scores = { X: 0, O: 0 };

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function checkWinner() {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combo };
      }
    }
    return board.includes("") ? null : { winner: "draw" };
  }

  function updateBoard(index) {
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    const result = checkWinner();
    if (result?.winner === "X" || result?.winner === "O") {
      gameActive = false;
      scores[result.winner]++;
      updateScoreDisplay();
      highlightWinnerCells(result.combo);
      showWinModal(`${result.winner} menang!`);
    } else if (result?.winner === "draw") {
      gameActive = false;
      showWinModal("Seri!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function highlightWinnerCells(combo) {
    combo.forEach(i => {
      cells[i].style.backgroundColor = "#FF9D23";
    });
  }

  function updateScoreDisplay() {
    wins[0].textContent = `Win Rounds: ${scores["X"]}`;
    wins[1].textContent = `Win Rounds: ${scores["O"]}`;
  }

  function resetBoardOnly() {
    board = Array(9).fill("");
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.backgroundColor = "#B34400";
    });
    gameActive = true;
  }

  function fullResetGame() {
    scores = { X: 0, O: 0 };
    updateScoreDisplay();
    showModal();
  }

  function showModal() {
    modal.style.display = "flex";
  }

  function startGame(player) {
    currentPlayer = player;
    board = Array(9).fill("");
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.backgroundColor = "#B34400";
    });
    gameActive = true;
    modal.style.display = "none";
  }

  function showWinModal(message) {
    winText.textContent = message;
    winModal.style.display = "flex";

    setTimeout(() => {
      winModal.style.display = "none";
      resetBoardOnly(); // lanjut game berikutnya
    }, 2000);
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => updateBoard(index));
  });

  newGameButton.addEventListener("click", fullResetGame);
  startX.addEventListener("click", () => startGame("X"));
  startO.addEventListener("click", () => startGame("O"));

  showModal(); // tampil saat pertama kali load
});
