var myAppDev = angular.module('myAppDev', ['myApp.weather', 'ngMockE2E']);

myAppDev.run(function($httpBackend) {

	location = JSON.parse('{"lat":"44.8735", "lng":"-93.2835"}');
	$httpBackend.whenGET(/\/location\?address=.*/).respond(location);

	data = JSON.parse('{"latitude":44.8735964,"longitude":-93.2835137,"timezone":"America/Chicago","offset":-5,"currently":{"time":1433085956,"summary":"Clear","icon":"clear-day","nearestStormDistance":147,"nearestStormBearing":319,"precipIntensity":0,"precipProbability":0,"temperature":54.25,"apparentTemperature":54.25,"dewPoint":34.83,"humidity":0.48,"windSpeed":8.34,"windBearing":100,"visibility":10,"cloudCover":0.2,"pressure":1026.18,"ozone":341.84},"minutely":{"summary":"Clear for the hour.","icon":"clear-day","data":[{"time":1433085900,"precipIntensity":0,"precipProbability":0},{"time":1433085960,"precipIntensity":0,"precipProbability":0},{"time":1433086020,"precipIntensity":0,"precipProbability":0},{"time":1433086080,"precipIntensity":0,"precipProbability":0},{"time":1433086140,"precipIntensity":0,"precipProbability":0},{"time":1433086200,"precipIntensity":0,"precipProbability":0},{"time":1433086260,"precipIntensity":0,"precipProbability":0},{"time":1433086320,"precipIntensity":0,"precipProbability":0},{"time":1433086380,"precipIntensity":0,"precipProbability":0},{"time":1433086440,"precipIntensity":0,"precipProbability":0},{"time":1433086500,"precipIntensity":0,"precipProbability":0},{"time":1433086560,"precipIntensity":0,"precipProbability":0},{"time":1433086620,"precipIntensity":0,"precipProbability":0},{"time":1433086680,"precipIntensity":0,"precipProbability":0},{"time":1433086740,"precipIntensity":0,"precipProbability":0},{"time":1433086800,"precipIntensity":0,"precipProbability":0},{"time":1433086860,"precipIntensity":0,"precipProbability":0},{"time":1433086920,"precipIntensity":0,"precipProbability":0},{"time":1433086980,"precipIntensity":0,"precipProbability":0},{"time":1433087040,"precipIntensity":0,"precipProbability":0},{"time":1433087100,"precipIntensity":0,"precipProbability":0},{"time":1433087160,"precipIntensity":0,"precipProbability":0},{"time":1433087220,"precipIntensity":0,"precipProbability":0},{"time":1433087280,"precipIntensity":0,"precipProbability":0},{"time":1433087340,"precipIntensity":0,"precipProbability":0},{"time":1433087400,"precipIntensity":0,"precipProbability":0},{"time":1433087460,"precipIntensity":0,"precipProbability":0},{"time":1433087520,"precipIntensity":0,"precipProbability":0},{"time":1433087580,"precipIntensity":0,"precipProbability":0},{"time":1433087640,"precipIntensity":0,"precipProbability":0},{"time":1433087700,"precipIntensity":0,"precipProbability":0},{"time":1433087760,"precipIntensity":0,"precipProbability":0},{"time":1433087820,"precipIntensity":0,"precipProbability":0},{"time":1433087880,"precipIntensity":0,"precipProbability":0},{"time":1433087940,"precipIntensity":0,"precipProbability":0},{"time":1433088000,"precipIntensity":0,"precipProbability":0},{"time":1433088060,"precipIntensity":0,"precipProbability":0},{"time":1433088120,"precipIntensity":0,"precipProbability":0},{"time":1433088180,"precipIntensity":0,"precipProbability":0},{"time":1433088240,"precipIntensity":0,"precipProbability":0},{"time":1433088300,"precipIntensity":0,"precipProbability":0},{"time":1433088360,"precipIntensity":0,"precipProbability":0},{"time":1433088420,"precipIntensity":0,"precipProbability":0},{"time":1433088480,"precipIntensity":0,"precipProbability":0},{"time":1433088540,"precipIntensity":0,"precipProbability":0},{"time":1433088600,"precipIntensity":0,"precipProbability":0},{"time":1433088660,"precipIntensity":0,"precipProbability":0},{"time":1433088720,"precipIntensity":0,"precipProbability":0},{"time":1433088780,"precipIntensity":0,"precipProbability":0},{"time":1433088840,"precipIntensity":0,"precipProbability":0},{"time":1433088900,"precipIntensity":0,"precipProbability":0},{"time":1433088960,"precipIntensity":0,"precipProbability":0},{"time":1433089020,"precipIntensity":0,"precipProbability":0},{"time":1433089080,"precipIntensity":0,"precipProbability":0},{"time":1433089140,"precipIntensity":0,"precipProbability":0},{"time":1433089200,"precipIntensity":0,"precipProbability":0},{"time":1433089260,"precipIntensity":0,"precipProbability":0},{"time":1433089320,"precipIntensity":0,"precipProbability":0},{"time":1433089380,"precipIntensity":0,"precipProbability":0},{"time":1433089440,"precipIntensity":0,"precipProbability":0},{"time":1433089500,"precipIntensity":0,"precipProbability":0}]},"hourly":{"summary":"Mostly cloudy until tomorrow morning.","icon":"partly-cloudy-night","data":[{"time":1433084400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":52.67,"apparentTemperature":52.67,"dewPoint":34.77,"humidity":0.5,"windSpeed":8.1,"windBearing":101,"visibility":10,"cloudCover":0.12,"pressure":1026.11,"ozone":341.5},{"time":1433088000,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":56.33,"apparentTemperature":56.33,"dewPoint":34.77,"humidity":0.44,"windSpeed":8.66,"windBearing":99,"visibility":10,"cloudCover":0.3,"pressure":1026.28,"ozone":342.29},{"time":1433091600,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":58.26,"apparentTemperature":58.26,"dewPoint":34.54,"humidity":0.41,"windSpeed":8.96,"windBearing":97,"visibility":10,"cloudCover":0.63,"pressure":1026.12,"ozone":343.09},{"time":1433095200,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":60.22,"apparentTemperature":60.22,"dewPoint":35.02,"humidity":0.39,"windSpeed":9.41,"windBearing":99,"visibility":10,"cloudCover":0.78,"pressure":1025.64,"ozone":343.72},{"time":1433098800,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":61.79,"apparentTemperature":61.79,"dewPoint":35.38,"humidity":0.37,"windSpeed":9.62,"windBearing":103,"visibility":10,"cloudCover":0.91,"pressure":1024.99,"ozone":343.87},{"time":1433102400,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":63.02,"apparentTemperature":63.02,"dewPoint":36.36,"humidity":0.37,"windSpeed":9.66,"windBearing":104,"visibility":10,"cloudCover":0.96,"pressure":1024.34,"ozone":343.86},{"time":1433106000,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":64.16,"apparentTemperature":64.16,"dewPoint":37.12,"humidity":0.37,"windSpeed":10.59,"windBearing":107,"visibility":10,"cloudCover":0.99,"pressure":1023.75,"ozone":344.53},{"time":1433109600,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":64.59,"apparentTemperature":64.59,"dewPoint":37.99,"humidity":0.37,"windSpeed":10.34,"windBearing":108,"visibility":10,"cloudCover":0.98,"pressure":1023.45,"ozone":346.64},{"time":1433113200,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":64.37,"apparentTemperature":64.37,"dewPoint":38.57,"humidity":0.39,"windSpeed":10.13,"windBearing":111,"visibility":10,"cloudCover":0.91,"pressure":1023.3,"ozone":349.43},{"time":1433116800,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":63.47,"apparentTemperature":63.47,"dewPoint":39.45,"humidity":0.41,"windSpeed":9.52,"windBearing":110,"visibility":10,"cloudCover":0.88,"pressure":1023.32,"ozone":351.38},{"time":1433120400,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":61.79,"apparentTemperature":61.79,"dewPoint":39.98,"humidity":0.45,"windSpeed":8.8,"windBearing":103,"visibility":10,"cloudCover":0.86,"pressure":1023.55,"ozone":351.74},{"time":1433124000,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":58.97,"apparentTemperature":58.97,"dewPoint":40.63,"humidity":0.51,"windSpeed":7.75,"windBearing":100,"visibility":10,"cloudCover":0.72,"pressure":1023.93,"ozone":351.26},{"time":1433127600,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":56.47,"apparentTemperature":56.47,"dewPoint":41.03,"humidity":0.56,"windSpeed":7.61,"windBearing":99,"visibility":10,"cloudCover":0.6,"pressure":1024.27,"ozone":350.69},{"time":1433131200,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":54.63,"apparentTemperature":54.63,"dewPoint":40.9,"humidity":0.6,"windSpeed":7.72,"windBearing":107,"visibility":10,"cloudCover":0.61,"pressure":1024.52,"ozone":350.46},{"time":1433134800,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":53.24,"apparentTemperature":53.24,"dewPoint":40.33,"humidity":0.61,"windSpeed":7.66,"windBearing":110,"visibility":10,"cloudCover":0.63,"pressure":1024.76,"ozone":350.14},{"time":1433138400,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":51.82,"apparentTemperature":51.82,"dewPoint":39.76,"humidity":0.63,"windSpeed":7.84,"windBearing":112,"visibility":10,"cloudCover":0.63,"pressure":1024.97,"ozone":349.24},{"time":1433142000,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":50.25,"apparentTemperature":50.25,"dewPoint":38.85,"humidity":0.65,"windSpeed":8.26,"windBearing":114,"visibility":10,"cloudCover":0.48,"pressure":1025.17,"ozone":347.43},{"time":1433145600,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":48.69,"apparentTemperature":45.17,"dewPoint":37.86,"humidity":0.66,"windSpeed":8,"windBearing":117,"visibility":10,"cloudCover":0.27,"pressure":1025.36,"ozone":345.03},{"time":1433149200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":47.35,"apparentTemperature":43.55,"dewPoint":37.37,"humidity":0.68,"windSpeed":7.98,"windBearing":118,"visibility":10,"cloudCover":0.23,"pressure":1025.55,"ozone":342.52},{"time":1433152800,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":46.31,"apparentTemperature":42.3,"dewPoint":36.86,"humidity":0.69,"windSpeed":7.94,"windBearing":118,"visibility":10,"cloudCover":0.28,"pressure":1025.77,"ozone":339.78},{"time":1433156400,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":45.95,"apparentTemperature":41.73,"dewPoint":36.28,"humidity":0.69,"windSpeed":8.24,"windBearing":116,"visibility":10,"cloudCover":0.28,"pressure":1025.96,"ozone":336.93},{"time":1433160000,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":46.91,"apparentTemperature":42.89,"dewPoint":36.66,"humidity":0.67,"windSpeed":8.28,"windBearing":116,"visibility":10,"cloudCover":0.28,"pressure":1026.04,"ozone":334.7},{"time":1433163600,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":49.13,"apparentTemperature":45.28,"dewPoint":36.99,"humidity":0.63,"windSpeed":9.1,"windBearing":120,"visibility":10,"cloudCover":0.27,"pressure":1025.98,"ozone":333.56},{"time":1433167200,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":52.83,"apparentTemperature":52.83,"dewPoint":37.98,"humidity":0.57,"windSpeed":9.93,"windBearing":121,"visibility":10,"cloudCover":0.32,"pressure":1025.81,"ozone":333.04},{"time":1433170800,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":55.2,"apparentTemperature":55.2,"dewPoint":38.8,"humidity":0.54,"windSpeed":10.47,"windBearing":126,"visibility":10,"cloudCover":0.45,"pressure":1025.49,"ozone":332.5},{"time":1433174400,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":57.92,"apparentTemperature":57.92,"dewPoint":39.69,"humidity":0.51,"windSpeed":10.81,"windBearing":128,"visibility":10,"cloudCover":0.44,"pressure":1024.98,"ozone":331.77},{"time":1433178000,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":60.37,"apparentTemperature":60.37,"dewPoint":40.3,"humidity":0.47,"windSpeed":11.2,"windBearing":129,"visibility":10,"cloudCover":0.33,"pressure":1024.33,"ozone":331.02},{"time":1433181600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":62.51,"apparentTemperature":62.51,"dewPoint":41.05,"humidity":0.45,"windSpeed":11.52,"windBearing":130,"visibility":10,"cloudCover":0.23,"pressure":1023.66,"ozone":330.07},{"time":1433185200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":64.64,"apparentTemperature":64.64,"dewPoint":42.51,"humidity":0.44,"windSpeed":11.78,"windBearing":132,"visibility":10,"cloudCover":0.2,"pressure":1022.97,"ozone":328.69},{"time":1433188800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":66.58,"apparentTemperature":66.58,"dewPoint":44.36,"humidity":0.45,"windSpeed":12.4,"windBearing":136,"visibility":10,"cloudCover":0.2,"pressure":1022.24,"ozone":327.11},{"time":1433192400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":67.93,"apparentTemperature":67.93,"dewPoint":46.28,"humidity":0.46,"windSpeed":12.58,"windBearing":138,"visibility":10,"cloudCover":0.21,"pressure":1021.6,"ozone":325.96},{"time":1433196000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":68.4,"apparentTemperature":68.4,"dewPoint":47.8,"humidity":0.48,"windSpeed":12.58,"windBearing":139,"visibility":10,"cloudCover":0.23,"pressure":1021.06,"ozone":325.61},{"time":1433199600,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":67.7,"apparentTemperature":67.7,"dewPoint":48.69,"humidity":0.51,"windSpeed":12.21,"windBearing":137,"visibility":10,"cloudCover":0.26,"pressure":1020.61,"ozone":325.69},{"time":1433203200,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":66.09,"apparentTemperature":66.09,"dewPoint":49.27,"humidity":0.55,"windSpeed":11.88,"windBearing":136,"visibility":10,"cloudCover":0.26,"pressure":1020.3,"ozone":325.68},{"time":1433206800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":63.13,"apparentTemperature":63.13,"dewPoint":49.52,"humidity":0.61,"windSpeed":11.55,"windBearing":135,"visibility":10,"cloudCover":0.21,"pressure":1020.16,"ozone":325.28},{"time":1433210400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":59.63,"apparentTemperature":59.63,"dewPoint":49.4,"humidity":0.69,"windSpeed":11.21,"windBearing":133,"visibility":10,"cloudCover":0.13,"pressure":1020.14,"ozone":324.79},{"time":1433214000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":56.79,"apparentTemperature":56.79,"dewPoint":48.88,"humidity":0.75,"windSpeed":10.81,"windBearing":133,"visibility":10,"cloudCover":0.06,"pressure":1020.18,"ozone":324.66},{"time":1433217600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":55.1,"apparentTemperature":55.1,"dewPoint":48.05,"humidity":0.77,"windSpeed":10.28,"windBearing":137,"visibility":10,"cloudCover":0.02,"pressure":1020.29,"ozone":325.24},{"time":1433221200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":54.05,"apparentTemperature":54.05,"dewPoint":47.18,"humidity":0.78,"windSpeed":9.91,"windBearing":143,"visibility":10,"cloudCover":0.01,"pressure":1020.46,"ozone":326.18},{"time":1433224800,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":53.07,"apparentTemperature":53.07,"dewPoint":46.56,"humidity":0.78,"windSpeed":9.75,"windBearing":147,"visibility":10,"cloudCover":0.03,"pressure":1020.6,"ozone":326.83},{"time":1433228400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":51.84,"apparentTemperature":51.84,"dewPoint":46.39,"humidity":0.82,"windSpeed":9.6,"windBearing":148,"visibility":10,"cloudCover":0.13,"pressure":1020.72,"ozone":327.05},{"time":1433232000,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":50.54,"apparentTemperature":50.54,"dewPoint":46.29,"humidity":0.85,"windSpeed":9.53,"windBearing":148,"visibility":10,"cloudCover":0.26,"pressure":1020.81,"ozone":326.97},{"time":1433235600,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":49.71,"apparentTemperature":45.81,"dewPoint":46.12,"humidity":0.87,"windSpeed":9.63,"windBearing":147,"visibility":10,"cloudCover":0.32,"pressure":1020.82,"ozone":326.31},{"time":1433239200,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":49.49,"apparentTemperature":45.47,"dewPoint":45.8,"humidity":0.87,"windSpeed":9.79,"windBearing":146,"visibility":10,"cloudCover":0.27,"pressure":1020.74,"ozone":324.58},{"time":1433242800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":49.92,"apparentTemperature":45.88,"dewPoint":45.64,"humidity":0.85,"windSpeed":10.17,"windBearing":146,"visibility":10,"cloudCover":0.14,"pressure":1020.58,"ozone":322.27},{"time":1433246400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":51.21,"apparentTemperature":51.21,"dewPoint":45.88,"humidity":0.82,"windSpeed":10.81,"windBearing":147,"visibility":10,"cloudCover":0.03,"pressure":1020.3,"ozone":320.55},{"time":1433250000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":54.17,"apparentTemperature":54.17,"dewPoint":46.98,"humidity":0.77,"windSpeed":11.8,"windBearing":152,"visibility":10,"cloudCover":0,"pressure":1019.85,"ozone":320.09},{"time":1433253600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":58.52,"apparentTemperature":58.52,"dewPoint":48.73,"humidity":0.7,"windSpeed":13.02,"windBearing":157,"visibility":10,"cloudCover":0,"pressure":1019.29,"ozone":320.21},{"time":1433257200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":62.3,"apparentTemperature":62.3,"dewPoint":49.99,"humidity":0.64,"windSpeed":14.01,"windBearing":159,"visibility":10,"cloudCover":0.03,"pressure":1018.73,"ozone":320.09}]},"daily":{"summary":"Light rain on Wednesday through Sunday, with temperatures rising to 84°F on Sunday.","icon":"rain","data":[{"time":1433048400,"summary":"Mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1433068338,"sunsetTime":1433123533,"moonPhase":0.43,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":42.87,"temperatureMinTime":1433070000,"temperatureMax":64.59,"temperatureMaxTime":1433109600,"apparentTemperatureMin":38.85,"apparentTemperatureMinTime":1433066400,"apparentTemperatureMax":64.59,"apparentTemperatureMaxTime":1433109600,"dewPoint":36.12,"humidity":0.52,"windSpeed":8.02,"windBearing":96,"visibility":9.99,"cloudCover":0.44,"pressure":1025.25,"ozone":344.4},{"time":1433134800,"summary":"Partly cloudy until afternoon.","icon":"partly-cloudy-day","sunriseTime":1433154704,"sunsetTime":1433209985,"moonPhase":0.46,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":45.95,"temperatureMinTime":1433156400,"temperatureMax":68.4,"temperatureMaxTime":1433196000,"apparentTemperatureMin":41.73,"apparentTemperatureMinTime":1433156400,"apparentTemperatureMax":68.4,"apparentTemperatureMaxTime":1433196000,"dewPoint":42.23,"humidity":0.59,"windSpeed":10.06,"windBearing":128,"visibility":10,"cloudCover":0.29,"pressure":1023.47,"ozone":333.19},{"time":1433221200,"summary":"Partly cloudy starting in the afternoon, continuing until evening.","icon":"partly-cloudy-day","sunriseTime":1433241072,"sunsetTime":1433296435,"moonPhase":0.51,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":49.49,"temperatureMinTime":1433239200,"temperatureMax":74.1,"temperatureMaxTime":1433282400,"apparentTemperatureMin":45.47,"apparentTemperatureMinTime":1433239200,"apparentTemperatureMax":74.1,"apparentTemperatureMaxTime":1433282400,"dewPoint":50.53,"humidity":0.68,"windSpeed":12.92,"windBearing":152,"visibility":10,"cloudCover":0.25,"pressure":1017.63,"ozone":321.25},{"time":1433307600,"summary":"Light rain until afternoon, starting again in the evening.","icon":"rain","sunriseTime":1433327442,"sunsetTime":1433382884,"moonPhase":0.54,"precipIntensity":0.0034,"precipIntensityMax":0.0135,"precipIntensityMaxTime":1433354400,"precipProbability":0.46,"precipType":"rain","temperatureMin":54.2,"temperatureMinTime":1433325600,"temperatureMax":76.11,"temperatureMaxTime":1433372400,"apparentTemperatureMin":54.2,"apparentTemperatureMinTime":1433325600,"apparentTemperatureMax":76.11,"apparentTemperatureMaxTime":1433372400,"dewPoint":58.37,"humidity":0.75,"windSpeed":12.47,"windBearing":170,"visibility":10,"cloudCover":0.64,"pressure":1013.59,"ozone":313.54},{"time":1433394000,"summary":"Rain in the morning and afternoon.","icon":"rain","sunriseTime":1433413814,"sunsetTime":1433469331,"moonPhase":0.57,"precipIntensity":0.0244,"precipIntensityMax":0.0879,"precipIntensityMaxTime":1433451600,"precipProbability":1,"precipType":"rain","temperatureMin":63.78,"temperatureMinTime":1433415600,"temperatureMax":76,"temperatureMaxTime":1433440800,"apparentTemperatureMin":63.78,"apparentTemperatureMinTime":1433415600,"apparentTemperatureMax":76,"apparentTemperatureMaxTime":1433440800,"dewPoint":64.56,"humidity":0.83,"windSpeed":8.55,"windBearing":183,"cloudCover":0.94,"pressure":1014.01,"ozone":320.4},{"time":1433480400,"summary":"Rain starting in the afternoon.","icon":"rain","sunriseTime":1433500189,"sunsetTime":1433555777,"moonPhase":0.6,"precipIntensity":0.0173,"precipIntensityMax":0.0769,"precipIntensityMaxTime":1433538000,"precipProbability":0.99,"precipType":"rain","temperatureMin":64.79,"temperatureMinTime":1433494800,"temperatureMax":80.57,"temperatureMaxTime":1433541600,"apparentTemperatureMin":64.79,"apparentTemperatureMinTime":1433494800,"apparentTemperatureMax":82.82,"apparentTemperatureMaxTime":1433541600,"dewPoint":64.55,"humidity":0.76,"windSpeed":3.95,"windBearing":130,"cloudCover":0.79,"pressure":1015.7,"ozone":328.98},{"time":1433566800,"summary":"Light rain throughout the day and breezy overnight.","icon":"rain","sunriseTime":1433586566,"sunsetTime":1433642221,"moonPhase":0.64,"precipIntensity":0.022,"precipIntensityMax":0.0434,"precipIntensityMaxTime":1433649600,"precipProbability":1,"precipType":"rain","temperatureMin":63.23,"temperatureMinTime":1433588400,"temperatureMax":79.08,"temperatureMaxTime":1433620800,"apparentTemperatureMin":63.23,"apparentTemperatureMinTime":1433588400,"apparentTemperatureMax":79.08,"apparentTemperatureMaxTime":1433620800,"dewPoint":64.73,"humidity":0.8,"windSpeed":10.06,"windBearing":158,"cloudCover":0.92,"pressure":1013.31,"ozone":320.42},{"time":1433653200,"summary":"Light rain in the morning and evening.","icon":"rain","sunriseTime":1433672945,"sunsetTime":1433728663,"moonPhase":0.68,"precipIntensity":0.0117,"precipIntensityMax":0.0441,"precipIntensityMaxTime":1433653200,"precipProbability":0.97,"precipType":"rain","temperatureMin":68.02,"temperatureMinTime":1433736000,"temperatureMax":84.15,"temperatureMaxTime":1433710800,"apparentTemperatureMin":68.02,"apparentTemperatureMinTime":1433736000,"apparentTemperatureMax":85.87,"apparentTemperatureMaxTime":1433710800,"dewPoint":63.61,"humidity":0.74,"windSpeed":6.35,"windBearing":278,"cloudCover":0.85,"pressure":1006.31,"ozone":331.74}]},"flags":{"sources":["nwspa","isd","nearest-precip","fnmoc","sref","rtma","rap","nam","cmc","gfs","madis","lamp","darksky"],"isd-stations":["726579-99999","726580-14922","999999-14922","999999-14947","999999-14961"],"madis-stations":["A1184","A1769","AR868","AU778","C5102","C5560","C5791","D7987","D8249","E0352","E0587","E3700","E5908","KFCM","KMSP","MN086"],"lamp-stations":["KANE","KCFE","KFBL","KFCM","KLVN","KMIC","KMSP","KSGS","KSTP","KSYN"],"darksky-stations":["KMPX"],"units":"us"}}');
	$httpBackend.whenGET(/\/all_weather\?latitude=-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}&longitude=-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).respond(data);
});