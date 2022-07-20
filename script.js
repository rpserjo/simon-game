const getRandom = (min, max) => {
	return Math.floor(Math.random() * Math.random() * (max - min + 1) + min);
}

const shuffle = (arr, level) => {
	return [...Array(level)].map(e => arr[getRandom(0, arr.length - 1)]);
}

const startGame = () => {
	showMessage(null, true);
	data.currentLevel = document.querySelector('#level').value;
	data.currentSpeed = data.levels[data.currentLevel].speed * 1000;
	data.currentTask = shuffle(data.fields, data.levels[data.currentLevel].count);
	console.log(data.currentTask);
	data.log.innerHTML = '';
	showTask();
}

const showTask = (i = 0) => {
	if(i < data.currentTask.length){
		if(i > 0) {
			document.querySelector('.highlighted').classList.remove('highlighted');
		}
		setTimeout(() => {
			document.querySelector(`#${data.currentTask[i]}`).classList.add('highlighted');
			setTimeout(function() {
				showTask(i + 1)
			}, data.currentSpeed);
		}, 500)		
	}else{
		data.log.innerHTML = 'Your turn';
		data.isInGame = true;
		data.currentPosition = 0;
		document.querySelector('.highlighted').classList.toggle('highlighted');
	}
}

const showMessage = (message, hide = false) => {
	const div = document.querySelector('#message');
	if(hide === true){
		div.style.transform = 'translateX(100vw)';
		setTimeout(() => {
			div.style.transform = 'translateX(0)';
			div.style.display = 'none';
			div.style.transform = 'scale(10)';
		}, 500);
		return hide;
	}			
	div.innerHTML = message;
	div.style.display = 'block';
	setTimeout(() => {
		div.style.transform = 'scale(1)';
	}, 50);
}

const data = {
	levels : {
		0 : {label: 'Super easy', count : 3, speed : 1.25},
		1 : {label: 'Easy', count : 4, speed : 1},
		2 : {label: 'Medium', count : 6, speed : 0.75},
		3 : {label: 'Hard', count : 8, speed : 0.5},
		4 : {label: 'Super hard', count : 10, speed : 0.25}
	},
	fields: [],
	currentLevel: -1,
	currentSpeed: -1,
	currentTask: [],		
	currentPosition: -1,
	currentAnswer: '',
	isInGame: false,
	log : null
};

document.addEventListener('DOMContentLoaded', () => {
	const fields = document.querySelectorAll('.element');
	data.fields = [].map.call(fields, el => el.id);
	data.log = document.querySelector('#log');
	const options = [];
	for(let lvl of Object.keys(data.levels)){
		options.push(`<option value="${lvl}">${data.levels[lvl].label}</options>`);
	}
	document.querySelector('#level').innerHTML = options.join('');
	data.log.innerHTML = 'Start your game';
});

document.addEventListener('click', (e) => {
	if(e.target.classList.contains('element') && data.isInGame === true) {
		const id = e.target.id;
		e.target.classList.add('highlighted');
		setTimeout(() => {
			e.target.classList.remove('highlighted')
		}, 300);
		const target = data.currentTask[data.currentPosition];
		if(id === target){
			if(data.currentPosition == data.currentTask.length - 1){
				showMessage('Congratulations! You win!!!');
				data.isInGame = false;
				data.log.innerHTML = 'Start a new game';
			}
			data.currentPosition++;
		}else{
			showMessage('Game over...');
			data.isInGame = false;
			data.log.innerHTML = 'Start a new game';
		}
	}
});