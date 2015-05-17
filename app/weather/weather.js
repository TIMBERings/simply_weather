angular.module('myApp.weather', [
	'ui.router'
	])
.config(function($stateProvider) {
	$stateProvider
	.state('weather', {
		url: '/weather',
		templateUrl: 'app/weather/weather.tmpl.html',
		controller: 'WeatherController as weather'
	});
})
.controller('WeatherController', function($http, $window, $timeout, $compile, locationService, moonFactory) {
	var weather = this;
	weather.address = '';
	weather.latitude = '';
	weather.longitude = '';

	weather.getCurrentWeatherByAddress = function(address) {
		$http.get('/location?address=' + encodeURIComponent(address))
			.success(function(data, status, headers, config) {
				weather.getCurrentWeatherByLatLon(data.lat, data.lng)
			})
			.error(function(data, status, headers,config) {
			});
	};
		weather.getHourWeatherByAddress = function(address) {
		$http.get('/location?address=' + encodeURIComponent(address))
			.success(function(data, status, headers, config) {
				weather.getHourWeatherByLatLon(data.lat, data.lng)
			})
			.error(function(data, status, headers,config) {
			});
	};
		weather.getDayWeatherByAddress = function(address) {
		$http.get('/location?address=' + encodeURIComponent(address))
			.success(function(data, status, headers, config) {
				weather.getDayWeatherByLatLon(data.lat, data.lng)
			})
			.error(function(data, status, headers,config) {
			});
	};

	weather.getCurrentWeatherByLatLon = function(latitude, longitude) {
		weather.selection = 'currently';
		$http.get('/currently?latitude=' + latitude + '&longitude=' + longitude)
		.success(function(data, status, headers, config) {
					weather.data = data.currently; // this callback will be called asynchronously
					displayBackground(weather.data.icon);

					var skycons = new Skycons({
						"color": "blue"
					});
					skycons.add("weather_icon", weather.data.icon);
					skycons.play();
					// when the response is available
				})
		.error(function(data, status, headers, config) {
			weather.error = status;
			handleError($window, status);

		});
	};
	weather.getHourWeatherByLatLon = function(latitude, longitude) {
		weather.selection = 'hourly';
		$http.get('/hourly?latitude=' + latitude + '&longitude=' + longitude)
		.success(function(data, status, headers, config) {
					weather.data = data.hourly.data; // this callback will be called asynchronously
					// when the response is available
					displayBackground(weather.data[0].icon);

					$timeout(function() {
						var skycons = new Skycons({
							"color": "red"
						});

						for (var i = 0; i < weather.data.length; i = i + 3) {
							skycons.add("weather_icon_" + i, weather.data[i].icon);
						}
						skycons.play();
					}, 500);
				})
		.error(function(data, status, headers, config) {
			weather.error = status;
			handleError($window, status);
		});
	};
	weather.getDayWeatherByLatLon = function(latitude, longitude) {
		weather.selection = 'daily';
		$http.get('/daily?latitude=' + latitude + '&longitude=' + longitude)
		.success(function(data, status, headers, config) {
					weather.data = data.daily.data; // this callback will be called asynchronously
					displayBackground(weather.data[0].icon);

					$timeout(function() {
						var skycons = new Skycons({
							"color": "red"
						});

						for (var i = 0; i < weather.data.length; i++) {
							skycons.add("weather_icon_" + i, weather.data[i].icon);
							moonFactory.moon(weather.data[i].moonPhase, i)
							// percentage = parseFloat(weather.data[i].moonPhase);
							// var waxing = percentage >= 0.5;
							// percentage = (percentage * 2) >= 1 ? (percentage * 2) - 1 : percentage * 2;
							// drawPlanetPhase(document.getElementById('moon_' + i), percentage, waxing);

						}

						skycons.play();
					}, 500);
				})
		.error(function(data, status, headers, config) {
			weather.error = status;
			handleError($window, status);

		});
	};
})
.directive('currently', function() {
	return {
		scope: true,
		restrict: 'E',
		template: '<div class="weather_block">' +
		'<div class="currently">' +
		'<div class="block row">' + 
		'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">' +
		'<canvas id="weather_icon" width="128" height="128" class="pull-right"></canvas>' + 
		'</div> ' +
				'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">' +
'<span>Temp: {{weather.data.temperature}}  </span><br />' +
		'<span> {{weather.data.summary}} </span><br />' +
		'<span>Humidity: {{weather.data.humidity}} </span><br />' +
		'<span>Pressure: {{weather.data.pressure}} </span><br />' +
		'</div> ' +
		'</div></div></div>'
	}
})
.directive('hourly', function(timeFactory, $sce) {
	return {
		scope: true,
		restrict: 'E',
		template: '<div class="weather_block"><div class="hourly row">' +
		'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" ng-bind-html="convertTime">{{convertTime}}</div>' +
		'<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">' +
		'<canvas id="weather_icon_{{$index}}" width="128" height="128"></canvas><br />' +
		'<span>Temp: {{hour.temperature}}  </span><br />' +
		'<span> {{hour.summary}} </span><br />' +
		'<span>Humidity: {{hour.humidity}} </span><br />' +
		'<span>Pressure: {{hour.pressure}} </span><br />' +
		'</div></div></div>',
		link: function(scope) {
			scope.convertTime = $sce.trustAsHtml('Time: ' + timeFactory.convertTime(scope.weather.data[scope.$parent.$index].time));
		}
	}
})
.directive('daily', function(timeFactory, moonFactory, $sce) {
	return {
		scope: true,
		restrict: 'E',
		template: '<div class="weather_block"><div class="daily row">'+
		'<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 vcenter" ng-bind-html="convertedDay">{{convertedDay}}</div>' +
		'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">' +
		'<canvas id="weather_icon_{{$index}}" width="128" height="128"></canvas><br />' +
		'<span>Low: {{day.temperatureMin}} - Feels like: {{day.apparentTemperatureMin}}</span><br />' +
		'<span>High: {{day.temperatureMax}} - Feels like: {{day.apparentTemperatureMax}} </span><br />' +
		'<span> {{day.summary}} </span><br />' +
		'<span>Chance of Percipitation: {{day.precipProbability}} </span><br />' +
		'</div >' +
		'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
		'<span>Sunrise: {{sunrise}} </span><br />' +
		'<span>Sunset: {{sunset}} </span><br />' +
		'<div id="moon_{{$index}}"></div>' +
		'</div></div></div>',
		link: function(scope) {
			scope.sunrise = $sce.trustAsHtml(timeFactory.convertToHrMin(scope.day.sunriseTime));
			scope.sunset = $sce.trustAsHtml(timeFactory.convertToHrMin(scope.day.sunsetTime));
			scope.convertedDay = $sce.trustAsHtml(timeFactory.convertDay(scope.day.sunsetTime));
			//scope.moon = moonFactory.moon(scope.day.moonPhase, scope.$index);
		}
	}

})
.factory('moonFactory', function() {
	moonFactory = {};

	moonFactory.moon = function(percentage, index) {
		initial_percentage = parseFloat(percentage);

		var percentage = initial_percentage * 2;
		if(percentage > 1) {
			percentage = 2 - percentage;
		}

		var waxing = true;

		if(initial_percentage >= 0.5) {
			waxing = false;
		}

		console.log('drawPlanetPhase(document.getElementById("moon_' + index + '"), ' + percentage + ', ' + waxing + ');');
		drawPlanetPhase(document.getElementById("moon_" + index), percentage, initial_percentage <= 0.5 );
	};

	return moonFactory;

})
.factory('timeFactory', function() {
	timeFactory = {};

	timeFactory.convertDay = function(time) {
		var d = new Date(time * 1000);

		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";

		var day = new Array();
		day[0] = "Sunday";
		day[1] = "Monday";
		day[2] = "Tuesday";
		day[3] = "Wednesday";
		day[4] = "Thursday";
		day[5] = "Friday";
		day[6] = "Saturday";

		return "<h2>" + day[d.getDay()] + "</h2><h3>" + month[d.getMonth()] + " " + d.getDate() + "</h3>";
	};

	timeFactory.convertToHrMin = function(time) {
		var d = new Date(time * 1000);
		var hours = d.getHours()
		var minutes = d.getMinutes()

		if (minutes < 10)
			minutes = "0" + minutes

		var suffix = "AM";
		if (hours >= 12) {
			suffix = "PM";
			hours = hours - 12;
		}
		if (hours == 0) {
			hours = 12;
		}
		return hours + ":" + minutes + " " + suffix
	};

	timeFactory.convertTime = function(time) {

		var d = new Date(time * 1000);
		var hours = d.getHours()
		var minutes = d.getMinutes()

		if (minutes < 10)
			minutes = "0" + minutes

		var suffix = "AM";
		if (hours >= 12) {
			suffix = "PM";
			hours = hours - 12;
		}
		if (hours == 0) {
			hours = 12;
		}

		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";

		var day = new Array();
		day[0] = "Sunday";
		day[1] = "Monday";
		day[2] = "Tuesday";
		day[3] = "Wednesday";
		day[4] = "Thursday";
		day[5] = "Friday";
		day[6] = "Saturday";

		return "<span>" + day[d.getDay()] + " " + month[d.getMonth()] + " " + d.getDate() + "</span> <br />" + "<span>" + hours + ":" + minutes + " " + suffix + "</span>";

	}
	return timeFactory;
})
.service('locationService', function($http) {
	var locationService = {}
	locationService.getLocation = function(address) {
		$http.get('/location?address=' + address)
		.success(function(data, status, headers, config) {
			return data;
		})
		.error(function(data, status, headers, config) {

		})

	}
	return locationService

});


function handleError($window, status) {
	if (status == 400) {
		console.log('in 400');
		//location.href = '/public/400.html'
		$window.location.href = '/public/400.html';
		$location.path('/public/400.html');
	}
}

// function createCurrentlyData(data) {
// 	var image = '';

// 	<div class="weather_block currently">
// 		<canvas id="weather_icon" width="128" height="128"></canvas>
// 		<span>Temp: {{data.currently.temperature}}  </span>
// 		<span> {{data.currently.summary}} </span>
// 		<span>Humidity: {{data.currently.humidity}} </span>
// 		<span>Pressure: {{data.currently.pressure}} </span>
// 	</div>

// }

function displayBackground(icon) {
	$('div.wrapper').removeClass('clear-day clear-night rain snow sleet wind fog cloudy partly-cloudy-day partly-cloudy-night');
	$('div.wrapper').addClass(icon);
}