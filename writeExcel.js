var getDate = function(){
	var date = new Date();
	return "-" + (date.getMonth()+1) + "月" + date.getDate() + "日";
};

var townMap = ["韩摆渡镇","徐集镇","裕安区经济开发区","城南镇",
"单王乡", "丁集镇","独山镇", "狮子岗乡", "罗集乡",
"石板冲乡","顺河镇", "苏埠镇","西河口乡", 
"分路口镇","固镇镇", "江家店镇", 
"平桥乡", "小华山街道","青山乡","新安镇","石婆店镇"];
var reports = [],reportsJson = [];
var writeReports = function(reports){
	var Excel = require('exceljs');
	var workbook = new Excel.Workbook(),
		worksheet = workbook.addWorksheet("sheet");
	var tabHead = ['疑点类型'];
	[].push.apply(tabHead,townMap);
	tabHead.push('合计');
	worksheet.addRow(tabHead);
	reportsJson.push(tabHead);
	// console.log(reports);
	var colCount = ['合计',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		rowCount = 0;
	for(var name in reports){
		var row = [];
		row.push(name);
		townMap.forEach(function(townName,item){
			var townCount = (reports[name][townName] || 0);
			row.push(townCount);
			rowCount += townCount;
			colCount[item+1] += townCount;
			colCount[22]+=townCount;
		});
		row.push(rowCount);
		worksheet.addRow(row);
		reportsJson.push(row);
		rowCount = 0;
	}
	worksheet.addRow(colCount);
	reportsJson.push(colCount);
	workbook.xlsx.writeFile("名单/【汇总统计】"  + getDate() + ".xlsx");
};

exports.writeExcel = function(results){
	results.forEach(function(err,key){
		var Excel = require('exceljs');
		var workbook = new Excel.Workbook(),
			worksheet = workbook.addWorksheet("sheet");
		var reportsErr = {};
		err.results.forEach(function(row,num){
			worksheet.addRow(row);

			if(row[0]=='乡镇名'){
				return;
			}
			if(reportsErr[row[0]]){
				reportsErr[row[0]]++;
			}else{
				reportsErr[row[0]] = 1;
			}
		});
		reports[err.name] = reportsErr;
		// workbook.xlsx.writeFile("名单/" + err.name + getDate() + ".xlsx");
	});

	writeReports(reports);
	return reportsJson;
};
