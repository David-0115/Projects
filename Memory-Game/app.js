const gameBoard = document.querySelector('.gameboard');
const memCard = "assets/memory.png"
let imageSelect = [];
let gameArray = [];
let imgSrc1 = "";
let idSelector1 = "";
let imgSrc2 = "";
let idSelector2 = "";

function newGame() {
    chooseImages();
    dupImages();
    randomImages();
};
// Randomly chooses from 18 images to use
function chooseImages() {
    let imgNum = 0
    while (imageSelect.length < 8) {
        imgNum = Math.floor(Math.random() * 19);
        if (imageSelect.includes(imgNum) || imgNum === 0) {
            imgNum = Math.floor(Math.random() * 19);
        } else {
            imageSelect.push(imgNum);
        }
    }
};
// Randomly duplicates the images selected to fill the array equal to the number of gameboard spots.
function dupImages() {
    let arrNum = "";
    let numUsed = [];
    while (imageSelect.length < 16) {
        arrNum = Math.floor(Math.random() * 8);
        if (numUsed.includes(arrNum)) {
            arrNum = Math.floor(Math.random() * 8);
        } else {
            numUsed.push(arrNum);
            imageSelect.push(imageSelect[arrNum]);
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

gameBoard.addEventListener('click', function (e) {
    let clickData = e.target.getAttribute("data-arr");
    let clickId = e.target.getAttribute("id");
    let clickedCard = ""
    if (idSelector1 === "") {  //this is breaking the code
        idSelector1 = "#" + clickId
        clickedCard = document.querySelector(idSelector1);
    } else {
        idSelector2 = "#" + clickId
        clickedCard = document.querySelector(idSelector2);
    }

    let imgSrc = "assets/" + gameArray[clickData] + ".png"
    clickedCard.setAttribute('src', imgSrc)
    if (imgSrc1 === "") {
        imgSrc1 = imgSrc;
    } else {
        imgSrc2 = imgSrc;
        isMatch()

    }

})

function isMatch() {
    if (imgSrc1 === imgSrc2) {
        console.log("Match!");
    } else {
        console.log("Not a match");
        resetCards();
    }

}

function resetCards() {
    document.querySelector(idSelector1).setAttribute('src', memCard)
    document.querySelector(idSelector2).setAttribute('src', memCard)
    // let imgSrc1 = "";
    // let idSelector1 = "";
    // let imgSrc2 = "";
    // let idSelector2 = "";
}