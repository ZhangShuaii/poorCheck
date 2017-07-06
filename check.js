/*var CONST = {
	countryCode : {
		name:"区编号",
		attr:"countryCode"
	},
	townCode :{
		name:"乡镇编号",
		attr:"townCode"
	},
	townName:{
		name:'乡镇名',
		attr:'townName'
	},
	villageName:{
		name:'村名',
		attr:"villageName"
	},
	mainReason:{
		name:'主要致贫原因',
		attr:"mainReason",
	},
	otherReason:{
		name:'其他致贫原因',
		attr:'otherReason'
	},
	phoneNumber:{
		name:'联系号码',
		attr:'phoneNumber'
	},
	outPoorYear:{
		name:'脱贫年限',
		attr:'outPoorYear'
	},
	minimumFund:{
		name:'低保金',
		attr:'minimumFund'
	},
	fiveFund:{
		name:'五保金',
		attr:'fiveFund'
	},
	oldAgeFund:{
		name:'养老保险金',
		attr:'oldAgeFund'
	},
	sellIncome:{
		name:'家庭经营性收入',
		attr:'sellIncome'
	},
	salaryIncome:{
		name:'务工收入',
		attr:'salaryIncome'
	},
	averageFund:{
		name:'人均纯收入',
		attr:'averageFund'
	},
	poorFamilyMember:{
		name:'家庭成员',
		attr:'poorFamilyMember'
	},
	peopleCode:{
		name:'人编号',
		attr:'peopleCode'
	},
	name:{
		name:'贫困户姓名',
		attr:'name'
	},
	sex:{
		name:'性别',
		attr:'sex'
	},
	idNumber:{
		name:'身份证号码',
		attr:'idNumber'
	},
	birthday:{
		name:'出生日期',
		attr:'birthday'
	},
	familyRelation:{
		name:'与户主关系',
		attr:'familyRelation'
	},
	education:{
		name:'文化程度',
		attr:'education'
	},
	grade:{
		name:'年级',
		attr:'grade'
	},
	workSkills:{
		name:'劳动技能',
		attr:'workSkills'
	},
	workMonth:{
		name:'务工时间',
		attr:'workMonth'
	},
	healthInfo:{
		name:'健康状况',
		attr:'healthInfo'
	},
	numerType:{
		name:'证件类型',
		attr:'numerType'
	}
};*/

var constMap = require('./constMap');
var CONST = constMap.getCONST();
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
		questions:[40,43,44,45,49,50,51,53,54,58,59,60,61,66]
	}
};

var questionType = {
	'40':{
		attr:'idNumLengthErr',
		name:'证件号码长度异常',
		check : function(poorFamily){
			var thisQues = this;
			poorFamily.poorFamilyMember.forEach(function(poor,key){
				var idNumber = poor.idNumber,
					idLength = idNumber.length;

				if((idLength!=15) && (idLength!=18) && (idLength!=20) ){
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
				var result = [];
				result.push(poorFamily.townName);
				result.push(poorFamily.villageName);
				result.push(poorFamily.poorFamilyMember[0].name);
				result.push(poorFamily.poorFamilyMember[0].idNumber);
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
				var result = [];
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
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
				var result = [];
				result.push(poorFamily.townName);
				result.push(poorFamily.villageName);
				result.push(poorFamily.poorFamilyMember[0].name);
				result.push(poorFamily.poorFamilyMember[0].idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poorFamily.poorFamilyMember[0].name);
					result.push(poorFamily.poorFamilyMember[0].idNumber);
					
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poorFamily.poorFamilyMember[0].name);
					result.push(poorFamily.poorFamilyMember[0].idNumber);
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
				var result = [];
				result.push(poorFamily.townName);
				result.push(poorFamily.villageName);
				result.push(poorFamily.poorFamilyMember[0].name);
				result.push(poorFamily.poorFamilyMember[0].idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
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
					var result = [];
					result.push(poorFamily.townName);
					result.push(poorFamily.villageName);
					result.push(poor.name);
					result.push(poor.idNumber);
					result.push(constMap.getValue(CONST.healthInfo.attr,healthInfo));
					thisQues.results.push(result);
				}
			});
		},
		results:[[CONST.townName.name,CONST.villageName.name,CONST.name.name,CONST.idNumber.name,CONST.healthInfo.name]]
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