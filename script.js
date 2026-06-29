const scores=JSON.parse(localStorage.getItem("score")) || {
	wins:0,
	losses:0,
	tie:0
}
	
scoreDisplay();

function computerMove(){	
	const randomNum=Math.random();
	let compMove=''
	if(randomNum<1/3 && randomNum>=0) compMove='rock';
	else if(randomNum<2/3 && randomNum>=1/3) compMove='paper';
	else compMove='scissor';
	return compMove;
}


function result(playerMove){	
	let ans='';
	const compMove=computerMove();
	if(playerMove==='rock'){
		if(compMove==='rock') ans='Tie';
		else if(compMove==='paper') ans='You lose!';
		else ans='You Win!';
	}
	else if(playerMove==='paper'){
		if(compMove==='rock') ans='You Win!';
		else if(compMove==='paper') ans='Tie';
		else ans='You lose!';
	}
	else {
		if(compMove==='rock') ans='You lose!';
		else if(compMove==='paper') ans='You Win!';
		else ans='Tie';
	}
	let gameData={
		ans,
		playerMove,
		compMove
	};
	return gameData;
}

function playGame(playerMove){
	const gameData=result(playerMove);

	updateScore(gameData);
	scoreDisplay();
	displayScore(gameData);
}

function updateScore(gameData){
	if(gameData.ans==='You Win!') scores.wins++;
	else if(gameData.ans==='Tie') scores.tie++;
	else scores.losses++;
	localStorage.setItem("score",JSON.stringify(scores));
}

function displayScore(gameData){
	document.querySelector('.results')
		.innerHTML=`${gameData.ans}`;
	document.querySelector('.display')
		.innerHTML=`You <img class="icon" src="images/${gameData.playerMove}-emoji.png"> : <img class="icon" src="images/${gameData.compMove}-emoji.png"> Computer`;
		scoreDisplay();
}

function scoreDisplay(){
	document.querySelector('.score')
		.innerHTML=`Win:${scores.wins} Losses:${scores.losses} Tie:${scores.tie}`;
}

function resetScore(){
	localStorage.removeItem('score');
	scores.wins=0;
	scores.losses=0;
	scores.tie=0;
	document.querySelector('.results')
		.innerHTML='';
	document.querySelector('.display')
		.innerHTML='';
	scoreDisplay();
}