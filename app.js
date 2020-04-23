const typingArea = document.getElementById("typing-area");
const question = document.getElementById("question");
const result = document.getElementById("result");
const counters = document.getElementById("counters");
let correctCounter = 0;
let falseCounter = 0;
let questionsAmount = 15;

const cities = document.getElementById("cities");
const hotkeys = document.getElementById("hotkeys");
const english = document.getElementById("english");
const words = document.getElementById("words");
const start = document.getElementById("start");

updateResults();
typingArea.disabled = true;
start.disabled = true;

let questionnaire;


/* 	Siin on event listenerid, mis võtavad JSONi failidest nupuvajutusel andmeid.
	Kuna responsei saamisel tehakse return, siis ma ei osanud nende jaoks
	funktsioone teha ja tekkis päris rõve koodi kordus.
*/
cities.addEventListener("click", function() {
	fetch("./files/capitals.json")
	.then(function(response) {
		return response.json();	
	})
	.then(function(data) {
		questionnaire = data;
		start.disabled = false;
	});
});
hotkeys.addEventListener("click", function() {
	fetch("./files/hotkeys.json")
	.then(function(response) {
		return response.json();	
	})
	.then(function(data) {
		questionnaire = data;
		start.disabled = false;
	});
});
english.addEventListener("click", function() {
	fetch("./files/english.json")
	.then(function(response) {
		return response.json();	
	})
	.then(function(data) {
		questionnaire = data;
		start.disabled = false;
	});
});
words.addEventListener("click", function() {
	fetch("./files/words.json")
	.then(function(response) {
		return response.json();	
	})
	.then(function(data) {
		questionnaire = data;
		start.disabled = false;
	});
});

const inputFile = document.querySelector('input[type="file"]');
inputFile.addEventListener('change', function (event) {
	const reader = new FileReader();
	let fileObject = new Object();
	reader.onload = function () {
		questionnaire = reader.result;
		questionnaire = JSON.parse(questionnaire);
		start.disabled = false;
	}
	reader.readAsText(inputFile.files[0]);
}, false)

start.addEventListener("click", function() {
	if (questionnaire != undefined) {
		typingArea.disabled = false;
		typingArea.focus();
		correctCounter = 0;
		falseCounter = 0;
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
			if (correctCounter + falseCounter == questionsAmount) {
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
