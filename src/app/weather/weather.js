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
	}).controller('WeatherController', function($http, $window, $timeout) {
		var weather = this;
		weather.zipcode = '';
		weather.city = '';
		weather.state = '';
		weather.latitude = '';
		weather.longitude = '';

		weather.getCurrentWeatherByLatLon = function(latitude, longitude) {
			$http.get('/currently?latitude=' + latitude + '&longitude=' + longitude)
				.success(function(data, status, headers, config) {
					weather.data = data; // this callback will be called asynchronously
					var skycons = new Skycons({
						"color": "blue"
					});
					skycons.add("weather_icon", data.currently.icon);
					skycons.play();



					// when the response is available
				})
				.error(function(data, status, headers, config) {
					weather.error = status;
					handleError($window, status);

				});
		};
		// weather.getMinuteWeatherByLatLon = function(latitude, longitude) {
		// 	$http.get('/minutely?latitude=' + latitude + '&longitude=' + longitude)
		// 		.success(function(data, status, headers, config) {
		// 			weather.data = data; // this callback will be called asynchronously
		// 			// when the response is available


		// 		})
		// 		.error(function(data, status, headers, config) {
		// 			weather.error = status;
		// 			handleError($window, status);
		// 		});
		// };
		weather.getHourWeatherByLatLon = function(latitude, longitude) {

			$http.get('/hourly?latitude=' + latitude + '&longitude=' + longitude)
				.success(function(data, status, headers, config) {
					weather.data = data.hourly.data; // this callback will be called asynchronously
					// when the response is available
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
			$http.get('/daily?latitude=' + latitude + '&longitude=' + longitude)
				.success(function(data, status, headers, config) {
					weather.data = data; // this callback will be called asynchronously
					// when the response is available
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
			template: '<div class="weather_block currently">' +
				'<canvas id="weather_icon" width="128" height="128"></canvas><br />' +
				'<span>Temp: {{weather.data.currently.temperature}}  </span><br />' +
				'<span> {{weather.data.currently.summary}} </span><br />' +
				'<span>Humidity: {{weather.data.currently.humidity}} </span><br />' +
				'<span>Pressure: {{weather.data.currently.pressure}} </span><br />' +
				'</div>'
		}
	})
	.directive('hourly', function() {
		return {
			scope: true,
			restrict: 'E',
			template: '<div class="hourly_container row" ng-repeat="hour in weather.data" ng-if="(($index % 3) == 0)">' +
				'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">Time: <script>document.write(convertTime({{hour.time}}));</script></div>' +
				'<div class="weather_block hourly col-xs-8 col-sm-8 col-md-8 col-lg-8">' +
				'<canvas id="weather_icon_{{$index}}" width="128" height="128"></canvas><br />' +
				'<span>Temp: {{hour.temperature}}  </span><br />' +
				'<span> {{hour.summary}} </span><br />' +
				'<span>Humidity: {{hour.humidity}} </span><br />' +
				'<span>Pressure: {{hour.pressure}} </span><br />' +
				'</div>' +
				'</div>'
		}
	});

function convertTime(time) {
	console.log("in convert time");
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

	return "<span>" + d.getMonth() + " " + d.getDay() + "</span> <br />" + "<span>" + hours + ":" + minutes + " " + suffix + "</span";
}



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