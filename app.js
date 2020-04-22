const typingArea = document.getElementById("typing-area");
const question = document.getElementById("question");
const result = document.getElementById("result");
const counters = document.getElementById("counters");
let correctCounter = 0;
let falseCounter = 0;

let capitals = [
	{
        "country": "Estonia",
        "city": "Tallinn"
    },
];

fetch("./files/capitals.json")
	.then(function(response) {
		return response.json();	
	})
	.then(function(data) {
		capitals = data;
	});

const inputFile = document.querySelector('input[type="file"]');
inputFile.addEventListener('change', function (event) {
	const reader = new FileReader();
	let fileObject = new Object();
	reader.onload = function () {
		capitals = reader.result;
		capitals = JSON.parse(capitals);
	}
	reader.readAsText(inputFile.files[0]);
}, false)

typingArea.focus();

let answer = getAnswer(capitals);

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

		answer = getAnswer(capitals);
		typingArea.value = "";
		updateResults();
		startMeasuringTime();
	}
})

function pickRandom (obj) {
	let questionCount = Object.keys(obj).length;
	return obj[questionCount * Math.random() << 0];
}

function getAnswer(obj) {
	tempObject = pickRandom(obj);
	question.innerHTML = tempObject.country;
	return tempObject.city;
}

function updateResults() {
	counters.innerHTML = `Correct answers: ${correctCounter} False answers: ${falseCounter}`;
}