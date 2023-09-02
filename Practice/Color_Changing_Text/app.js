const letters = document.querySelectorAll('.letter');
const h2 = document.querySelectorAll('h2');
const h1 = document.querySelector('h1');
function randomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`
}

setInterval(function () {
    for (let letter of letters) {
        letter.style.color = randomRGB();
    }
}, 1000);

h1.onmouseover = function () {
    document.getElementById('hello').style.display = "none";
    document.getElementById('hi').style.display = "block";
    document.getElementById('mads').style.display = "block";
}

h2[1].onmouseout = function () {
    document.getElementById('hello').style.display = "block";
    document.getElementById('hi').style.display = "none";
    document.getElementById('mads').style.display = "none";
}
