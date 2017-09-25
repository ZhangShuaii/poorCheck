var DAO =require('./dao');
var CheckQuestion = require('./check');
var Report =  require('./writeExcel');
var year = 2017;
DAO.getAllPoors(year,function(results){
	var results = CheckQuestion.check(year,results);
	var reportsJson = Report.writeExcel(results);
	DAO.insertQuesTab(year,{reportsJson:reportsJson,date:new Date(),year:year},function(results){
		console.log(results);
	});
});