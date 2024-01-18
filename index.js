const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebutton = document.querySelector(".btn");

let currentplayer;
let gamegrid;

const winningpostion = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//game starts
function initgame() {
    currentplayer = "X";
    gamegrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newgamebutton.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

initgame();

function swapturn() {
    if (currentplayer === "X") {
        currentplayer = "O";
    } else {
        currentplayer = "X";
    }
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

function checkgameover() {
    let winner = null;

    winningpostion.forEach((position) => {
        const [a, b, c] = position;
        if (
            gamegrid[a] !== "" &&
            gamegrid[a] === gamegrid[b] &&
            gamegrid[a] === gamegrid[c]
        ) {
            winner = gamegrid[a];
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
        }
    });

    if (winner) {
        gameinfo.innerText = `Player ${winner} wins!`;
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });
    } else if (!gamegrid.includes("")) {
        gameinfo.innerText = "It's a tie!";
    }
}

function handleclick(index) {
    if (gamegrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        swapturn();
        checkgameover();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleclick(index);
    });
});

newgamebutton.addEventListener("click", initgame);
