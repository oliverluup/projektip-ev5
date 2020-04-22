const typingArea = document.getElementById("typing-area");
const question = document.getElementById("question");
const result = document.getElementById("result");
const counters = document.getElementById("counters");
let correctCounter = 0;
let falseCounter = 0;

const capitals = {
	"Estonia": "Tallinn",
	"Latvia": "Riga",
	"Lithuania": "Vilnius",
	"Poland": "Warsaw",
	"Germany": "Berlin",
	"Denmark": "Copenhagen",
	"Sweden": "Stockholm",
	"Norway": "Oslo",
	"Finland": "Helsinki",
	"Russia": "Moscow"
}

typingArea.focus();

let answer = getAnswer(capitals).toLowerCase();

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
	let keys = Object.keys(obj);
	return keys[keys.length * Math.random() << 0];
}

function getAnswer(obj) {
	question.innerHTML = pickRandom(obj);
	return obj[question.innerHTML];
}

function updateResults() {
	counters.innerHTML = `Correct answers: ${correctCounter} False answers: ${falseCounter}`;
}

//Here begins the code for uploading a file and reading it
const inputFile = document.querySelector('input[type="file"]');
inputFile.addEventListener('change', function (event) {
	const reader = new FileReader();
	let fileObject = new Object();
	reader.onload = function () {
		const lines = reader.result.split('\n').map(function (line) {
			console.log(line.split(','));
			return line.split(',');
		})
		//SIIN ON POOLELI
	}
	reader.readAsText(inputFile.files[0]);
}, false)
