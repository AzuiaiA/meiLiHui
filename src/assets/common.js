/*
	获取页面样式
		ele: 要获取样式的元素
		attr:要获取的css属性
 */
function getStyle(ele,attr){
	var res;
	if(window.getComputedStyle){
		// 支持getComputedStyle的浏览器
		res = getComputedStyle(ele)[attr];
	}else if(ele.currentStyle){
		// 支持IE8-的浏览器
		res = ele.currentStyle[attr];
	}else{
		res = ele.style[attr];
	}
	return res;
}

//测试驱动开发
//getStyle(div,'left');//100px

/*
	运动函数
		ele:要实现动画的元素对象
		attr:实现动画要改变的属性
		target:属性的目标值
 */
/*function animate(ele,attr,target){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		// 先获取当前值
		var initVal = parseInt(getStyle(ele,attr));
		var speed = (target - initVal)/10;console.log(initVal,speed)

		// 判断speed是负数还是正数
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		// 当前值与目标值相等时，清除定时器
		if(initVal == target){
			clearInterval(timer);
			ele.style[attr] = target + 'px';
			return;
		}
		ele.style[attr] = initVal + speed + 'px';
	},20);
}*/
//animate(ele,'width',500);
//
/*
	运动函数
		ele:要实现动画的元素对象
		opt:要改变的css属性
		callback:回调函数(动画执行完后再调用的函数)
 */

function animate(ele,opt,callback){
	// timerLen初始值
	if(ele.timerLen === undefined){
		ele.timerLen = 0;
	}

	// 遍历参数对象opt,为每一个属性建立一个定时器
	for(var attr in opt){
		// 开启定时器时，先清除之前的定时器
		if(ele[attr + 'timer']){
			clearInterval(ele[attr + 'timer']);
			ele[attr + 'timer'] = undefined;
			ele.timerLen--;
		}

		// 为每一个属性，设置一个定时器
		setTimer(attr);
	}
	//opt = {top:-960,opacity:0.3} ==> opt['top']:-960, opt['opacity']:0.3
	function setTimer(attr){console.log(ele.timerLen)
		ele.timerLen++;

		// 目标值
		var target = opt[attr];

		ele[attr + 'timer'] = setInterval(function(){
			// 先获取当前值
			var current = parseFloat(getStyle(ele,attr));
			var speed = (target - current)/10;

			// 单位，默认为像素
			var unit = 'px';

			// 判断speed是负数还是正数
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			// 针对opacity属性
			if(attr == 'opacity'){
				speed = speed > 0 ? 0.1 : -0.1;
				unit = '';
			}

			// 当前值与目标值相等时，清除定时器
			if(current == target){
				clearInterval(ele[attr + 'timer']);
				ele[attr + 'timer'] = undefined;
				ele.timerLen--;
				ele.style[attr] = target + unit;

				// 当ele.timerLen==0,所有定时器执行完毕
				// 所有动画完成后执行
				if(ele.timerLen == 0){
					if(typeof callback === 'function') callback();
				}
				
				return;
			}
			ele.style[attr] = current + speed + unit;
		},20);
	}
}


/*
	封装ajax请求
		1）简化ajax请求操作
		2）解决兼容性问题
		3）支持跨域JSONP请求
 */
