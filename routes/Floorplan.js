var path = require('path');
var appDir = path.dirname(require.main.filename);
var logger = require(appDir + '/lib/Logger');
var connection = require(appDir + '/lib/DBConnection');
var events = require('events');



var floorplan = {};
floorplan.eventEmitter = new events.EventEmitter();

floorplan.get = function(id) {
	/*connection.connect(function(err) {
	 if (err) {
	 console.log("mysql connection error" + err);
	 res.json({"message" : "DB Connection Error"});
	 }
	 });*/

	var queryString = 'SELECT * FROM floorplans where id = ' + id;

	connection.query(queryString, function(err, rows, fields) {
		if (err) {
			logger.error("DB Query Error: " + err);
		}
		//connection.end();
		floorplan.eventEmitter.emit('retrieved', rows);
	});
}


floorplan.add = function() {
	return 'added';
}

module.exports = floorplan;
