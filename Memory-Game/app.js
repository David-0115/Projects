const gameBoard = document.querySelector('.gameboard');
const matchY = document.querySelector('#Y');
const matchN = document.querySelector('#N');
const start = document.querySelector('#new');
const container = document.querySelector('#container');
const scoreBoard = document.querySelector('#score-board');
const welcome = document.querySelector('#welcome');
const seconds = document.querySelector('#sec');
const minutes = document.querySelector('#min');
const gameOverCont = document.querySelector('#gameover-container');
const allImages = document.querySelectorAll('.gmcard');
const memCard = "assets/memory.png"
let moveCount = 0;
let matches = 0;
let timerSeconds = 0;
let timerMinutes = 0;
let imageSelect = [];
let gameArray = [];


start.addEventListener('click', function (e) {
    newGame();
});

function newGame() {
    chooseImages();
    randomImages();
    welcome.style.display = "none";
    gameOverCont.style.display = "none";
    scoreBoard.style.display = "block";
    container.style.display = "block";

    let sec = setInterval(function () {
        if (matches === 8) {
            clearInterval(sec);
            gameOver(matches, moveCount, timerMinutes, timerSeconds);
        } else if (timerSeconds < 60) {
            timerSeconds++;
            if (timerSeconds < 10) {
                seconds.innerText = "0" + timerSeconds
            } else { seconds.innerText = timerSeconds }

        } else {
            timerSeconds = 0;
            timerMinutes++
            minutes.innerText = timerMinutes
        }
    }, 1000)
};
// Randomly chooses from 18 images to use
function chooseImages() {
    let imgNum = 0
    while (imageSelect.length < 16) {
        imgNum = Math.floor(Math.random() * 19);
        if (imageSelect.includes(imgNum) || imgNum === 0) {
            imgNum = Math.floor(Math.random() * 19);
        } else {
            imageSelect.push(imgNum, imgNum);
        }
    }
};

// Fully randomizes the imageSelect array and creates fills gameArray.
function randomImages() {
    let arrNum = "";
    let numUsed = [];
    while (numUsed.length < 16) {
        arrNum = Math.floor(Math.random() * 16);
        if (numUsed.includes(arrNum)) {
            arrNum = Math.floor(Math.random() * 16);
        } else {
            numUsed.push(arrNum);
            gameArray.push(imageSelect[arrNum]);
        }
    }
    imageSelect = [];
};

let clickedCard = [];
let idSelector = [];
let src = [];
gameBoard.addEventListener('click', function (e) {
    let clickData = e.target.getAttribute("data-arr");
    let clickId = e.target.getAttribute("id");
    let imgSrc = "assets/" + gameArray[clickData] + ".png"
    moveCount++
    updateMoves();
    src.push(imgSrc);

    if (clickedCard[0] === undefined) {
        idSelector.push("#" + clickId);
        clickedCard.push(document.querySelector(idSelector[0]));
        clickedCard[0].classList.toggle("clicked");
        clickedCard[0].setAttribute('src', imgSrc);
    } else {
        idSelector.push("#" + clickId);
        clickedCard.push(document.querySelector(idSelector[1]));
        clickedCard[1].setAttribute('src', imgSrc);
        clickedCard[1].classList.toggle("clicked");
        match();
    }
});

function match() {
    if (src[0] === src[1]) {
        clickedCard[0].classList.toggle("matched");
        clickedCard[1].classList.toggle("matched");
        matches++
        updateMatches();
        clear();

    } else {
        setTimeout(function () {
            clickedCard[0].classList.toggle("clicked");
            clickedCard[0].setAttribute('src', memCard);
            clickedCard[1].classList.toggle("clicked");
            clickedCard[1].setAttribute('src', memCard);
            clear();
        }, 700);


    }
};

function clear() {
    clickedCard = [];
    idSelector = [];
    src = [];
};
function updateMatches() {
    let score = document.querySelector('#match-score');
    score.innerText = matches;
};
function updateMoves() {
    let moves = document.querySelector('#move-score');
    moves.innerText = moveCount;
};

function gameOver(score, moves, min, sec) {
    let finalScore = document.querySelector('#match-end-score');
    let finalMove = document.querySelector('#move-end');
    let finalMin = document.querySelector('#min-end');
    let finalSec = document.querySelector('#sec-end');
    setTimeout(function () {
        scoreBoard.style.display = "none";
        container.style.display = "none";
        welcome.style.display = "flex";
        gameOverCont.style.display = "inline";
        finalScore.innerText = score;
        finalMove.innerText = moves;
        finalMin.innerText = min;
        finalSec.innerText = sec;
        moveCount = 0;
        updateMoves();
        matches = 0;
        updateMatches();
        timerMinutes = 0;
        minutes.innerText = timerMinutes;
        timerSeconds = 0;
        seconds.innerText = timerSeconds;
    }, 700)
    resetImages();

};
function resetImages() {
    for (i = 0; i < allImages.length; i++) {
        allImages[i].setAttribute('src', memCard);
        allImages[i].classList.toggle("matched");
        allImages[i].style.transform = 'rotate(360deg)';
    }
};