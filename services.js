var DAO =require('./dao');
var CheckQuestion = require('./check');
var Report =  require('./writeExcel');

DAO.getAllPoors(function(results){
	var results = CheckQuestion.check(2017,results);
	var reportsJson = Report.writeExcel(results);
	console.log(reportsJson[3]);
});