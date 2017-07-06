var DAO =require('./dao');
var checkQuestion = require('./check');

DAO.getAllPoors(function(results){
	var results = checkQuestion.check(2017,results);
	console.log("错误类型："+results.length);
	console.log(results[results.length-1].results);
});