describe('Weather Module ', function() {

	beforeEach(module('myApp.weather'));

	var weatherControler, scope;

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		weatherController = $controller('WeatherController', {
			$scope: scope
		});
	}));

	describe('getCurrentWeatherByAddress', function() {
		beforeEach(function() {
			weatherController.getCurrentWeatherByAddress('55423');
		});

		it('should set selection to currently', function() {
			expect(weatherController.selection).toBe('currently');
		});

		it('should have currently in weather.data', function() {
			setTimeout(function() {
				expect('currently' in weatherController.data).toBe(true);
			}, 700);
		})
	});

	// describe('getHourWeatherByAddress', function() {
	// 	beforeEach(function() {
	// 		weatherController.getHourWeatherByAddress('55423');
	// 	});

	// 	it('should set selection to hourly', function() {
	// 		expect(weatherController.selection).toBe('hourly');
	// 	});

	// 	it('should have hourly in weather.data', function() {
	// 			expect('hourly' in weatherController.data).toBe(true);
	// 	})
	// });

	// describe('getDayWeatherByAddress', function() {
	// 	beforeEach(function() {
	// 		weatherController.getDayWeatherByAddress('55423');
	// 	});

	// 	it('should set selection to daily', function() {
	// 		expect(weatherController.selection).toBe('daily');
	// 	});

	// 	it('should have daily in weather.data', function() {
	// 		expect('daily' in weatherController.data).toBe(true);
	// 	})
	// });

});