$(function(){
	var $header_left = $(".header_left");//头部左边ul
	var $nav_left = $(".nav_left");//导航栏左边ul
	var $phone_app = $(".phone_app");//头部手机二维码
	var $nav_second_menu = $(".nav_second_menu");//导航栏二级菜单
	var $menu_con_imgBox = $(".menu_con_imgBox");//产品图片容器
	var $pro_menu_left = $(".pro_menu_left");//活动的容器
	var $week_activities = $(".week_activities");//本周活动
	var $week_nav = $(".week_nav");//星期的导航

	$header_left.find("li").first().find("a").css({"color":"#f00"});
	$nav_left.find("li").first().find("a").css({"color":"#f00"});


	//头部手机App的二维码显示隐藏
	var $header_right_a = $phone_app.find("a");
	$header_right_a.hover(function(){
		$(this).next("div").show();
	},function(){
		$(this).next("div").hide();
	});

	//让导航栏左边的ul中的a在hover的时候显示隐藏的二级菜单
	var $nav_left_a = $nav_left.find("a");
	$nav_left_a.hover(function(){
		//console.log(this);
		$(this).next(".nav_second_menu").show();
	},function(){
		$(this).next(".nav_second_menu").hide();
	});

	//让导航栏左边的ul中的二级菜单在hover的时候显示
	$nav_second_menu.hover(function(){
		//console.log(this);
		$(this).css({"display":"block"});
	},function(){
		$(this).css({"display":"none"});
	});

	//当鼠标放在产品图片上的时候放大图片，显示遮罩层
	$menu_con_imgBox.hover(function(){
		$(this).find(".img_mask").show();
		$(this).find("img").stop().animate({
			"width":340,
			"height":212,
			"margin":-10
		});
	},function(){
		$(this).find(".img_mask").hide();
		$(this).find("img").stop().animate({
			"width":320,
			"height":192,
			"margin":0
		});
	});


	//把即将推出的活动中不是当前日期的活动隐藏，当前日期的活动显示
	$pro_menu_left.find(".week_activities").first().show().siblings(".week_activities").hide();


	//处理模块“即将推出活动”的导航列表动态显示星期几
	var myDate = new Date();
	//将第一个li的span值赋成“明天”
	var $week_nav_first = $week_nav.find(".week_nav_first");
	$week_nav_first.find("span").html("明天");
	//其余li的span赋值
	var $week_nav_notLi = $week_nav.find("li").not(".week_nav_first");
	$week_nav_notLi.each(function(idx){
		$(this).find("span").html(convertToWeek((myDate.getDay()+idx+2)%7));
	})
	//处理点击导航后内容显示的更替
	var $week_nav_li = $week_nav.find("li");
	var $week_nav_span = $week_nav_li.find("span");
	var $week_activities = $(".week_activities");
	$.each($week_nav_span,function(idx){
		var ele = $(this);
		var index = idx;
		$(this).on("click",function(){
			$week_activities.each(function(idx){
				if(index==idx){
					ele.parent().css({"borderBottom":"4px solid #000"}).siblings("li").css({"border":"none"});
					$(this).show().siblings(".week_activities").hide();
				}
			})
		})
	});

	
});