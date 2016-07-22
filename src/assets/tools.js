//求一组数的最大数；
//参数：一组数（数组）;
//返回值：最大数；
function maxNumFromArr(arr){
	var max=arr[0];//最大数;
	for(var i=1;i<arr.length;i++){
		if(arr[i]>max){
			max = arr[i];
		}
	}
	return max;
}
	
//判断一个数组是不是回文数组

//参数：数组;
//返回：true：是回文数组；false：不是回文数组；

function huiwen(arr){
	//var isHui = true;//假定是回文数
	for(var i=0;i<parseInt(arr.length/2);i++){
		if(arr[i]!=arr[arr.length-1-i]){
		//	isHui = false;
		//	break;
			return false;//return语句会结束函数；
		}
	}
	//return isHui;
	return true;
}

//请将数组中的元素循环右移k位

//参数：
//arr : 一组数；
//k :移动的位数；
//返回值：新的数组（右移k位后的数组）

function circleRightMove(arr,k){
	for(var j=0;j<k;j++){
		//2、逻辑部分
		//2.1 把最后一个元素保存起来
		var temp = arr[arr.length-1];
		//2.2循环右移
		for(var i=arr.length-1;i>0;i--){
			arr[i] = arr[i-1];
		}
		//2.3把第一步保存的元素（最后一个元素）赋给第一个元素；
		arr[0] = temp;
	}
	return arr;
}
		


//冒泡排序：
//参数：一组数
//返回值：排好序的数组

function bubble(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				var temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr;
}


//插数:有一个已经排好序的数组。现输入一个数，要求按原来的规律将它插入数组中。

//已知12,23,34,45,56,;  插入 38；12,23,34,38,45,56


//思路：12,23,34,45,56 插入 38
//1、找位置  发现38应该插在下标为3的位置
//2、把下标为3开始朝后的所有的数右移；12,23,34,45,45，56
//3、放数：把38放在下标为3的位置  12,23,34,38,45，56
function circleRightMove(){
	//1、定义一个数组；
	var arr = new Array(6);
	arr[0] = 12;
	arr[1] = 23;
	arr[2] = 34;
	arr[3] = 45;
	arr[4] = 56;

	var k = 38;
	//2、逻辑部分
	//思路：12,23,34,45,56 插入 38
		//2.1、找位置  发现38应该插在下标为3的位置
		for(var i=0;i<arr.length-1;i++){
			if(arr[i]>k){
				break;
			}
		}//2.2、把下标为3开始朝后的所有的数右移；12,23,34,45，56, ； 即把45 和56 朝右移；
		for(var j=arr.length-2; j>=i;j--){
			arr[j+1] = arr[j];
		}
		//2.3、放数：把38放在下标为3的位置  12,23,34,38,45，56
		arr[i]  = k;

	//3、显示结果
	for(var i in arr){
		document.write(arr[i]+",");
	}
}


//插数:有一个已经排好序的数组。现输入一个数，要求按原来的规律将它插入数组中。
//参数：
//arr:数组
// num :要插入的数;
//返回值：新数组（插入后的数组）
//思路：12,23,34,45,56 插入 38
//1、找位置  发现38应该插在下标为3的位置
//2、把下标为3开始朝后的所有的数右移；12,23,34,45,45，56
//3、放数：把38放在下标为3的位置  12,23,34,38,45，56
function insertNum(arr,num){
	var arrNew = new Array(arr.length+1);
	
	var index = 0;//原数组的下标
	var isInsert = false;//要插入的数是否已经插入；
	
	while(index<arr.length){
		if(arr[index]<num){
			arrNew[index] = arr[index];
			index++;
		}else{
			if(isInsert==false){
				arrNew[index] = num;
				isInsert = true;
			}else{
				arrNew[index+1] = arr[index];
				index++;
			}
		}
	}
	return arrNew;
}


//选择法;
//参数：数组；
//返回值：排好序的数组;

