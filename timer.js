let display = document.getElementById('mins_secs');
let secs = 0;
let mins = 0;
let m = "";
let s = "";
let TimerIsRunning, timer;
const MAX_ANSWER_TIME = 45;
let questionsAmount= 10;

function count(obj) { return Object.keys(obj).length; }

function startMeasuringTime(){
    if (questionsAmount==(correctCounter+falseCounter)) {
        stopTimer();
    } else {
        startTimer();
    }
}

function countTimer (){
    TimerIsRunning = true;
	secs++;
	if(secs >= 60){
		secs = 0;
		mins++;
	}
	m = mins ? mins > 9 ? mins : "0" + mins : "00";
	s = secs > 9 ? secs : "0" + secs;
    display.innerHTML = m+":"+s;
	timeoutCounting();
}

function timeoutCounting(){
	if(mins  != MAX_ANSWER_TIME){
		timer = setTimeout(countTimer, 100);
	}	
}

function startTimer(){
    if (!TimerIsRunning) {
        timeoutCounting();
    }
}

function stopTimer(){
    clearTimeout(timer);
}

