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
	.controller('WeatherController', function(locationService, moonFactory, addressService, weatherService, weatherFactory) {
		var weather = this;
		weather.address = '';
		weather.lastAddress = '';
		weather.data = {};

		weather.getCurrentWeatherByAddress = function(address) {
			weather.selection = 'currently';
			if (weatherService.needNewWeather(weather.data, weather.address, weather.lastAddress)) {
				return weatherService.getWeatherByAddress(address).then(function(result) {
					weather.data = result;
					weather.lastAddress = address;
					weatherFactory.displayCurrently(weather.data.currently, 100);
				})
			} else {
				weatherFactory.displayCurrently(weather.data.currently, 50);
			}
		};

		weather.getHourWeatherByAddress = function(address) {
			weather.selection = 'hourly';
			if (weatherService.needNewWeather(weather.data, weather.address, weather.lastAddress)) {
				return weatherService.getWeatherByAddress(address).then(function(result) {
					weather.data = result;
					weather.lastAddress = address;
					return
				}).then(function() {
					weatherFactory.displayHourly(weather.data.hourly.data, 50);
				});
			} else {
				weatherFactory.displayHourly(weather.data.hourly.data, 50);
			}
		};

		weather.getDayWeatherByAddress = function(address) {
			weather.selection = 'daily';
			if (weatherService.needNewWeather(weather.data, weather.address, weather.lastAddress)) {
				return weatherService.getWeatherByAddress(address).then(function(result) {
					weather.data = result;
					weather.lastAddress = address;
					return
				}).then(function() {
					weatherFactory.displayDaily(weather.data.daily.data, 50);

				});
			} else {
				weatherFactory.displayDaily(weather.data.daily.data, 50);
			}
		};
	})

.service('addressService', function($http, errorFactory) {
	var addressService = this;
	addressService.getLatitudeLongitude = function(address) {
		return $http.get('/location?address=' + encodeURIComponent(address))
			.success(function(data, status, headers, config) {
				return data;
			})
			.error(function(data, status, headers, config) {
				errorFactory.handleError(status);
			});
	};
})

