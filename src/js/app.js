var nasa;
var key = 'ZYvidubAwlzYOV5HLowtSrbikugpv1n5LeeugzxK';
const url = `https://api.nasa.gov/insight_weather/?api_key=${key}&feedtype=json&ver=1.0`;

fetch(url)
	.then(res => res.json())
	.then(data => nasa = data)
	.then(() => console.log(nasa))


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

	console.log(solsDayNum);
	console.log(mars);


}, 1000)


/// first get sol keys to detect the other 