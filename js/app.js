
//Create variables
var score = 0,
	startButton = document.getElementById('start'), //select the start button
	scoreDisplay = document.createElement('p'), //create a new p element to store score
	circleDisplay = document.createElement('p'), //create a new p element to store circle count
	gameScreen = document.createElement('div'), //create a new div element for game screen
	hud = document.createElement('div'), //create a new div for HUD
	gameTime = document.createElement('time'), //create a new element for timer
	seconds = 0,
	minutes = 0,
	hours = 0,
	t,
	circlesOnScreen = 0, //Create circle counter
	classCircle = document.getElementsByClassName('circle'), //select a div with a class of circle
	randomScreenWidth, //for random X point
	randomScreenHeight, //for random Y point
	timeInterval = 3000, //store primary time inteval for displaying circles
	intervalFunc; //will store setInterval function

//Store score value in the designated paragraph
scoreDisplay.innerHTML = 'Score: ' + score;

//Store circles on screen value in the designated paragraph
circleDisplay.innerHTML = 'Circles: ' + circlesOnScreen;

//Create functions

//Display game screen with all elements
function beginGame() {

	//assign a new	div an appropriate class
	gameScreen.className = 'blackDiv';
	hud.className = 'hudDiv';
	scoreDisplay.className = 'gameScore';
	circleDisplay.className = 'gameScore'

	//display new div and hud by appending new elements to body
	document.body.appendChild(gameScreen);
	document.body.appendChild(hud);

	//append score element and timer element
	hud.appendChild(scoreDisplay);
	hud.appendChild(circleDisplay)
	hud.appendChild(gameTime);

	//set background color to black
	document.body.style.backgroundColor = 'black';

	//Call timer function
	gameTime[0];
	timer();

	//Call circle appear function
	circlesAppear();
};

//Create circle element in random spot and update HUD info
function spawner () {
	var circleElement = document.createElement('div');
	randomScreenWidth = Math.floor(Math.random() * ((gameScreen.clientWidth - 50 ) - 50)) + 50 + 'px',
	randomScreenHeight = Math.floor(Math.random() * ((gameScreen.clientHeight - 50 ) - 50)) + 50 + 'px',
	circleElement.className = 'circle';
	circleElement.style.left = randomScreenWidth;
	circleElement.style.top =  randomScreenHeight;
	gameScreen.appendChild(circleElement);
	circleElement.style.opacity = 0;
	setTimeout(function(){ circleElement.style.opacity = 1}, 300);
	circlesOnScreen++;
	circleDisplay.innerHTML = 'Circles: ' + circlesOnScreen;

	//Click on circle event and update HUD info
	circleElement.onclick = function () {
		score += 10;
		circlesOnScreen--;
		gameScreen.removeChild(circleElement);
		scoreDisplay.innerHTML = 'Score: ' +  score;
		circleDisplay.innerHTML = 'Circles: ' + circlesOnScreen;
	}

	//Difficulty statements
	if ( score > 10 ) {
		timeInterval = 2000;
		clearInterval(intervalFunc);
		intervalFunc = setInterval(spawner, timeInterval);
   }
   if ( score > 50 ) {
		timeInterval = 1000;
		clearInterval(intervalFunc);
		intervalFunc = setInterval(spawner, timeInterval);
   }
   if ( score > 100 ) {
		timeInterval = 500;
		clearInterval(intervalFunc);
		intervalFunc = setInterval(spawner, timeInterval);
   }
   if ( score > 250 ) {
		timeInterval = 250;
		clearInterval(intervalFunc);
		intervalFunc = setInterval(spawner, timeInterval);
   }

	// Game Over if there are 10 circles on screen
	if ( circlesOnScreen === 10 ) {
		timeInterval = 3000;
		clearInterval(intervalFunc);
		stopTimer();
		gameOver();
		clearTimer();
		removeAllCircles();
		document.body.removeChild(gameScreen);
		document.body.removeChild(hud);
		document.body.style.backgroundColor = 'white';
		score = 0;
		circlesOnScreen = 0;
		scoreDisplay.innerHTML = 'Score: ' +  score;
		circleDisplay.innerHTML = 'Circles: ' + circlesOnScreen;
	}
}

//Make circles appear each after interval of time
function circlesAppear () {
	intervalFunc = setInterval(spawner, timeInterval);
}

//Timer
function add() {
	seconds++;
	if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
	}

	gameTime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

//Stop timer
function stopTimer() {
		clearTimeout(t);
}

//Clear timer
function clearTimer() {
	   gameTime.textContent = "00:00:00";
	   seconds = 0; minutes = 0; hours = 0;
	   t = 0;
}

//Display results window
function gameOver() {
	alert(' GAME OVER! ' +	'Your score is: ' + score + ' and your time is: ' + gameTime.textContent + '. ' + 'Circles on screen: ' + circlesOnScreen);
}

//Remove all the circles from screen after Game Over
function removeAllCircles() {
	while ( gameScreen.firstChild ) {
		gameScreen.removeChild( gameScreen.firstChild );
	}
}

//Bind ESC key to close new div and hud and return to main screen, also clear score and timer
window.addEventListener( "keyup",
	function(e){
		if( e.keyCode == 27 )
		timeInterval = 3000,
		clearInterval(intervalFunc),
		stopTimer(),
		gameOver(),
		clearTimer(),
		removeAllCircles(),
		document.body.removeChild(gameScreen),
		document.body.removeChild(hud),
		document.body.style.backgroundColor = 'white',
		score = 0,
		circlesOnScreen = 0;
		scoreDisplay.innerHTML = 'Score: ' +  score;
		circleDisplay.innerHTML = 'Circles: ' + circlesOnScreen;
	}, false);

//When clicked, call 'Display game screen' function on start button
startButton.onclick = beginGame;
