var constMap = require('./constMap'),
	CONST = constMap.getCONST();
var areaMap = require('./areaMap');

var Conf = {
	2015:{
		gt6:20081231,
		gt7:20071231,
		lt14:20010101,
		gt16:19981231,
		gt20:19941231,
		lt59:19560101,
		gt30:19841231,
		outStand:2800,
		gt60:19541231,
		gt65:19491231,
		questions:[4,5,6,8,9,10,11,12,13,14,15,16,17,22,23,24,25,
		26,27,28,29,30,31,32,33,34,35,36,37,38,40,43,44,45,
		46,47,48,49,50,51,52,53,54,57,58,59,60,61,63,64,66,67,
		68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,
		89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106]
	},
	2016:{
		gt6:20091231,
		gt7:20081231,
		lt14:20020101,
		gt16:19991231,
		gt20:19951231,
		lt59:19570101,
		gt30:19851231,
		outStand:2855,
		gt60:19551231,
		gt65:19501231,
		questions:[4,5,6,8,9,10,11,12,13,14,15,16,17,22,23,24,25,
		26,27,28,29,30,31,32,33,34,35,36,37,38,40,43,44,45,
		46,47,48,49,50,51,52,53,54,57,58,59,60,61,63,64,66,67,
		68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,
		89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106]
	},
	2017:{
		gt6:20101231,
		gt7:20091231,
		lt14:20030101,
		gt16:20001231,
		gt20:19961231,
		lt59:19580101,
		gt30:19861231,
		gt60:19561231,
		gt65:19511231,
		outStand:3100,
		questions:[4,5,6,8,9,10,11,12,13,14,15,16,17,21,22,23,24,25,
		26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,43,44,45,
		46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,66,67,
		68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,
		89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107]
	}
};

//添加贫困户户主信息
var pushFamilyBaseInfo = function(poorFamily){
	if(poorFamily.poorFamilyMember.length==0){
		console.log("家庭无成员："+poorFamily.familyCode);
		return [poorFamily.townName,poorFamily.villageName,poorFamily.familyCode];
	}

	var result = [];
	result.push(poorFamily.townName);
	result.push(poorFamily.villageName);
	result.push(poorFamily.poorFamilyMember[0].name);
	result.push(poorFamily.poorFamilyMember[0].idNumber);
	return result;
};

//添加贫困人口信息
var pushPoorBaseInfo = function(poorFamily,poor){
	var result = [];
	result.push(poorFamily.townName);
	result.push(poorFamily.villageName);
	result.push(poor.name);
	result.push(poor.idNumber);
	return result;
};

