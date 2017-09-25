var DB_URL = 'mongodb://127.0.0.1:27017/';
// var DB_URL = 'mongodb://47.93.6.41:27017/';
var COLLECTION_NAME = 'POOR_FAMILY';


var mongo = require('mongoskin');


/*
* callback(results)
*/
exports.getAllPoors = function(years,callback){
	var db = mongo.db(DB_URL + years, {native_parser:true});
	db.bind(COLLECTION_NAME);

	db[COLLECTION_NAME].find().toArray(function(err, results) {
		if(err){
			console.log(items);
		}
		callback(results);
		db.close();
	});
};

exports.insertQuesTab = function(years,tab,callback){
	var db = mongo.db(DB_URL + years);
	db.bind('questionTab');
	db['questionTab'].insert([tab],function(err,results){
		if(err){
			console.log(err);
		}else{
			callback(results);
		}
		db.close();
	});
}