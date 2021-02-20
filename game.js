let scores = [];
const newGame = document.querySelector(".btn--new-game");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

const init = () => {
	playing = true;
	scores = [0, 0];
	currentScore0 = 0;
	currentScore1 = 0;
	document.querySelector(".player--0").classList.add("active-player");
	document.querySelector(".player--0").classList.remove("winner");
	document.querySelector(".player--1").classList.remove("active-player", "winner");
	document.querySelector("#score--0").textContent = 0;
	document.querySelector("#score--1").textContent = 0;
	document.querySelector("#current-score--0").textContent = 0;
	document.querySelector("#current-score--1").textContent = 0;
	const dice = document.querySelector(".dice");
	dice.classList.add("hidden");
};

const getActivePlayerNumber = () => {
	const activePlayer = [...document.querySelectorAll(".player")]
		.find((player) => player.classList.contains("active-player"));
	const classes = [...activePlayer.classList];
	for (const item of classes) {
		const index = item.lastIndexOf("-");
		if(index > -1) {
			return item.substr(item.lastIndexOf("-") + 1, 1);
		}
	}
};

const rollDice = () => {
	const diceNumber = Math.trunc(Math.random() * 6) + 1;
	const dice = document.querySelector(".dice");
	dice.src = `images/dice-${diceNumber}.png`;
	dice.classList.remove("hidden");
	addToCurrent(diceNumber);
};

const addToTotal = () => {
	const activePlayerNumber = getActivePlayerNumber();
	const totalScoreElement = document.querySelector(`#score--${activePlayerNumber}`);
	const score = document.querySelector(`#current-score--${activePlayerNumber}`).textContent;
	scores[activePlayerNumber] += +score;
	totalScoreElement.textContent = scores[activePlayerNumber];

	if (scores[activePlayerNumber] >= 100) {
		document.querySelector(".active-player").classList.add("winner");
		roll.removeEventListener("click", rollDice);
		hold.removeEventListener("click", addToTotal);
	} else {
	const currentScoreElement = document.querySelector(`#current-score--${activePlayerNumber}`);
	document.querySelector(".player--0").classList.toggle("active-player")
	document.querySelector(".player--1").classList.toggle("active-player")
	currentScoreElement.textContent = 0;
	}
};

const addToCurrent = (diceNumber) => {
	const activePlayerNumber = getActivePlayerNumber();
	const currentScoreElement = document.querySelector(`#current-score--${activePlayerNumber}`);
	const score = currentScoreElement.textContent;
	const newScore = diceNumber + +score;
	currentScoreElement.textContent = newScore;
	
	if (diceNumber === 1 && scores[activePlayerNumber] < 100) {
		addToTotal()
		
	}
};

init();
	newGame.addEventListener("click", init);
	roll.addEventListener("click", rollDice);
	hold.addEventListener("click", addToTotal);