function selectSort(arr){
	
	for(var i=0;i<arr.length-1;i++){
		//1、找出最小的数的下标;
		var minIndex = i;
		for(var j=i+1;j<arr.length;j++){
			if(arr[j]<arr[minIndex]){
				minIndex=j;
			}
		}
		//2、把找到的位置对应的数交换到开始（i对应位置）
		var temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	
	return arr;
}

//折半查找法（二分法）
//参数：
// arr：一组数
// num：要查找的数；
//返回值：找到的位置； -1：表示没有找到；
function binarySearch(arr,num){
	var low = 0;
	var hig = arr.length-1;//最大下标；
	var mid = parseInt((low+hig)/2);
	
	while(low<=hig){
		if(num==arr[mid]){
			return mid;
		}else if(num<arr[mid]){
			hig = mid-1;
		}else{
			low = mid+1;
		}
		mid = parseInt((low+hig)/2);
	}
	
	return -1;
}

//日期函数的封装----------------------------------------------

//格式化：（日期格式化：就把日期按照指定的格式表示）
//功能：把日期转换成指定格式的字符串形式；
//参数：日期：
//返回值：字符串；
function convertToStr(d){
	var str = "";
	var year = d.getFullYear();
	str+=year+"年";
	var month = d.getMonth();
	str+=(month+1)+"月";
	var date = d.getDate();
	str+=date+"日";
	var day = d.getDay();
	str+=convertToWeek(day)+" "
	
	var hours = d.getHours();
	str+=hours+":";
	
	var minutes = d.getMinutes();
	str+=minutes+":";
	var seconds = d.getSeconds();
	str+=seconds;
	return str;
}

function convertToWeek(num){
	switch(num){
		case 0: return "周天";
		case 1: return "周一";
		case 2: return "周二";
		case 3: return "周三";
		case 4: return "周四";
		case 5: return "周五";
		case 6: return "周六";
	}
}


//将日期格式化为 “2015-08-24”
//根据日期和分隔符来把日期格式化为对应的格式（用分隔符把日期不同部分进行分割），如果没有分隔符，则用汉字的方式（如：2015年8月24日）
//把日期转换为字符串；
function dateToStr(date){
	if(arguments.length==1){
		return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	}else if(arguments.length==2){
		var sper = arguments[1];
		return date.getFullYear()+sper+(date.getMonth()+1)+sper+date.getDate();
	}
}

//获得某个月份的天数
//参数：年月
//返回值：天数（根据年月所求的天数）
//2015  11
//2015-12-1  减去  2015-11-1
//Date.parse();
function getDaysByYearMonth(year,month){
	var d1 = new Date();
	d1.setFullYear(year);
	d1.setMonth(month-1);
	d1.setDate(1);
	
	var d2 = new Date();
	d2.setFullYear(year);
	d2.setMonth(month);
	d2.setDate(1);
	
	return parseInt((d2.getTime()-d1.getTime())/(24*3600*1000));
	
}


//将字符串转换为日期
//如：已知"2015-8-25"或者 2015/8/25 结果 日期型的变量； 
//参数：
//str: 日期的字符串形式 如："2015-8-25"或者 "2015/8/25" 等等
//sper :分隔符:如： "-" 或者 "/" 等
function strToDate(str,sper){
	var arr = str.split(sper);
	
	var d = new Date();
	d.setFullYear(arr[0]);
	d.setMonth(parseInt(arr[1])-1);
	d.setDate(arr[2]);
	
	return d;
	
}

//判断两个日期相差的天数
function different(d1,d2){
	return (d1.getTime()-d2.getTime())/(24*3600*1000);
}


//获得N天以后的日期
//参数：

function afterDay(num){
	var d = new Date();
    var dNew =  afterDayBaseDate(d,num);
	return dNew;
}

//跟某个指定的日期加上天数；

function afterDayBaseDate(d,days){
	//return d.setTime(d.getTime()+days*24*3600*1000);
	return d.setDate(d.getDate()+days);
}

//节点的函数封装--------------------------------------	
	
//假设孩子节点集合中，除了元素节点外，都是无效的。
//已知条件：孩子节点集合;
//返回值：孩子节点集合；
function removeBlankNode(subNodes){
	var arr = [];
	for(var i=0;i<subNodes.length;i++){
		if(subNodes[i].nodeType==1){
			arr.push(subNodes[i]);
		}
	}
	return arr;
}


//封装一个获得标签对象的函数；
//传入 "#divId"；则找id=“divId”的元素。
//传入 "str" 则找 name="str"的元素；
//传入 ".str" 则找 class ="str" 的元素；

/*function $(str){
	if(str.indexOf("#")==0){
		return document.getElementById(str.substring(1));
	}else if(str.indexOf(".")==0){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByName(str);
	}
}*/

//事件函数封装--------------------------------------------


//获得绝对位置的x坐标
//参数：事件对象event
//返回值：X坐标（字符串）
function getX(e){
	 var leftX = (e.clientX+(document.documentElement.scrollLeft ||  document.body.scrollLeft))+"px";
	 return leftX;
}

//获得绝对位置的y坐标
//参数：事件对象event
//返回值：Y坐标（字符串）
function getY(e){
	var topY = (e.clientY+(document.documentElement.scrollTop ||  document.body.scrollTop))+"px";
	 return topY;
}


//阻止事件的默认行为(解决浏览器兼容问题)
//参数：事件对象
function stopEvent(e){
	var str = window.navigator.userAgent;
	if(str.indexOf("IE")>0){//IE
		e.returnValue = flase;
	}else{//非IE
		e.preventDefault();
	}
}

//事件冒泡
//参数:event
function eventBubble(e){
	if(isIE()){
		window.event.cancelBubble=true;
	}else{
		event.stopPropagation();
	}
}

//
function getEvent(){
	if(isIE()){
		return event;
	}else{
		return window.event;
	}
}

//判断浏览器是否为IE
//返回值：true为IE，false不为IE	
function isIE(){
	var str = window.navigator.userAgent;
	if(str.indexOf("IE")>0){//IE
		return true;
	}else{//非IE
		return false;
	}
}

//事件监听
//参数一：事件源，参数二：事件类型，参数三：函数,参数四：是否冒泡
//添加监听器
function addEvent(obj,eventType,funcName,isBubble){
	if(isIE()){//IE
		obj.attachEvent("on"+eventType,funcName);
	}else{//非IE
		obj.addEventListener(eventType,funcName,isBubble);
	}
}

//删除监听器
function removeEvent(obj,eventType,funcName,isBubble){
	if(isIE()){//IE
		obj.detachEvent("on"+eventType,funcName);
	}else{//非IE
		obj.removeEventListener(eventType,funcName,isBubble);
	}
}

//cookie函数封装------------------------------------------
//添加cookie;
//参数：
//键
//值
//有效期（整数），单位是天；
//返回值：无
function saveCookie(key,value,count){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+count);//加5天
	document.cookie = encodeURIComponent(key+"="+value+";expires="+exdate.toGMTString());
}

