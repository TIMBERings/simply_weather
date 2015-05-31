describe('Weather Module ', function() {

	beforeEach(module('myApp.weather'));

	var weather, scope;

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		weather = $controller('WeatherController', {
			$scope: scope
		});
	}));

	describe('getCurrentWeatherByAddress', function() {
		beforeEach(function() {
			weather.address = '55423';
			weather.getCurrentWeatherByAddress('55423');
		});

		afterEach(function() {
			weather.lastAddress = '';
		})

		it('should set selection to currently', function() {
			expect(weather.selection).toBe('currently');
		});

		it('should have currently in weather.data', function() {
			setTimeout(function() {
				expect('currently' in weather.data).toBe(true);
			}, 700);
		});
	});

	describe('getHourWeatherByAddress', function() {
		beforeEach(function() {
			weather.address = '55423';
			weather.getHourWeatherByAddress('55423');
		});

		afterEach(function() {
			weather.lastAddress = '';
		});

		it('should set selection to hourly', function() {
			expect(weather.selection).toBe('hourly');
		});

		it('should have hourly in weather.data', function() {
			setTimeout(function() {
				expect('hourly' in weather.data).toBe(true);
			}, 700);
		});
	});

	describe('getDayWeatherByAddress', function() {
		beforeEach(function() {
			weather.address = '55423';
			weather.getDayWeatherByAddress('55423');
		});

		afterEach(function() {
			weather.lastAddress = '';
		});

		it('should set selection to daily', function() {
			expect(weather.selection).toBe('daily');
		});

		it('should have daily in weather.data', function() {
			setTimeout(function() {
				expect('daily' in weather.data).toBe(true);
			}, 700);
		});
	});
});