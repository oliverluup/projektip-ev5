const typingArea = document.getElementById("typing-area");
const question = document.getElementById("question");
const result = document.getElementById("result");
const counters = document.getElementById("counters");
const cities = document.getElementById("cities");
const hotkeys = document.getElementById("hotkeys");
const english = document.getElementById("english");
const words = document.getElementById("words");
const start = document.getElementById("start");
const fileSelect = document.getElementById("fileSelect");
const fileButton = document.getElementById("fileButton");
let correctCounter = 0;
let falseCounter = 0;
let questionAmount = 15;
let fileName;

updateResults();
typingArea.disabled = true;
start.disabled = true;

let questionnaire;

cities.addEventListener("click", function() {
	fetchData("./files/capitals.json");
});

hotkeys.addEventListener("click", function() {
	fetchData("./files/hotkeys.json");
});

english.addEventListener("click", function() {
	fetchData("./files/english.json");
});

words.addEventListener("click", function() {
	fetchData("./files/words.json");
});

fileButton.addEventListener("click", function() {
	fileName = fileSelect.options[fileSelect.selectedIndex].text;
	fetchData("./files/" + fileName);
});

start.addEventListener("click", function() {
	if (questionnaire != undefined) {
		typingArea.disabled = false;
		typingArea.focus();
		correctCounter = 0;
		falseCounter = 0;
		resetTimer();
		updateResults();
		startMeasuringTime();
	}

	let answer = getAnswer(questionnaire);

	typingArea.addEventListener('keydown', event => {
		if (event.keyCode == 13) {
			let typed = typingArea.value.toLowerCase().trim();
			let compAnswer = answer.toLowerCase();

			if (typed == compAnswer) {
				result.innerHTML = "correct";
				correctCounter++;
			} else {
				result.innerHTML = "incorrect";
				falseCounter++;
			}

			answer = getAnswer(questionnaire);
			typingArea.value = "";
			updateResults();
			startMeasuringTime();
			if (correctCounter + falseCounter == questionAmount) {
				typingArea.disabled = true;
			}
		}
	})
});

function pickRandom (obj) {
	let questionCount = Object.keys(obj).length;
	return obj[questionCount * Math.random() << 0];
}

function getAnswer(obj) {
	tempObject = pickRandom(obj);
	question.innerHTML = tempObject.question;
	return tempObject.answer;
}

function updateResults() {
	counters.innerHTML = `${correctCounter}/${questionAmount}`;
}

function fetchData(fileName) {
	fetch(fileName)
	.then(function(response) {
		return response.json();	
	})
	.then(function(data) {
		questionnaire = data;
		start.disabled = false;
	});
}