//获取cookie
//参数：
//键
//返回值：键对应的值；

function getCookie(key){
	//1、获取cookie字符串
	var cookieStr = decodeURIComponent(document.cookie); "key=a; username=jzm; pass=123; _asdf"
	//2、转成数组
	var cookieArr = cookieStr.split("; ");
	//3、循环数组，从数组中找到对应的元素，对元素截取；
	for(var i=0;i<cookieArr.length;i++){
		if(cookieArr[i].indexOf(key+"=")==0){
			return cookieArr[i].substring(key.length+1);
		}
	}
	return null;//如果给的键不存在，就返回null。
}

//删除cookie;
//参数：
//键；
//返回值：true：删除成功！false：没有该键，所以，删除失败；
function removeCookie(key){
	//1、查找
	if(getCookie(key)!=null){
		//2、如果找到，就删除（就可以调用saveCookie）
		saveCookie(key,"abc",-5);
		return true;
	}
	return false;
}

//修改：
//参数：
//键；
//值；
//有效期（整数），单位是天；
//返回值：如果键存在（则能修改成功），返回true；如果键不存在，相当于修改失败，返回false；
function modifyCookie(key,value,count){
	//1、查找
	if(getCookie(key)!=null){
		//2、如果找到，就修改（就可以调用saveCookie）
		saveCookie(key,value,count);
		return true;
	}
	return false;
}

//正则表达式的操作--------------------------------------------
//去掉字符串中的空格
//参数一：字符串
//返回值：字符串
function trim(str){
	return str.replace(/ /g,"");	
}

//去掉字符串中的首尾空格
//参数一：字符串
//返回值：字符串
function trim(str){
	return str.replace(/^\s+|\s+$/g,"");	
}

//将字符串中非中文的字符变成任意符号
//参数一：字符串,参数二：符号（可选）
//返回值：字符串
function notCnChangeStar(str){
	if(arguments.length==1){
		return str.replace(/[^\u4e00-\u9fa5]/g,"");
	}else if(arguments.length==2){
		var cha = arguments[1];
		return str.replace(/[^\u4e00-\u9fa5]/g,cha);
	}
}


//随机函数的封装----------------------------

//获取随机数
//参数一：最小值，参数2：最大值
//返回值：参数一到参数二范围之间的一个随机数
function randomNum(min,max){
	var num = Math.floor(Math.random()*(max-min+1)) + min;
	return num;
}

//获取随机颜色
//返回值：随机的颜色
function randomColor(){
	var color = 'rgb('+randomNum(0,255)+','+randomNum(0,255)+','+randomNum(0,255)+')';
	return color;
}














	