function ajax(type,url,callback){
	if(type=='jsonp'){
		// 1)预设一个函数(全局函数)
		window.getData = function(data){
			// 回调函数
			if(typeof callback === 'function') callback(data);
		}

		var script = document.createElement('script');

		// 判断url内有没有?
		var wenhao = '?';
		if(url.indexOf('?') != -1){
			wenhao = '&';
		}
		script.src = url + wenhao + 'callback=getData';

		document.head.appendChild(script);
	}else{
		// 1）创建xhr对象
		var req = null;
		try{
			req = new XMLHttpRequest();
		}catch(err){
			try{
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(err){
				try{
					req = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(err){
					alert('你的浏览器太low了，这个世界不适合你');
					return;
				}
			}
			
		}

		// 4）处理数据
		req.onreadystatechange = function(){
			if(req.readyState == 4 && (req.status == 200 || req.status == 304)){
				var res = req.responseText;

				// 回调函数
				if(typeof callback === 'function') callback(res);
			}
		}

		// 2)建立与服务器的连接
		req.open(type,url,true);
		// 3)发送请求
		req.send(null);
	}
}
// ajax('get','region.json',function(data){console.log(data)})
// ajax('post','http://localhost:3000/ajax/football?pageNo=1',20)
// ajax('jsonp','http://localhost:3000/ajax/football?pageNo=1',function(){})
// 


// 封装对象的创建
function createObject(name,age,gender){
	var o = {};
	o.name= name;
	o.age = age;
	o.gender = gender;
	return o;
}
// var p1 = createObject('宋小宝',40,'男');
// var p2 = createObject('小沈阳',36,'男');
// var p3 = createObject('赵四',46,'男');
// var p4 = createObject('刘能',36,'男');

/*
	复制对象（扩展对象）
	extend(obj1,obj2,deep)
	obj1:要扩展（复制）的对象
	obj2:被扩展的对象
	deep:是否深度拷贝
 */
function extend(obj1,obj2,deep){
	// 如果只传入一个参数，则为赋值
	if(obj2 === undefined){
		var o = {};
		for(var attr in obj1){
			o[attr] = obj1[attr];
		}
		return o;
	}

	// 如果只传入两个参数，则为扩展obj1
	// 遍历obj2
	for(attr in obj2){
		// 深度拷贝
		if(deep){
			if(typeof obj2[attr] == 'object'){
				var arr = [];
				for(var name in obj2[attr]){
					arr.push(obj2[attr][name]);
				}
				if(typeof obj1[attr] == 'object'){
					obj1[attr] = obj1[attr].concat(arr);
				}else{
					obj1[attr] = arr;
				}
				
			}else{
				obj1[attr] = obj2[attr];
			}
			
		}else{
			obj1[attr] = obj2[attr];
		}
	}
	return obj1;
}
//extend({name:'xxx',age:18,hobby:['旅游','看电影']},{age:30,gender:'男',hobby:['篮球','足球']});
// {name:'xxx',age:30,gender:'男'}
// extend({name:'唐僧',fahao:'玄奘'})//复制一份

/*
	获取随机整数
 */
function getRandomNum(min,max){
	return Math.floor(Math.random()*(max - min + 1)) + min
}
// getRandomNum(10,20);//10,11,20


// 获取随机颜色
function getRandomColor(){
	// r:0-255,g:0-255;b:0-255
	// #fff600;
	// '0123456789abcdef';
	var r = getRandomNum(0,255);
	var g = getRandomNum(0,255);
	var b = getRandomNum(0,255);
	return 'rgb('+r+','+g+','+b+')';
}

/*
	数据类型的判断
	原理：利用call方法，借用Object.prototype.toString
 */
function type(data){
	var str = Object.prototype.toString.call(data);//"[object Number]"

	// 字符串截取
	return str.slice(8,-1).toLowerCase();//number
}
// type([]) ==> 'array'
// type(null) ==> 'null'
// type(10) ==> 'number'


/*
	获取页面元素
		document.getElementById() ==> #box
		getElementsByClassName(); ==> .content
		getElementsByTagName(); ==> h1,div,i,blockquote
		getElementsByName(); ==> 随意

		document.querySelector();
		document.querySelectorAll();
 */
function $(selector){
	if(document.querySelectorAll){
		var res = document.querySelectorAll(selector);
		if(res.length == 1){
			res = res[0];
		}
		return res;
	}else{
		// ID:是否以#开头
		if(/^#/.test(selector)){
			return document.getElementById(selector.substr(1));
		}else if(/^\./.test(selector)){
			return document.getElementsByClassName(selector.substr(1));
		}else{
			// 优先获取tagName
			var res
			if(/[a-zA-Z][a-zA-Z\d]*/.test(selector)){
				res = document.getElementsByTagName(selector);
			}
			
			// 如果res为[]，则说明传入的是name
			if(res.length == 0){
				res = document.getElementsByName(selector);
			}

			return res;
		}
	}
	
}
//$('#box'),$('div#box')
//$('.content'),$('div.content div li')
//$('div')
//$('username'),$('h2h')