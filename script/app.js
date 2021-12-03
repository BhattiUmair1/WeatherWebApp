let weathericon, units, togglebutton

// Show methods
const showWeather = function(jsonObject) {
	document.querySelector(".js-weathericon").innerHTML = `${weathericon}` 
	document.querySelector(".js-windspeed").innerHTML = `${Math.round(jsonObject.wind.speed * 3.6)}km/h`
	document.querySelector(".js-temp").innerHTML = `${Math.round(jsonObject.main.temp)}°`
	document.querySelector(".js-tempfeelslike").innerHTML = `Feels like ${Math.round(jsonObject.main.feels_like)}°`
	document.querySelector(".js-humidity").innerHTML = `${jsonObject.main.humidity}%`
	document.querySelector(".js-location").innerHTML = jsonObject.name
	let str = jsonObject.weather[0].description;
	let str2 = str.charAt(0).toUpperCase() + str.slice(1);
	document.querySelector(".js-description").innerHTML = str2
}
// Get methodes
const getIconWeather = function(jsonObject) {
	fetch(`icons/openweather_icons/${jsonObject.weather[0].icon}.svg`)
	.then(response => response.text())
	.then(data => {
		// Do something with your data
		weathericon = data
		showWeather(jsonObject);
	});
}

let getCurrentWeather = (url) => {
	// Example POST method implementation:
	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (json_data) {
			getIconWeather(json_data)
		})
}

let getCountry = (url) => {
	// Example POST method implementation:
	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (json_data) {
			getCurrentWeather(`https://api.openweathermap.org/data/2.5/weather?q=${json_data["locality"]}&appid=db4760e9ec5798f38d40d4143f3d3851&units=${units}`)
		})
}

const success = function (position) {
	let latitude = position.coords.latitude
	let longitude = position.coords.longitude
	getCountry(`https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${latitude}&longitude=${longitude}&localityLanguage=nl&key=d45326120bcb46329bcaaafb615a7c12`)
}

const error = function () {
	console.log("Location is required")
}

ListenStataButton = function(togglebutton) {
	togglebutton.addEventListener ("click", function() {
		if (togglebutton.checked == true) {
			units = "metric"
			navigator.geolocation.getCurrentPosition(success, error)
		} else {
			units = "imperial"
			navigator.geolocation.getCurrentPosition(success, error)
		}
	})
}

document.addEventListener('DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	
	togglebutton = document.querySelector(".js-togglebutton")
	ListenStataButton(togglebutton)
	if (togglebutton.checked == true) {
		units = "metric"
	} else {
		units = "imperial"
	}
	navigator.geolocation.getCurrentPosition(success, error)
});
