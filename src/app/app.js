angular.module('myApp', [
		'ui.router',
		'myApp.weather'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('myApp', {
				abstract: true,
				params: {
					autoActivateChild: 'myApp.weather'
				}
			});

		$urlRouterProvider.otherwise('/');
	 	$urlRouterProvider.when('/', '/weather');
	})