.service('weatherService', function($http, addressService, addressFactory, errorFactory) {
		var weatherService = this;

		weatherService.getWeather = function(latitude, longitude) {
			return $http.get('/all_weather?latitude=' + latitude + '&longitude=' + longitude)
				.success(function(data, status, headers, config) {
					return data;
				})
				.error(function(data, status, headers, config) {
					errorFactory.handleError(status);
				});
		};

		weatherService.getWeatherByAddress = function(address) {
			var lat_lon;
			return addressService.getLatitudeLongitude(address).then(function(result) {
				lat_lon = result.data;
				return weatherService.getWeather(lat_lon.lat, lat_lon.lng).then(function(result) {
					return result.data;
				});
			});
		};

		weatherService.needNewWeather = function(data, address1, address2) {
			return data == {} || addressFactory.isNewAddress(address1, address2);
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
				'<canvas id="weather_icon" width="128" height="128" class="center-block"></canvas>' +
				'</div> ' +
				'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 currently-info">' +
				'<span>Temp: {{weather.data.currently.temperature}}  </span><br />' +
				'<span> {{weather.data.currently.summary}} </span><br />' +
				'<span>Humidity: {{weather.data.currently.humidity}} </span><br />' +
				'<span>Pressure: {{weather.data.currently.pressure}} </span>' +
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
				'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
				'<canvas id="weather_icon_{{$index}}" width="128" height="128"></canvas>' +
				'</div>' +
				'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
				'<span>Temp: {{hour.temperature}}  </span><br />' +
				'<span>{{hour.summary}}</span><br />' +
				'<span>Humidity: {{hour.humidity}} </span><br />' +
				'<span>Pressure: {{hour.pressure}} </span><br />' +
				'</div></div></div>',
			link: function(scope) {
				scope.convertTime = $sce.trustAsHtml('Time: ' + timeFactory.convertTime(scope.hour.time));
			}
		}
	})
	.directive('daily', function(timeFactory, $sce) {
		return {
			scope: true,
			restrict: 'E',
			template: '<div class="weather_block"><div class="daily row">' +
				'<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 vcenter" ng-bind-html="convertedDay">{{convertedDay}}</div>' +
				'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">' +
				'<canvas id="weather_icon_{{$index}}" width="128" height="128"></canvas><br />' +
				'<span>Low: {{day.temperatureMin}} - Feels like: {{day.apparentTemperatureMin}}</span><br />' +
				'<span>High: {{day.temperatureMax}} - Feels like: {{day.apparentTemperatureMax}} </span><br />' +
				'<span> {{day.summary}} </span><br />' +
				'<span>Chance of Percipitation: {{day.precipProbability}} </span><br />' +
				'</div >' +
				'<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">' +
				'<span>Sunrise: {{sunrise}} </span><br />' +
				'<span>Sunset: {{sunset}} </span><br />' +
				'<div id="moon_{{$index}}"></div>' +
				'</div></div></div>',
			link: function(scope) {
				scope.sunrise = $sce.trustAsHtml(timeFactory.convertToHrMin(scope.day.sunriseTime));
				scope.sunset = $sce.trustAsHtml(timeFactory.convertToHrMin(scope.day.sunsetTime));
				scope.convertedDay = $sce.trustAsHtml(timeFactory.convertDay(scope.day.sunsetTime));
			}
		}
	})
	.factory('addressFactory', function() {
		addressFactory = {};

		addressFactory.isNewAddress = function(address1, address2) {
			return address1 != address2;
		};

		return addressFactory;
	})
	.factory('moonFactory', function() {
		moonFactory = {};

		moonFactory.moon = function(percentage, index) {
			initial_percentage = parseFloat(percentage);

			var percentage = initial_percentage * 2;
			if (percentage > 1) {
				percentage = 2 - percentage;

			}
			var waxing = true;

			if (initial_percentage >= 0.5) {
				waxing = false;
			}

			drawPlanetPhase(document.getElementById("moon_" + index), percentage, waxing);
		};

		return moonFactory;

	})
	.factory('weatherFactory', function($timeout) {
		weatherFactory = {};

		weatherFactory.displayCurrently = function(data, delay) {
			$timeout(function() {
				displayBackground(data.icon);

				var skycons = new Skycons({
					"color": "blue"
				});
				skycons.add("weather_icon", data.icon);
				skycons.play();
			}, delay);
		};

		weatherFactory.displayHourly = function(data, delay) {
			$timeout(function() {
				displayBackground(data[0].icon);

				var skycons = new Skycons({
					"color": "blue"
				});

				for (var i = 0; i < data.length; i = i + 3) {
					skycons.add("weather_icon_" + i, data[i].icon);
				}
				skycons.play();
			}, delay);
		};

		weatherFactory.displayDaily = function(data, delay) {
			$timeout(function() {
				displayBackground(data[0].icon);

				var skycons = new Skycons({
					"color": "blue"
				});

				for (var i = 0; i < data.length; i++) {
					skycons.add("weather_icon_" + i, data[i].icon);
					moonFactory.moon(data[i].moonPhase, i)
				}

				skycons.play();

			}, delay);

		};

		return weatherFactory;
	})
	.factory('timeFactory', function(dateService) {
		timeFactory = {};

		timeFactory.convertDay = function(time) {
			var d = new Date(time * 1000);

			var month = dateService.getMonths();
			var day = dateService.getDays();

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

			var month = dateService.getMonths();
			var day = dateService.getDays();

			return "<span>" + day[d.getDay()] + " " + month[d.getMonth()] + " " + d.getDate() + "</span> <br />" + "<span>" + hours + ":" + minutes + " " + suffix + "</span>";
		}
		return timeFactory;
	})
	.service('dateService', function() {
		var dateService = this;
		dateService.getMonths = function() {
			var month = [];
			month = new Array();
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
			return month;
		};

		dateService.getDays = function() {
			day = new Array();
			day[0] = "Sunday";
			day[1] = "Monday";
			day[2] = "Tuesday";
			day[3] = "Wednesday";
			day[4] = "Thursday";
			day[5] = "Friday";
			day[6] = "Saturday";

			return day
		};
	})
	.service('locationService', function($http, errorFactory) {
		var locationService = {}
		locationService.getLocation = function(address) {
			$http.get('/location?address=' + address)
				.success(function(data, status) {
					return data;
				})
				.error(function(data, status) {
					errorFactory.handleError(status);
				})
		}
		return locationService
	})
	.factory('errorFactory', function($window) {
		var errorFactory = {};
		errorFactory.handleError = function(status) {
			if (status == 400) {
				$window.location.href = '/public/400.html';
				$location.path('/public/400.html');
			} else if (status == 404) {
				$window.location.href = '/public/404.html';
				$location.path('/public/404.html');
			}
		}
		return errorFactory;
	});

function displayBackground(icon) {
	$('div.wrapper').removeClass('clear-day clear-night rain snow sleet wind fog cloudy partly-cloudy-day partly-cloudy-night');
	$('div.wrapper').addClass(icon);
}