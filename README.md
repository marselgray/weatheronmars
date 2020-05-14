# Weather of Mars

## About Project

This project uses NASA's public API to pull weather data
from NASA’s InSight Mars lander.

Most of the project uses the API to fetch the information and then add it to the DOM. 

Because the data is set as an object with keys of sol days, I had to get those numbers first from 'sol_keys' and then use the sol day number as the next key. My decision behind this was it won't always be Sol 514 so adding that as the key wouldn't be fessible. Instead, it dynamically fetchs the sol days first and iterates over them pushing them into a new array

```javascript
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
```

## About API

This API provides per-Sol summary data for each of the last seven available Sols (Martian Days). As more data from a particular Sol are downlinked from the spacecraft (sometimes several days later), these values are recalculated, and consequently may change as more data are received on Earth.

This API is maintained and provided by NASA Jet Propulsion Laboratory and Cornell University. If you find bugs in this API, please use the contact form found [here](https://mars.nasa.gov/feedback/). The rate limit for this API is every hour no more than 2000 hits for each individual IP.

[API Docs](https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf)
