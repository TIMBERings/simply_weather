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
	}).controller('WeatherController', function($http, $window, $timeout, $compile, locationService) {
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
	.directive('hourly', function(timeFactory, $sce) {
		return {
			scope: true,
			restrict: 'E',
			template: '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" ng-bind-html="convertTime">{{convertTime}}</div>' +
				'<div class="weather_block hourly col-xs-8 col-sm-8 col-md-8 col-lg-8">' +
				'<canvas id="weather_icon_{{$index}}" width="128" height="128"></canvas><br />' +
				'<span>Temp: {{hour.temperature}}  </span><br />' +
				'<span> {{hour.summary}} </span><br />' +
				'<span>Humidity: {{hour.humidity}} </span><br />' +
				'<span>Pressure: {{hour.pressure}} </span><br />' +
				'</div>',
			link: function(scope) {
				console.log("In link");
				console.log(scope)
				console.log(scope.$parent.$index)
				console.log(scope.$index)
				scope.convertTime = $sce.trustAsHtml('Time: ' + timeFactory.convertTime(scope.weather.data[scope.$parent.$index].time));
			}
		}
	})
	.factory('timeFactory', function() {
		timeFactory = {};

		timeFactory.convertTime = function(time) {
			console.log("in convert time.  Time: " + time);

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
		};


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