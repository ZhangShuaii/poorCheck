var constMap = require('./constMap'),
	CONST = constMap.getCONST();
var areaMap = require('./areaMap');

var Conf = {
	2015:{
		gt16:19981231,
		lt59:19560101,
	},
	2016:{
		gt16:19991231,
		lt59:19570101,
	},
	2017:{
		gt7:20091231,
		lt14:20030101,
		gt16:20001231,
		lt59:19580101,
		gt30:19861231,
		questions:[4,5,6,8,9,10,11,12,13,14,15,16,40,43,44,45,49,50,51,53,54,58,59,60,61,66,67,71,72,76,80]
	}
};

//添加贫困户户主信息
var pushFamilyBaseInfo = function(poorFamily){
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
			//todo 政治面貌字段未录入数据库
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
		name:'是否购买大病医疗保险为空',
		check : function(poorFamily){
			//todo isBuyMedicare字段未录入数据库
			return ;
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				var isBuyMedicare = poor.isBuyMedicare;
				if(isBuyMedicare == null){
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
	'40':{
		attr:'idNumLengthErr',
		name:'证件号码长度异常',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber;
				if((idNumber==null) || ((idNumber.length!=18) && (idNumber.length!=20))){
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
		name:'残疾人证不符合校验规则',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber,
					idLength = idNumber.length;

				if(poor.numerType=='09' && (idLength!=20) ){
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
		name:'人均纯收入为0或超过30000',
		check : function(poorFamily){
			var thisQues = this;
			var averageFund = poorFamily.averageFund;
			if((averageFund > 30000) || (averageFund == 0)){
				var result = pushFamilyBaseInfo(poorFamily);
				result.push(averageFund);
				thisQues.results.push(result);
			}
			
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.averageFund.name]]
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
				result.push(constMap.getValue(CONST.familyRelation.attr,poorFamily.poorFamilyMember[0].familyRelation));
				thisQues.results.push(result);
			}
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.familyRelation.name]]
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

	'51':{
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
				if((workMonth > 0) && (salaryIncome == 0)){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(poor.workMonth);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.workMonth.name]]
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
		name:'16--59周岁健康丧失劳动力、无劳动力',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo,
					workSkills = poor.workSkills,
					birthday = poor.birthday;

				var isInAge = (birthday < Conf[Conf.years].gt16) && (birthday > Conf[Conf.years].lt59);
				if(isInAge && (workSkills >=3) && (healthInfo == '01') ){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.healthInfo.attr,healthInfo));
					result.push(constMap.getValue(CONST.workSkills.attr,workSkills));
					result.push(birthday);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.healthInfo.name,CONST.workSkills.name,CONST.birthday.name]]
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
		name:'7--14岁非在校生',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var grade = poor.grade,
					birthday = poor.birthday;

				var isInAge = (birthday > Conf[Conf.years].lt14) && (birthday < Conf[Conf.years].gt7) ;
				if(isInAge && (grade == '01') ){
					var result = pushPoorBaseInfo(poorFamily,poor);
					result.push(constMap.getValue(CONST.grade.attr,grade));
					result.push(birthday);
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.grade.name,CONST.birthday.name]]
	},
	'66':{
		attr:'disCredentialsErr',
		name:'残疾人无残疾证',
		check : function(poorFamily){
			var thisQues = this;

			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var healthInfo = poor.healthInfo,
					numerType = poor.numerType;

				if((healthInfo == '04') && (numerType != '09')){
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
	
	'71':{
		attr:'mainReasonForSickErr',
		name:'【未脱贫】全家健康因病致贫',
		check : function(poorFamily){
			var thisQues = this,
				mainReason = poorFamily.mainReason,
				isOut = poorFamily.isOut;

			if((isOut !='0') || (mainReason != '01')){
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
				var numerType = poor.numerType;
				if(numerType == '09'){
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
	}
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
			poorFamily.townName = areaMap.getTownName(poorFamily.townCode); 
			questionType[questionCode].check(poorFamily);
		});
	});
	console.log('check complete');
	var checkResults = [];
	questions.forEach(function(questionCode,questionItem){
		var questionResults = questionType[questionCode].results;
		if(questionResults.length > 1){
			checkResults.push(questionType[questionCode]);
		}
	});
	return checkResults;
}