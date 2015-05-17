var express = require('express');
var Forecast = require('forecast.io');
var util = require("util");
var path = require("path");
var bodyParser = require('body-parser');
	var geocoder = require('geocoder');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));



var options = {
		APIKey: process.env.FORECAST_API_KEY,
		timeout: 1000
	},

	forecast = new Forecast(options);


app.use('/public', express.static(__dirname + '/app/public')); // set the static files location /public/img will be /img for users
app.use('/app/weather', express.static(__dirname + '/app/weather')); // set the static files location /public/img will be /img for users
app.use('/app', express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users


app.get('/currently', function(request, response) {
	var options = {
		exclude: 'minutely,hourly,daily,flags,alerts'
	};
	forecast.get(request.query.latitude, request.query.longitude, options, function(err, res, data) {
		if (err) {
			var status = data.split('<title>')[1].split(' ')[0]
			console.log('Error in request. \nStatus: ' + status + '\nLatitude: ' + request.query.latitude + '\nLongitude: ' + request.query.longitude);
			response.status(status).send();
		} else {
			response.send(JSON.stringify(data));
		}
	});
});

app.get('/minutely', function(request, response) {

	var options = {
		exclude: 'currently,hourly,daily,flags,alerts'
	};
	forecast.get(request.query.latitude, request.query.longitude, options, function(err, res, data) {
		if (err) throw err;
		response.send(JSON.stringify(data));
	});
});

app.get('/hourly', function(request, response) {

	var options = {
		exclude: 'currently,minutely,daily,flags,alerts'
	};
	forecast.get(request.query.latitude, request.query.longitude, options, function(err, res, data) {
		if (err) throw err;
		response.send(JSON.stringify(data));
	});
});

app.get('/daily', function(request, response) {

	var options = {
		exclude: 'currently,minutely,hourly,flags,alerts'
	};
	forecast.get(request.query.latitude, request.query.longitude, options, function(err, res, data) {
		if (err) throw err;
		response.send(JSON.stringify(data));
	});
});

app.get('/flags', function(request, response) {

	var options = {
		exclude: 'currently,minutely,hourly,daily,alerts'
	};
	forecast.get(request.query.latitude, request.query.longitude, options, function(err, res, data) {
		if (err) throw err;
		response.send(JSON.stringify(data));
	});
});

app.get('/alerts', function(request, response) {

	var options = {
		exclude: 'currently,minutely,hourly,daily,flags'
	};
	forecast.get(request.query.latitude, request.query.longitude, options, function(err, res, data) {
		if (err) throw err;
		response.send(JSON.stringify(data));
	});
});

app.get('/location', function(request, response) {
	geocoder.geocode(request.query.address, function ( err, data ) {
	  response.send(JSON.stringify(data['results'][0]['geometry']['location']))
	});
})

app.get('/', function(req, res) {
	var index = path.resolve(__dirname + '/index.html');
	res.sendFile(index);
});

app.get('/index', function(req, res) {
	res.redirect('/')
});

var server = app.listen(process.env.PORT || 5000, function() {
	console.log('Listening on port: ' + process.env.PORT || 5000);
});
