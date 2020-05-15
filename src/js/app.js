var nasa;
var key = 'ZYvidubAwlzYOV5HLowtSrbikugpv1n5LeeugzxK';
var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."];

const url = `https://api.nasa.gov/insight_weather/?api_key=${key}&feedtype=json&ver=1.0`;

fetch(url)
	.then(res => res.json())
	.then(data => nasa = data)
	//.then(() => console.log(nasa))


setTimeout(function(){

	// new sol numbers first to get keys since sols change
	const sols = nasa['sol_keys'];

	// sol day number
	const solsDayNum = [];

	// sol day info
	const mars = [];

	for(let i = 0; i < sols.length; i++) {
		solsDayNum.push(sols[i]);
		const day = nasa[sols[i]];
		mars.push(day);
	}

	// add the Sol day number
	const solHTML = document.getElementsByClassName('sol--mars');
	for(let i = 0; i < solHTML.length; i++) {
		solHTML[i].innerText = `Sol: ${solsDayNum[i]}`;
	}

	// add the Earth day
	const earthHTML = document.getElementsByClassName('sol--earth');
	for(let i = 0; i < earthHTML.length; i++) {
		let newDay = mars[i]['First_UTC'];
		newDay = newDay.slice(0, 10);
		newDay = new Date(newDay);
		earthHTML[i].innerText = months[newDay.getMonth()] + ' ' + newDay.getDate();
	}

	// get temperature high
	const tempHigh = document.getElementsByClassName('temp--high');
	for(let i = 0; i < tempHigh.length; i++) {
		if (mars[i]['AT']) {
			let temp = mars[i]['AT']['mx'];
			temp = fToC(temp);
			temp = Math.round(temp);
			tempHigh[i].innerHTML = `High: ${temp}<span>&#176;</span> C`;
		} else {
			tempHigh[i].innerHTML = `High: n/a`;
		}
	}

	// get temperature low
	const tempLow = document.getElementsByClassName('temp--low');
	for(let i = 0; i < tempLow.length; i++) {
		if (mars[i]['AT']) {
			let temp = mars[i]['AT']['mn'];
			temp = fToC(temp);
			temp = Math.round(temp);
			tempLow[i].innerHTML = `Low: ${temp}<span>&#176;</span> C`;
		} else {
			tempLow[i].innerHTML = `Low: n/a`;
		}
	}

	// get average wind speed
	const wind = document.getElementsByClassName('wind');
	for(let i = 0; i < wind.length; i++) {
		if (mars[i]['HWS']) {
			let windSpeed = mars[i]['HWS']['av'];
			windSpeed = Math.round(windSpeed);
			wind[i].innerHTML = `Wind Speed: ${windSpeed} m/s`;
		} else {
			wind[i].innerHTML = `Wind Speed: n/a`;
		}

	}

	// get average atmospheric pressure
	const pressure = document.getElementsByClassName('pressure');
	for(let i = 0; i < pressure.length; i++) {
		if (mars[i]['PRE']) {
			let atmosphericP = mars[i]['PRE']['av'];
			atmosphericP = Math.round(atmosphericP);
			pressure[i].innerHTML = `Pressure: ${atmosphericP} Pa`;
		} else {
			pressure[i].innerHTML = `Pressure: n/a`;
		}

	}

	// current data
	const current = document.getElementById('sol--current');
	current.innerHTML = `
		<p class="sol--current__text" id="sol--current__mars">${document.getElementsByClassName('sol--mars')[6].innerText}</p>
		<p class="sol--current__text" id="sol--current__high">${document.getElementsByClassName('temp--high')[6].innerText}</p>
		<p class="sol--current__text" id="sol--current__earth">${document.getElementsByClassName('sol--earth')[6].innerText}</p>
		<p class="sol--current__text" id="sol--current__low">${document.getElementsByClassName('temp--low')[6].innerText}</p>
	`;

	// get current season
	document.getElementById('season').innerHTML = `The current season at Elysium Planita is <span class="season">${mars[6]['Season']}</span>.`


	reveal();

}, 1000)



// converts Fahrenheit to Centigrade
function fToC(F){
	return (5/9) * (F - 32);
}


function reveal(){

	setTimeout(function(){
		document.getElementById('loader').style.display = 'none';
		document.getElementById('season').style.opacity = '1';
		document.getElementById('sol--current').style.opacity = '1';
		document.getElementById('week').style.opacity = '1';
	}, 2000)


}