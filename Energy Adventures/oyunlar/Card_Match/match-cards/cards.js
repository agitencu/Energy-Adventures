alert("Hoş Geldiniz.Oyuna başlamak için Tamam'a basınız.");
var errors = 0;
var time = 0;   
var cardList = [
    "solar energy",//Güneş enerjisi
    "wind energy",//Rüzgar enerjisi
    "hydroelectric energy1",//Hidroelektrik enerjisi
    "geothermal energy",//Jeotermal enerji
    "biomass energy",//Biyokütle enerji
    "ocean energy1",//Okyanus enerjisi
    "Hydrogen Energy",//Hidrojen enerjisi
    "Solar thermal energy",//Güneş ısısı enerjisi
    "geothermal heat energy",//Jeotermal ısı enerjisi
    "biogas energy",//Biyogaz enerjisi
    "ocean energy2",//Okyanus enerjisi 2
    "hydroelectric energy2"//Hidroelektrik enerjisi 2
]

var cardSet;
var board = [];
var rows = 4;
var columns =5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}



function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            // <img id="0-0" class="card" src="water.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 2000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}

var countDownDate = new Date().getTime() + 5 * 60 * 1000;
var x = setInterval(function() {
var now = new Date().getTime();
var distance = countDownDate - now;
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
document.getElementById("time").innerHTML = minutes + " dakika " + seconds + " saniye";
if (distance < 0) {
clearInterval(x);
document.getElementById("time").innerHTML = "Size verilen süreniz bitti tekrar oynamak için sayfayı yenileyin.";

}
}, 1000);