var questionType = {
	'4':{
		attr:'poorAttrNull',
		name:'贫困户属性为空',
		check : function(poorFamily){
			var thisQues = this,
			poorAttr = poorFamily.poorAttr;
			if(poorAttr == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'5':{
		attr:'isSoldierWifeHouseNull',
		name:'是否是军烈属为空',
		check : function(poorFamily){
			var thisQues = this,
			isSoldierWifeHouse = poorFamily.isSoldierWifeHouse;
			if(isSoldierWifeHouse == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'6':{
		attr:'sexNull',
		name:'性别为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var sex = poor.sex;
				if(sex == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(sex);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'8':{
		attr:'familyRelationNull',
		name:'与户主关系为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var familyRelation = poor.familyRelation;
				if(familyRelation == null){
					var result = pushPoorBaseInfo(poorFamily,poor);;
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'9':{
		attr:'nationNull',
		name:'民族为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var nation = poor.nation;
				if(nation == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'10':{
		attr:'politicStatusNull',
		name:'政治面貌为空',
		check : function(poorFamily){
			return;

			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var politicStatus = poor.politicStatus;
				if(politicStatus == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'11':{
		attr:'educationNull',
		name:'非在校生文化程度为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var education = poor.education,
				grade = poor.grade;
				if((grade == '01')&&(education == null)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'12':{
		attr:'gradeNull',
		name:'在校生情况为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var grade = poor.grade;
				if(grade == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'13':{
		attr:'healthyInfoNull',
		name:'健康状况为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var healthInfo = poor.healthInfo;
				if(healthInfo == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'14':{
		attr:'workSkillsNull',
		name:'劳动技能为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var workSkills = poor.workSkills;
				if(workSkills == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'15':{
		attr:'isBuyMedicareNull',
		name:'是否购买大病医疗保险为空或为否',
		check : function(poorFamily){
			return ;
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var isBuyMedicare = poor.isBuyMedicare;
				if((isBuyMedicare == null)||(isBuyMedicare == '0')){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'16':{
		attr:'isSoldierNull',
		name:'是否现役军人为空',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var isSoldier = poor.isSoldier;
				if(isSoldier == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'17':{
		attr:'mainReasonNull',
		name:'主要致贫原因为空',
		check : function(poorFamily){
			var thisQues = this,
			mainReason = poorFamily.mainReason;
			if(mainReason == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'21':{
		attr:'isMinimumNull',
		name:'是否享受低保为空',
		check : function(poorFamily){
			var thisQues = this,
			poorAttr = poorFamily.poorAttr;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var isMini = poor.isMini;
				if(isMini == null){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'22':{
		attr:'salaryIncomeNull',
		name:'工资性收入为空或小于100',
		check : function(poorFamily){
			var thisQues = this,
			salaryIncome = poorFamily.salaryIncome;
			if((salaryIncome == null) || ((salaryIncome!=0) && (salaryIncome < 100)) ){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(salaryIncome);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.salaryIncome.name]]
	},
	'23':{
		attr:'sellIncomeNull',
		name:'生产经营性收入为空或小于100',
		check : function(poorFamily){
			var thisQues = this,
			sellIncome = poorFamily.sellIncome;
			if((sellIncome == null ) || ((sellIncome!=0) && (sellIncome < 100))){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(sellIncome);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.sellIncome.name]]
	},
	'24':{
		attr:'resourceIncomeNull',
		name:'财产性收入为空或小于100',
		check : function(poorFamily){
			var thisQues = this,
			resourceIncome = poorFamily.resourceIncome;
			if((resourceIncome == null) || ((resourceIncome!=0) && (resourceIncome < 100)) ){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(resourceIncome);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.resourceIncome.name]]
	},
	'25':{
		attr:'transferIncomeNull',
		name:'转移性收入为空',
		check : function(poorFamily){
			var thisQues = this,
			transferIncome = poorFamily.transferIncome;
			transferIncome = {};
			if(transferIncome == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'27':{
		attr:'forestlandAreaNull',
		name:'林地面积为空',
		check : function(poorFamily){
			var thisQues = this,
			forestlandArea = poorFamily.forestlandArea;
			if(forestlandArea == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'26':{
		attr:'cultivatedAreaNull',
		name:'耕地面积为空',
		check : function(poorFamily){
			var thisQues = this,
			cultivatedArea = poorFamily.cultivatedArea;
			if(cultivatedArea == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'28':{
		attr:'grassAreaNull',
		name:'牧草面积为空或大于50亩',
		check : function(poorFamily){
			var thisQues = this,
			grassArea = poorFamily.grassArea;
			if((grassArea == null ) || (grassArea >= 50 )){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'29':{
		attr:'poolAreaNull',
		name:'水面面积为空或大于50亩',
		check : function(poorFamily){
			var thisQues = this,
			poolArea = poorFamily.poolArea;
			if((poolArea == null) || (poolArea >= 50) ){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(poolArea);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'30':{
		attr:'hasElectricOfProductNull',
		name:'是否通生产用电为空',
		check : function(poorFamily){
			var thisQues = this,
			hasElectricOfProduct = poorFamily.hasElectricOfProduct;
			if(hasElectricOfProduct == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'31':{
		attr:'distanceFromRoadNull',
		name:'与村主干路距离为空',
		check : function(poorFamily){
			var thisQues = this,
			distanceFromRoad = poorFamily.distanceFromRoad;
			if(distanceFromRoad == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'32':{
		attr:'roadTypeNull',
		name:'入户路类型为空',
		check : function(poorFamily){
			var thisQues = this,
			roadType = poorFamily.roadType;
			if(roadType == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'33':{
		attr:'houseAreaNull',
		name:'住房面积为空或大于500',
		check : function(poorFamily){
			var thisQues = this,
			houseArea = poorFamily.houseArea;
			if((houseArea == null) || (houseArea >= 500) ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'34':{
		attr:'hasElectricOfLiveNull',
		name:'是否通生活用电为空',
		check : function(poorFamily){
			var thisQues = this,
			hasElectricOfLive = poorFamily.hasElectricOfLive;
			if(hasElectricOfLive == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'35':{
		attr:'isDifficultWaterNull',
		name:'饮水是否困难为空',
		check : function(poorFamily){
			var thisQues = this,
			isDifficultWater = poorFamily.isDifficultWater;
			if(isDifficultWater == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'36':{
		attr:'isSafeWaterNull',
		name:'饮水是否安全为空',
		check : function(poorFamily){
			var thisQues = this,
			isSafeWater = poorFamily.isSafeWater;
			if(isSafeWater == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'37':{
		attr:'mainFuelTypeNull',
		name:'主要燃料类型为空',
		check : function(poorFamily){
			var thisQues = this,
			mainFuelType = poorFamily.mainFuelType;
			if(mainFuelType == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'38':{
		attr:'hasJoinOrgNull',
		name:'是否加入农民专业合作社为空',
		check : function(poorFamily){
			var thisQues = this,
			hasJoinOrg = poorFamily.hasJoinOrg;
			if(hasJoinOrg == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'39':{
		attr:'hasCleanWCNull',
		name:'是否有清洁厕所为空',
		check : function(poorFamily){
			var thisQues = this,
			hasCleanWC = poorFamily.hasCleanWC;
			if(hasCleanWC == null ){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'40':{
		attr:'idNumLengthErr',
		name:'证件号码长度异常',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber,
					idLength = idNumber.length;
				if((idNumber==null) || ((idLength!=18) && (idLength!=20))){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(idLength);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,'证件号码长度']]
	},
	'43':{
		attr:'disNumLengthErr',
		name:'证件类型跟证件号码长度不匹配',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber,
					idLength = idNumber.length;

				if(((poor.numerType=='09') && (idLength!=20)) || ((poor.numerType=='01') && (idLength!=18)) ){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(idLength);
					result.push(constMap.getValue(CONST.numerType.attr,poor.numerType));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,'证件号码长度',CONST.numerType.name]]
	},

	'44':{
		attr:'workMonthErr',
		name:'务工时间不符合校验规则',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workMonth = poor.workMonth;
				if(((workMonth-12)>0) || isNaN(workMonth-0)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(workMonth);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workMonth.name]]
	},
	'45':{
		attr:'averageFundErr',
		name:'人均纯收入小于500或超过30000',
		check : function(poorFamily){
			var thisQues = this;
			var averageFund = poorFamily.averageFund;
			if((averageFund > 30000) || (averageFund <= 500)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(averageFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.averageFund.name]]
	},
	'46':{
		attr:'overAreaErr',
		name:'耕地面积大于10亩或林地面积大于50亩',
		check : function(poorFamily){
			var thisQues = this;
			var forestlandArea = poorFamily.forestlandArea,
			cultivatedArea = poorFamily.cultivatedArea;
			if((forestlandArea >= 50) || (cultivatedArea >= 10)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(cultivatedArea);
				result.push(forestlandArea);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.cultivatedArea.name,CONST.forestlandArea.name]]
	},
	'47':{
		attr:'houseAreaErr',
		name:'脱贫户住房面积小于10',
		check : function(poorFamily){
			var thisQues = this;
			var houseArea = poorFamily.houseArea,
			isOut = poorFamily.isOut;
			if(((isOut=='1')||(isOut=='4')) && (houseArea < 10)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(houseArea);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.houseArea.name]]
	},
	'48':{
		attr:'distanceFromRoadErr',
		name:'与村主干路距离大于2公里',
		check : function(poorFamily){
			var thisQues = this;
			var distanceFromRoad = poorFamily.distanceFromRoad;
			if(distanceFromRoad > 2){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(distanceFromRoad);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.distanceFromRoad.name]]
	},
	'49':{
		attr:'sexErr',
		name:'性别与户主关系、与身份证不一致',
		check : function(poorFamily){
			var thisQues = this;
			var houseHoldSex,mateSex;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var sex = poor.sex,
				familyRelation = poor.familyRelation,
				idNumber = poor.idNumber,
				idSex = idNumber.charAt(16)%2;

				if(idSex == 0){
					idSex = 2;
				}
				var errFlag = (idSex != sex);
				var checkMateSex = function(){
					if((typeof houseHoldSex != 'undefined') && (typeof mateSex != 'undefined')){
						errFlag = (errFlag || (houseHoldSex == mateSex));
						houseHoldSex = undefined;
						mateSex = undefined;
					}
				};
				switch(familyRelation){
					case '01':
						houseHoldSex = poor.sex;
						checkMateSex();
						break;
					case '02':
						mateSex = poor.sex;
						checkMateSex();
						break;
					case '03':
					case '06':
					case '07':
					case '09':
					case '11':
					case '13':
					case '15':
					case '17':
					case '19':
						errFlag = (errFlag || (sex == '2'));
						break;
					case '04':
					case '05':
					case '08':
					case '10':
					case '12':
					case '14':
					case '16':
					case '18':
					case '20':
						errFlag = (errFlag || (sex == '1'));
						break;
				}

				if(errFlag){
				var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.sex.attr,sex));
					result.push(constMap.getValue(CONST.familyRelation.attr,familyRelation));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.sex.name,CONST.familyRelation.name]]
	},
	'50':{
		attr:'householdErr',
		name:'贫困户无户主',
		check : function(poorFamily){
			var thisQues = this,
				hasHousehold = false;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var familyRelation = poor.familyRelation;
				if(familyRelation == '01'){
					hasHousehold = true;
				}
			});

			if(!hasHousehold){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.familyCode.name]]
	},	

	'51':{
		attr:'overOtherReasonErr',
		name:'其他致贫原因超过2项',
		check : function(poorFamily){
			var thisQues = this,
				otherReason = poorFamily.otherReason;
			if(otherReason == null){
				return;
			}else{
				var otherReasonArr = otherReason.split(',');
				if(otherReasonArr.length>2){
					var result = pushFamilyBaseInfo(poorFamily);
					var otherReasonStr = [constMap.getValue(CONST.otherReason.attr,otherReasonArr[0])
					,constMap.getValue(CONST.otherReason.attr,otherReasonArr[1])
					,constMap.getValue(CONST.otherReason.attr,otherReasonArr[2])]
					.join();

					result.push(otherReasonStr);
					thisQues.results.push(result);
				}
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.otherReason.name]]
	},

	'52':{
		attr:'poorReasonRepetErr',
		name:'其他致贫原因与主要致贫原因重复',
		check : function(poorFamily){
			var thisQues = this,
				otherReason = poorFamily.otherReason,
				mainReason = poorFamily.mainReason;
			if(otherReason == null){
				return;
			}else{
				var otherReasonArr = otherReason.split(','),
				isRepet = false;
				otherReasonArr.forEach(function(val,key){
					if(val == mainReason){
						isRepet  =  true;
					}
				});
				if(isRepet){
					var result = pushFamilyBaseInfo(poorFamily);
					result.push(mainReason);
					thisQues.results.push(result);
				}
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.mainReason.name]]
	},
	'53':{
		attr:'workMonthErr2',
		name:'有务工收入无务工时间',
		check : function(poorFamily){
			var thisQues = this,
				salaryIncome = poorFamily.salaryIncome;
			if((salaryIncome == 0 )|| (salaryIncome == null)){
				return;
			}else{
				var noWorkMonth = true;
				poorFamily.poorFamilyMember.forEach(function(poor,key){
					var workMonth = poor.workMonth;
					if(workMonth > 0){
						noWorkMonth = false;
					}
				});
			}

			if(noWorkMonth){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(poorFamily.salaryIncome);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.salaryIncome.name]]
	},
	'54':{
		attr:'salaryIncomeErr',
		name:'有务工时间无务工收入',
		check : function(poorFamily){
			var thisQues = this,
				salaryIncome = poorFamily.salaryIncome;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workMonth = poor.workMonth;
				if((workMonth > 0) && (salaryIncome <= 100)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(poor.workMonth);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workMonth.name]]
	},	
	'55':{
		attr:'workCityErr',
		name:'有务工时间无务工地点',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workMonth = poor.workMonth,
				workCity = poor.workCity;
				if((workMonth > 0) && (workCity == null)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(poor.workMonth);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workMonth.name]]
	},
	'56':{
		attr:'companyNameErr',
		name:'有务工时间无务工企业名称',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workMonth = poor.workMonth,
				companyName = poor.companyName;
				if((workMonth > 0) && (companyName == null)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(poor.workMonth);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workMonth.name]]
	},
	'57':{
		attr:'companyNameErr',
		name:'贫困户属性异常',
		check : function(poorFamily){
			var thisQues = this,
			isOut = poorFamily.isOut,
			poorAttr = poorFamily.poorAttr;
			var errFlag = false;
			if(((isOut=='1') || (isOut=='4')) && (poorAttr!='02') && (poorAttr!='03') && (poorAttr!='05')){
				errFlag = true;
			}
			if(((isOut=='0') || (isOut=='3')) && (poorAttr!='01') && (poorAttr!='04') && (poorAttr!='06')){
				errFlag = true;
			}
			if(errFlag){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				result.push(constMap.getValue(CONST.isOut.attr,isOut));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name,CONST.isOut.name]]
	},
	'58':{
		attr:'workMonthErr3',
		name:'无劳动力有务工情况',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workMonth = poor.workMonth,
					workSkills = poor.workSkills;

				if((workMonth > 0) && (workSkills >= 3)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(poor.workMonth);
					result.push(constMap.getValue(CONST.workSkills.attr,workSkills));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workMonth.name,CONST.workSkills.name]]
	},
	'59':{
		attr:'workSkillsErr',
		name:'16--65周岁无劳动力',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workSkills = poor.workSkills,
					birthday = poor.birthday;

				var isInAge = (birthday < Conf[Conf.years].gt16) && (birthday > Conf[Conf.years].gt65);
				if(isInAge && (workSkills == "04") ){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.workSkills.attr,workSkills));
					result.push(birthday);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workSkills.name,CONST.birthday.name]]
	},
	'60':{
		attr:'gradeErr',
		name:'30岁以上在校生',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var grade = poor.grade,
					birthday = poor.birthday;

				var isInAge = (birthday < Conf[Conf.years].gt30) ;
				if(isInAge && (grade > 1) ){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.grade.attr,grade));
					result.push(birthday);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.grade.name,CONST.birthday.name]]
	},
	'61':{
		attr:'gradeErr2',
		name:'6--14岁健康儿童辍学',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var grade = poor.grade,
					birthday = poor.birthday,
					healthInfo = poor.healthInfo;

				var isInAge = (birthday > Conf[Conf.years].lt14) && (birthday < Conf[Conf.years].gt6) ;
				if(isInAge && (grade == '01') && (healthInfo<='02')){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.grade.attr,grade));
					result.push(birthday);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.grade.name,CONST.birthday.name]]
	},
	'62':{
		attr:'minimumFamilyErr',
		name:'低保户无人享受低保',
		check : function(poorFamily){
			var thisQues = this,
				poorAttr = poorFamily.poorAttr;
			if((poorAttr!='02')&&(poorAttr!='04')){
				return ;
			}
			var noMinimun = true;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var isMini = poor.isMini;
				if(isMini == '1' ){
					noMinimun = false;
				};
			});
			if(noMinimun){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'63':{
		attr:'minimumFundErr',
		name:'低保户无低保金或低保金小于100',
		check : function(poorFamily){
			var thisQues = this,
				poorAttr = poorFamily.poorAttr,
				minimumFund = poorFamily.minimumFund;

			if((poorAttr!='02')&&(poorAttr!='04')){
				return ;
			}

			if((minimumFund == null) ||(minimumFund < 100)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'64':{
		attr:'fiveFundErr',
		name:'五保户无五保金或五保金小于100',
		check : function(poorFamily){
			var thisQues = this,
				poorAttr = poorFamily.poorAttr,
				fiveFund = poorFamily.fiveFund;

			if((poorAttr!='03')&&(poorAttr!='06')){
				return ;
			}

			if((fiveFund == null) ||(fiveFund < 100)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'66':{
		attr:'disCredentialsErr',
		name:'残疾人无残疾证',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo,
					idNumber = poor.idNumber;

				if((healthInfo == '04') && (idNumber.length != 20)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.healthInfo.attr,healthInfo));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.healthInfo.name]]
	},
	'67':{
		attr:'disCredentialsErr2',
		name:'有残疾证健康状况为健康',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo,
					numerType = poor.numerType;

				if((numerType == '09') && (healthInfo == '01')){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.healthInfo.attr,healthInfo));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.healthInfo.name]]
	},
	'68':{
		attr:'isDangerHouseErr',
		name:'脱贫户是危房户',
		check : function(poorFamily){
			var thisQues = this,
				isOut = poorFamily.isOut,
				poorAttr = poorFamily.poorAttr,
				isDangerHouse = poorFamily.isDangerHouse;

			if(((isOut == '1') || (isOut == '4'))&&(isDangerHouse == '1')){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'69':{
		attr:'isDifficultWaterErr',
		name:'脱贫户饮水困难',
		check : function(poorFamily){
			var thisQues = this,
				isOut = poorFamily.isOut,
				isDifficultWater = poorFamily.isDifficultWater;

			if(((isOut == '1') || (isOut == '4'))&&(isDifficultWater == '1')){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorFamily.poorAttr));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'70':{
		attr:'isSafeWaterErr',
		name:'脱贫户饮水不安全',
		check : function(poorFamily){
			var thisQues = this,
				isOut = poorFamily.isOut,
				isSafeWater = poorFamily.isSafeWater;

			if(((isOut == '1') || (isOut == '4'))&&(isSafeWater == '0')){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorFamily.poorAttr));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'71':{
		attr:'mainReasonForSickErr',
		name:'【未脱贫】全家健康因病致贫',
		check : function(poorFamily){
			var thisQues = this,
				mainReason = poorFamily.mainReason,
				isOut = poorFamily.isOut;

			if(((isOut !='0') || (isOut == '3')) || (mainReason != '01')){
				return;
			}
			var isSick = false;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo;
				if(healthInfo != '01'){
					isSick =  true;
				}
			});
			if(!isSick){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'72':{
		attr:'mainReasonForEducationErr',
		name:'【未脱贫】全家无在校生因学致贫',
		check : function(poorFamily){
			var thisQues = this,
				mainReason = poorFamily.mainReason,
				isOut = poorFamily.isOut;

			if((isOut !='0') || (mainReason != '03')){
				return;
			}
			var isInSchool = false;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var grade = poor.grade;
				if(grade >= 7){
					isInSchool =  true;
				}
			});
			if(!isInSchool){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'73':{
		attr:'mainReasonForDisabledErr',
		name:'全家无残疾人因残致贫',
		check : function(poorFamily){
			var thisQues = this,
				mainReason = poorFamily.mainReason;

			if(mainReason != '02'){
				return;
			}
			var isDisabled = false;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo;
				if(healthInfo == '04'){
					isDisabled =  true;
				}
			});
			if(!isDisabled){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'74':{
		attr:'averageFundErr2',
		name:'未脱贫人均收入大于20000',
		check : function(poorFamily){
			var thisQues = this,
				isOut = poorFamily.isOut,
				poorAttr = poorFamily.poorAttr,
				averageFund = poorFamily.averageFund;

			if((isOut == '0' || (isOut == '3'))&&(averageFund > 20000)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				result.push(averageFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name,CONST.averageFund.name]]
	},
	'75':{
		attr:'averageFundErr3',
		name:'脱贫户人均纯收入小于国家标准',
		check : function(poorFamily){
			var thisQues = this,
				isOut = poorFamily.isOut,
				averageFund = poorFamily.averageFund;

			if(((isOut == '1') || (isOut == '4'))&&(averageFund < Conf[Conf.years].outStand)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.isOut.attr,isOut));
				result.push(averageFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.isOut.name,CONST.averageFund.name]]
	},
	'76':{
		attr:'minimumFundAndFiveFundErr',
		name:'同时领取五保金和低保金',
		check : function(poorFamily){
			var thisQues = this,
				fiveFund = poorFamily.fiveFund,
				minimumFund = poorFamily.minimumFund;

			if((minimumFund > 0 ) && (fiveFund > 0)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(minimumFund);
				result.push(fiveFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.minimumFund.name,CONST.fiveFund.name]]
	},
	'77':{
		attr:'minimumFundErr2',
		name:'非低保户有低保金',
		check : function(poorFamily){
			var thisQues = this,
				poorAttr = poorFamily.poorAttr,
				minimumFund = poorFamily.minimumFund;

			if((poorAttr != '02' ) && (poorAttr != '04' ) && (minimumFund > 0)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				result.push(minimumFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name,CONST.minimumFund.name]]
	},
	'78':{
		attr:'fiveFundErr2',
		name:'非五保户有五保金',
		check : function(poorFamily){
			var thisQues = this,
				poorAttr = poorFamily.poorAttr,
				fiveFund = poorFamily.fiveFund;

			if((poorAttr != '03' ) && (poorAttr != '06' ) && (fiveFund > 0)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
				result.push(fiveFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name,CONST.fiveFund.name]]
	},
	'79':{
		attr:'isMiniErr3',
		name:'一般贫困户享受低保',
		check : function(poorFamily){
			var thisQues = this,
			poorAttr = poorFamily.poorAttr;
			if((poorAttr!='01')&&(poorAttr!='05')){
				return ;
			}

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var isMini = poor.isMini;
				if(isMini == '01'){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.poorAttr.attr,poorAttr));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.poorAttr.name]]
	},
	'80':{
		attr:'householdErr2',
		name:'存在多个户主',
		check : function(poorFamily){
			var thisQues = this;

			var householdCount = 0;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var familyRelation = poor.familyRelation;
				if(familyRelation == '01'){
					householdCount++;
				}
			});
			if(householdCount > 1){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(householdCount);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,'户主数量']]
	},
	'81':{
		attr:'gradeErr3',
		name:'14岁以下在校生状况为高中以上',
		check : function(poorFamily){
			var thisQues = this;

			var householdCount = 0;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var grade = poor.grade,
				birthday = poor.birthday;
				if((birthday > Conf[Conf.years].lt14)&&(grade >= 7)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(birthday);
					result.push(constMap.getValue(CONST.grade.attr,grade));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name,CONST.grade.name]]
	},
	'82':{
		attr:'gradeErr3',
		name:'16岁以上在校生状况为小学以下',
		check : function(poorFamily){
			var thisQues = this;

			var householdCount = 0;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var grade = poor.grade,
				birthday = poor.birthday;
				if((birthday <= Conf[Conf.years].gt16)&&(grade <= 3)&&(grade != '01')){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(birthday);
					result.push(constMap.getValue(CONST.grade.attr,grade));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name,CONST.grade.name]]
	},
	'83':{
		attr:'mainReasonForNoWokerErr',
		name:'【未脱贫】全家3个以上劳动力，致贫原因缺劳力',
		check : function(poorFamily){
			var thisQues = this,
				mainReason = poorFamily.mainReason,
				isOut = poorFamily.isOut;

			if((isOut =='1') || (isOut == '4') || (mainReason != '08')){
				return;
			}

			var workerCount = 0;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workSkills = poor.workSkills;
				if(workSkills < 3){
					workerCount++;
				}
			});

			if(workerCount>=3){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(poorFamily.poorFamilyMember.length);
				result.push(workerCount);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,'家庭人口数','劳动力人数']]
	},
	'84':{
		attr:'averageFundErr2',
		name:'一般贫困户人均纯收入超过国家标准，致贫原因非因病因学因残',
		check : function(poorFamily){
			var thisQues = this;
			var averageFund = poorFamily.averageFund,
				mainReason = poorFamily.mainReason,
				poorAttr = poorFamily.poorAttr;
			if((poorAttr == '01') && (averageFund > Conf[Conf.years].outStand) && (mainReason >3)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(averageFund);
				result.push(constMap.getValue(CONST.mainReason.attr,mainReason));
				thisQues.results.push(result);
			}
			
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.averageFund.name,CONST.mainReason.name]]
	},
	'85':{
		attr:'fiveGuaranteesErr',
		name:'五保户存在16--59岁劳动力',
		check : function(poorFamily){
			var thisQues = this,
				poorAttr = poorFamily.poorAttr;

			if((poorAttr!='03')&&(poorAttr!='06')){
				return;
			}

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workSkills = poor.workSkills,
					birthday = poor.birthday,
					familyRelation = poor.familyRelation;

				if((workSkills < 3) && (birthday < Conf[Conf.years].gt16) && (birthday > Conf[Conf.years].lt59)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(birthday);
					result.push(constMap.getValue(CONST.workSkills.attr,workSkills));
					result.push(constMap.getValue(CONST.familyRelation.attr,familyRelation));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name,CONST.familyRelation.name]]
	},
	'86':{
		attr:'sellIncomeErr',
		name:'有生产经营收入，无生产经营支出',
		check : function(poorFamily){
			var thisQues = this;
			var sellIncome = poorFamily.sellIncome,
				expend = poorFamily.expend;

			if((sellIncome > 0) && ((expend == null)||(expend < 1))){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(sellIncome);
				result.push(expend);
				thisQues.results.push(result);
			}
			
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.sellIncome.name,CONST.expend.name]]
	},
	'87':{
		attr:'workSkillsErr2',
		name:'16周岁以下有劳动力',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workSkills = poor.workSkills,
					birthday = poor.birthday;

				if((workSkills < 3) && (birthday > Conf[Conf.years].gt16)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(birthday);
					result.push(constMap.getValue(CONST.workSkills.attr,workSkills));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name,CONST.workSkills.name]]
	},
	'88':{
		attr:'minimumFundErr3',
		name:'低保金为空',
		check : function(poorFamily){
			var thisQues = this,
				minimumFund = poorFamily.minimumFund;
			if(minimumFund == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'89':{
		attr:'fiveFundErr3',
		name:'五保金为空',
		check : function(poorFamily){
			var thisQues = this,
				fiveFund = poorFamily.fiveFund;
			if(fiveFund == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'90':{
		attr:'workSkillsErr3',
		name:'65岁以上有劳动力,即无务工时间又无生产经营收入',
		check : function(poorFamily){
			var thisQues = this,
			sellIncome = poorFamily.sellIncome;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var workSkills = poor.workSkills,
					birthday = poor.birthday,
					workMonth = poor.workMonth;

				var isInAge = (birthday < Conf[Conf.years].gt65) ;
				if(isInAge && (workMonth == null || workMonth == 0) && (workSkills < 3) && (sellIncome<=100)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(birthday);
					result.push(workMonth);
					result.push(sellIncome);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name,CONST.workMonth.name,CONST.sellIncome.name]]
	},
	'91':{
		attr:'peopleCountsErr',
		name:'一户超过7人',
		check : function(poorFamily){
			var thisQues = this;
			var memberCounts = poorFamily.poorFamilyMember.length;
			if(memberCounts>=7){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(memberCounts);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,'家庭人口数']]
	},
	'92':{
		attr:'workSkillsErr4',
		name:'健康人口丧失劳动力',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo,
					workSkills = poor.workSkills;

				if((healthInfo == '01') && (workSkills=="03")){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.healthInfo.attr,healthInfo));
					result.push(constMap.getValue(CONST.workSkills.attr,workSkills));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.healthInfo.name,CONST.workSkills.name]]
	},
	'93':{
		attr:'idNumErr',
		name:'证件号码异常',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber;
				if(/99999/.test(idNumber)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'94':{
		attr:'birthdayErr',
		name:'证件号码出生日期与生日不相符',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber,
				birthday = poor.birthday;

				var idBirthDay = idNumber.substr(6,8);

				if(birthday!=idBirthDay){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(birthday);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name]]
	},
	'95':{
		attr:'phoneNumberNull',
		name:'户联系号码为空',
		check : function(poorFamily){
			var thisQues = this,
				phoneNumber = poorFamily.phoneNumber;
			if(phoneNumber == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'96':{
		attr:'bankCardIdNull',
		name:'银行卡号为空',
		check : function(poorFamily){
			var thisQues = this,
				bankCardId = poorFamily.bankCardId;
			if(bankCardId == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'97':{
		attr:'bankCardNameNll',
		name:'开户行名称为空',
		check : function(poorFamily){
			var thisQues = this,
				bankCardName = poorFamily.bankCardName;
			if(bankCardName == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'98':{
		attr:'otherTransferIncomeNull',
		name:'其他转移性收入为空',
		check : function(poorFamily){
			var thisQues = this,
				otherTransferIncome = poorFamily.otherTransferIncome;
			if(otherTransferIncome == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'99':{
		attr:'oldAgeFundNull',
		name:'养老金为空或小于70',
		check : function(poorFamily){
			var thisQues = this,
				oldAgeFund = poorFamily.oldAgeFund;
			if((oldAgeFund == null) || ((oldAgeFund != 0) &&(oldAgeFund < 70))){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(oldAgeFund);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.oldAgeFund.name]]
	},
	'100':{
		attr:'oldAgeFundErr',
		name:'60岁以上老人无养老金',
		check : function(poorFamily){
			var thisQues = this,
				oldAgeFund = poorFamily.oldAgeFund;

				poorFamily.poorFamilyMember.forEach(function(poor,key){
					var birthday = poor.birthday;
					if((birthday <= Conf[Conf.years].gt60) && (oldAgeFund == 0)){
						var result = pushPoorBaseInfo(poorFamily,poor);
						thisQues.results.push(result);
					}
				});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.birthday.name]]
	},
	'101':{
		attr:'oldAgeFundErr2',
		name:'有养老金全家无60岁以上老人',
		check : function(poorFamily){
			var thisQues = this,
				oldAgeFund = poorFamily.oldAgeFund;
			if((oldAgeFund == null)|| (oldAgeFund == 0)){
				return;
			}
			var hasOldAgeFund = false; 
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var birthday = poor.birthday;
				if((birthday <= Conf[Conf.years].gt60)){
					hasOldAgeFund = true;
				}
			});				
			if(!hasOldAgeFund){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'102':{
		attr:'irrigatedAreaNull',
		name:'有效灌溉面积为空',
		check : function(poorFamily){
			var thisQues = this,
				irrigatedArea = poorFamily.irrigatedArea;
			if(irrigatedArea == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'103':{
		attr:'returnAreaNull',
		name:'退耕还林面积为空',
		check : function(poorFamily){
			var thisQues = this,
				returnArea = poorFamily.returnArea;
			if(returnArea == null){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
	'104':{
		attr:'fruitAreaNull',
		name:'林果面积为空或大于50亩',
		check : function(poorFamily){
			var thisQues = this,
				fruitArea = poorFamily.fruitArea;
			if((fruitArea == null) || (fruitArea >= 50)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(fruitArea);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.fruitArea.name]]
	},
	'105':{
		attr:'hasElectricOfLive',
		name:'脱贫户未通生活用电',
		check : function(poorFamily){
			var thisQues = this;
			var isOut = poorFamily.isOut,
			hasElectricOfLive = poorFamily.hasElectricOfLive;
			if(((isOut=='1')||(isOut=='4')) && (hasElectricOfLive == '0')){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.hasElectricOfLive.attr,hasElectricOfLive));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.hasElectricOfLive.name]]
	},
	'106':{
		attr:'dangerHouseLevelNull',
		name:'危房户危房等级为空',
		check : function(poorFamily){
			var thisQues = this,
				dangerHouseLevel = poorFamily.dangerHouseLevel,
				isDangerHouse = poorFamily.isDangerHouse;

			if((isDangerHouse == '1') && (dangerHouseLevel == null)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(constMap.getValue(CONST.isDangerHouse.attr,isDangerHouse));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.isDangerHouse.name]]
	},
	'107':{
		attr:'irrigatedAreaErr',
		name:'有效灌溉面积大于耕地面积',
		check : function(poorFamily){
			var thisQues = this,
				irrigatedArea = poorFamily.irrigatedArea,
				cultivatedArea = poorFamily.cultivatedArea;
			if(irrigatedArea > cultivatedArea){
				var result = pushFamilyBaseInfo(poorFamily);
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name]]
	},
};

/*
 * 依次查询各类疑点问题
 */
exports.check = function(years,poorFamilys){
	var questions = Conf[years].questions;
	Conf.years = years;

	poorFamilys.forEach(function(poorFamily,familyItem){
		questions.forEach(function(questionCode,questionItem){
			//填充乡镇名称 发布时注释掉
			// poorFamily.townName = areaMap.getTownName(poorFamily.townCode); 
			questionType[questionCode].check(poorFamily);
		});
	});
	console.log('check complete');
	var checkResults = [],noProblems = [];
	questions.forEach(function(questionCode,questionItem){
		var questionResults = questionType[questionCode].results;
		if(questionResults.length > 1){
			checkResults.push(questionType[questionCode]);
		}else{
			noProblems.push(questionType[questionCode])
		}
	});
	return checkResults;
}