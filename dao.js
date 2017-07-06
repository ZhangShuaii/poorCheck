var DB_URL = 'mongodb://127.0.0.1:27017/test2';
var COLLECTION_NAME = 'POOR_FAMILY';


var mongo = require('mongoskin');
var db = mongo.db(DB_URL, {native_parser:true});
db.bind(COLLECTION_NAME);

/*
* callback(results)
*/
exports.getAllPoors = function(callback){
	db[COLLECTION_NAME].find().toArray(function(err, results) {
		if(err){
			console.log(items);
		}
		callback(results);
	    db.close();
	});
}