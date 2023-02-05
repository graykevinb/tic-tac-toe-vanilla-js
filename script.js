let player = "X";

window.onload = () => {
    initBoard(3, 3);
};

const initBoard = (rows, cols) => {
    const board = document.getElementById("board");
    for (let i = 0; i < rows; i++) {
        const row = board.insertRow(i);
        for (let j = 0; j < cols; j++) {
            const cell = board.rows[i].insertCell(j);
            cell.addEventListener("click", squareClicked.bind(this, i, j));
            cell.innerText = "";
            cell.id = `${i}-${j}`;

        };
    };
};

const squareClicked = (row, col) => {
    // Get the cell that was clicked
    const cell = document.getElementById(`${row}-${col}`);
    // Clear the animation from the cell
    cell.style = "";
    // Check to see if the cell is empty
    if (cell.innerText !== "") {
        // If the cell isn't empty, log a message and show a bad move animation
        console.log("Square already clicked");
        cell.style = "animation-name: badMove;animation-duration: 0.5s;"
    } else {
        // If the cell is empty, update it with the current player's mark
        updateSquare(row, col); 
    }
    // Check to see if there is a winner
    if(checkWin()) {
        // If there is a winner, show the winner
        showWin();
    }
};


const updateSquare = (row, col) => {
    console.log("Clicked on square: " + row + ", " + col);
    const cell = document.getElementById(`${row}-${col}`);
    cell.innerText = player;
    player = player === "X" ? "O" : "X";
};


const checkWin = () => {
    return horizontalWin() || verticalWin() || diagonalWin();
}

const getWinner = () => {
    const gameWon = horizontalWin() || verticalWin() || diagonalWin();
    if (gameWon) {
        showWin();
    }
    return gameWon;
};

const showWin = () => {
    const banner = document.getElementById("gameWon");
    banner.innerText = `${player === "X" ? "O" : "X"} has won!`;
    banner.hidden = false;
};

const horizontalWin = () => {
    let gameWon = false;
    for(let r = 0; r < 3 && !gameWon; r++) {
        const c1 = document.getElementById(`${r}-${0}`).innerText;
        const c2 = document.getElementById(`${r}-${1}`).innerText;
        const c3 = document.getElementById(`${r}-${2}`).innerText;
        gameWon = c1 === c2 && c2 === c3 && c1 !== "";
    }
    return gameWon;
};

const verticalWin = () => {
    let gameWon = false;
    for(let c = 0; c < 3 && !gameWon; c++) {
        const r1 = document.getElementById(`${0}-${c}`).innerText;
        const r2 = document.getElementById(`${1}-${c}`).innerText;
        const r3 = document.getElementById(`${2}-${c}`).innerText;
        gameWon = r1 === r2 && r2 === r3 && r1 !== "";
    }
    return gameWon;
};

const diagonalWin = () => {
    const n1 = document.getElementById(`${0}-${0}`).innerText;
    const n2 = document.getElementById(`${1}-${1}`).innerText;
    const n3 = document.getElementById(`${2}-${2}`).innerText;

    const b1 = document.getElementById(`${0}-${2}`).innerText;
    const b2 = document.getElementById(`${1}-${1}`).innerText;
    const b3 = document.getElementById(`${2}-${0}`).innerText;
    return (b1 === b2 && b2 === b3 && b1 !== "") || (n1 === n2 && n2 === n3 && n1 !== "");
};

const resetBoard = () => {
    const board = document.getElementById("board");
    board.innerHTML = "";
    initBoard(3, 3);
};

