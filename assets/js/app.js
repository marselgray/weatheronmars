window.addEventListener('load', function() {
	reveal();
	loadData();
});


function loadData(){
	var nasa;
	var key = 'ZYvidubAwlzYOV5HLowtSrbikugpv1n5LeeugzxK';
	var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."];
	
	const url = `https://api.nasa.gov/insight_weather/?api_key=${key}&feedtype=json&ver=1.0`;
	const element = document.getElementById('week');

	fetch(url)
	.then(res => res.json())
	.then(data => nasa = data)
	.then(function(){
		// new sol numbers first to get keys since sols change
		const sols = nasa['sol_keys'];

		// sol day number
		const solsDayNum = [];

		// sol day info
		const mars = [];


		/*
		you dont always get the same amount of days from the api
		best to let it say how many days of information it has first
		and build the amount from there
		*/
		for(let i = 0; i < sols.length; i++) {
			solsDayNum.push(sols[i]);
			const day = nasa[sols[i]];
			mars.push(day);
		}

		console.log(nasa);


		for(let i = 0; i < solsDayNum.length; i++){

			//add Earth Day
			let earthDay = mars[i]['First_UTC'];
			earthDay = earthDay.slice(0, 10);
			earthDay = new Date(earthDay);
			earthDay = months[earthDay.getMonth()] + ' ' + earthDay.getDate();


			// get temperature high
			let tempHigh;
			if (mars[i]['AT']) {
				tempHigh = mars[i]['PRE']['mx'];
				tempHigh = fToC(tempHigh);
				tempHigh = Math.round(tempHigh);
				tempHigh = `High: ${tempHigh}<span>&#176;</span> C`;
			} else {
				tempHigh = `High: n/a`;
			}


			// get temperature low
			let tempLow;
			if (mars[i]['AT']) {
				tempLow = mars[i]['PRE']['mn'];
				tempLow = fToC(tempLow);
				tempLow = Math.round(tempLow);
				tempLow = `Low: ${tempLow}<span>&#176;</span> C`;
			} else {
				tempLow = `Low: n/a`;
			}


			// get average wind speed
			let windSpeed;
			if (mars[i]['HWS']) {
				windSpeed = mars[i]['HWS']['av'];
				windSpeed = Math.round(windSpeed);
				windSpeed = `Wind Speed: ${windSpeed} m/s`;
			} else {
				windSpeed = `Wind Speed: n/a`;
			}


			// get average atmosphere pressure
			let pressure;
			if (mars[i]['PRE']) {
				pressure = mars[i]['PRE']['av'];
				pressure = Math.round(pressure);
				pressure = `Pressure: ${pressure} Pa`;
			} else {
				pressure = `Pressure: n/a`;
			}


			// join information
			let dataInformation = `
				<div class="sol hide--data">
					<p class="sol--text sol--mars">Sol: ${solsDayNum[i]}</p>
					<p class="sol--text sol--earth">${earthDay}</p>
					<p class="sol--text temp--high">${tempHigh}</p>
					<p class="sol--text temp--low">${tempLow}</p>
					<p class="sol--text wind">${windSpeed}</p>
					<p class="sol--text pressure">${pressure}</p>
				</div>`;

			element.insertAdjacentHTML('beforeend', dataInformation);
		}

		// get current season and final information
		const last = solsDayNum.length - 1;
		document.getElementById('season').innerHTML = `The current season at Elysium Planita is <span class="season">${mars[last]['Season']}</span>.`;

		for(let i = 0; i < solsDayNum.length; i++){
			document.getElementById('sol--current__mars').innerText = document.getElementsByClassName('sol--mars')[last].innerText;
			document.getElementById('sol--current__high').innerText = document.getElementsByClassName('temp--high')[last].innerText;
			document.getElementById('sol--current__earth').innerText = document.getElementsByClassName('sol--earth')[last].innerText;
			document.getElementById('sol--current__low').innerText = document.getElementsByClassName('temp--low')[last].innerText;
		}
	})
}


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