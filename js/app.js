
let shapes = ["diamond", "paper-plane-o",
			  "anchor", "bolt", "cube",
			  "leaf", "bicycle", "bomb",
			  "diamond", "paper-plane-o",
			  "anchor", "bolt",
			  "cube", "leaf",
			  "bicycle", "bomb"];
let openedCards = [];
let moves = 0;
let matchedCards = 0;
let numberStars = 0;
const motion = document.querySelector(".moves"),
	  deck = document.querySelector(".deck"),
	  stars = document.querySelector(".stars");
// modal var
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
// timer var
let hr, min, sec, timeCounter = 0, incrementer;
const hours = document.querySelector(".hours"),
      minutes = document.querySelector(".minutes"),
      seconds = document.querySelector(".seconds");
// var to manage score panel
const scorePanel = document.querySelector(".score-panel");

// onload modal
document.addEventListener("DOMContentLoaded", function(){
	const backdropOne = document.querySelector(".backdrop-one");
	const modalOne = document.querySelector(".modal-one");
	backdropOne.style.display = 'block';
    modalOne.style.display = 'block';
	const startButton = document.getElementById('start-game');
	startButton.addEventListener("click", function(){
		backdropOne.style.display = 'none';
		modalOne.style.display = "none";
		startTimer();
	});
});

init();

function init(){
	createCards();
	eventListenerSetup();
}

restartButtons();

function createCards(){
	let allCards = shuffle(shapes);
	for (let i = 0; i < allCards.length; i++){
		let htmlTextToAdd = "<li class='card'><i class='fa fa-" + allCards[i] + "'></i></li>";
		deck.insertAdjacentHTML("afterBegin",htmlTextToAdd);
	}
	stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
}

// apply event delegation
function eventListenerSetup(){
 	deck.addEventListener("click", initiateCards);
}

function eventListenerDisable(){
 	deck.removeEventListener("click", initiateCards);
}

 function initiateCards(event){
 	// verify if the class is card
 	if (event.target.className === "card"){
 			event.target.classList.add("open", "show");
 			openedCards.push(event.target);
 			incrementMoves();
 		if (openedCards.length === 2){
 			checkMatch();
  		}
 	}
}

function checkMatch(){
	// eventListenerDisable() won't allow to click other cards while checking for a match
	// or increment moves if the same card is clicked twice
 	eventListenerDisable();
	if (openedCards[0].innerHTML === openedCards[1].innerHTML){
		setTimeout(function(){
			openedCards[0].classList.add("match");
			openedCards[1].classList.add("match");
			openedCards[0].classList.remove("open", "show");
			openedCards[1].classList.remove("open", "show");
			openedCards = [];
		    matchedCards = matchedCards+1;
		    // after the match class, this will allow two other cards to be flipped again
			eventListenerSetup();
			// check if all the matches have been found
			gameOver();
		}, 500);
	}else {
		setTimeout(function(){
			openedCards[0].classList.remove("open", "show");
			openedCards[1].classList.remove("open", "show");
			openedCards = [];
			eventListenerSetup();
		}, 500);
	}
}

function incrementMoves(){
	moves = moves+1;
	motion.innerHTML = moves;
	if(moves<20){
		numberStars = 3;
		stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	}else if (moves >= 20 && moves < 30){
		numberStars = 2;
		stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	}else if(moves>=30){
		numberStars = 1;
		stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
	}
}

function restart(){
	// remove all HTML content of all cards in the deck
	deck.innerHTML = "";
	// start with 3 stars
	stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	// add all the HTML content again
	createCards();
	// restart moves
	moves = 0;
	motion.innerHTML = moves;
	// restart matched cards
	matchedCards = 0;
	// reset timer values
	timeCounter = 0;
	hr = 0;
	min = 0;
	sec = 0;
	hours.innerHTML = "Time  " + hr + "  :  ";
	minutes.innerHTML = min + "  :  ";
	seconds.innerHTML = sec;
	// hide modal
	backdrop.style.display = 'none';
    modal.style.display = 'none';
    // show reset score panel
    scorePanel.style.display = 'block';
}

function restartButtons(){
	const restartButton = document.querySelector(".restart");
	const playAgain = document.querySelector(".playAgain");
	playAgain.onclick = restart;
	restartButton.onclick = restart;
}

// Congratulations modal function
function gameOver(){
	if (matchedCards === 8){
		myModal();
		// hide score panel
		scorePanel.style.display = 'none';
    }else{
		backdrop.style.display = 'none';
    	modal.style.display = 'none';
    }
}

function myModal(){
		// display modal
    	backdrop.style.display = 'block';
    	modal.style.display = 'block';
    	// add number of stars to modal
    	document.getElementById("star").innerHTML = numberStars;
    	// add time to modal
    	document.getElementById("finalHrs").innerHTML = hr+"  ";
    	document.getElementById("finalMin").innerHTML = "  "+min+"  ";
    	document.getElementById("finalSec").innerHTML = "  "+sec;
    	// x button
    	document.querySelector('.close').addEventListener("click", function() {
			backdrop.style.display = 'none';
			modal.style.display = "none";
		});
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
}

// timer
function startTimer(){
	incrementer = setInterval(function(){
		timeCounter++;
		convertTime(timeCounter);
		hours.innerHTML = "Time  " + hr + "  :  ";
		minutes.innerHTML = min + "  :  ";
		seconds.innerHTML = sec;
	}, 1000);
}
// formula to convert total time to h m s
function convertTime(timeCounter){
	hr = Math.floor(timeCounter/60/60);
	min = Math.floor((timeCounter/60)%60);
	sec = timeCounter % 60;
}

