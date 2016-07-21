$(function(){
	$header_left = $(".header_left");//头部左边ul
	$nav_left = $(".nav_left");//导航栏左边ul
	$phone_app = $(".phone_app");//头部手机二维码
	$nav_second_menu = $(".nav_second_menu");//导航栏二级菜单

	$header_left.find("li").first().find("a").css({"color":"#f00"});
	$nav_left.find("li").first().find("a").css({"color":"#f00"});


	//头部手机App的二维码显示隐藏
	var $header_right_a = $phone_app.find("a");
	$header_right_a.hover(function(){
		$(this).next("div").css({"display":"block"});
	},function(){
		$(this).next("div").css({"display":"none"});
	});

	//让导航栏左边的ul中的a在hover的时候显示隐藏的二级菜单
	var $nav_left_a = $nav_left.find("a");
	$nav_left_a.hover(function(){
		//console.log(this);
		$(this).next(".nav_second_menu").css({"display":"block"});
	},function(){
		$(this).next(".nav_second_menu").css({"display":"none"});
	});

	//让导航栏左边的ul中的二级菜单在hover的时候显示
	$nav_second_menu.hover(function(){
		//console.log(this);
		$(this).css({"display":"block"});
	},function(){
		$(this).css({"display":"none"});
	});
});