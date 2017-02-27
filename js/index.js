
// 动画，是一个图标 slideUp()
// 每一个li的位置都是relative，动画图标position：absolute
// li.onmouseover = function () {
// 	icon.slideUp();
// }

$(function(){
	// 鼠标不滑过时banner动画自动播放，鼠标滑过时停止播放，对应hover(fun1, fun2);
	//   fun1 逐个显示图片，index==len时index设置为0循环 setInterval
	// 下方5个小圆点，鼠标悬停在其上时分别显示对应index的图片，并停止动画
	// 
	var addTimer = null;
	var index = 0;
	var $banner_wrapper = $(".banner_wrapper");
	var $banner_li = $banner_wrapper.find("li");
	var $span_all = $banner_wrapper.find("div").children("span");
	var len = $span_all.length;
	console.log("all span: " + len);
	function showImg(index) {
		$banner_li.eq(index).fadeIn().siblings().fadeOut();
		$span_all.eq(index).css("backgroundColor", "#fff").siblings().css("backgroundColor", "#999");
		console.log("index: " + index);
	}
	$span_all.mouseover(function () {
		var i = $span_all.index(this);
		showImg(i);
	});
	$banner_wrapper.hover(function () {
		if (addTimer) {
			clearInterval(addTimer);
		}
	}, function () {
		addTimer = setInterval(function () {
			showImg(index);
			index++;
			if (index == len) { index = 0; }
		}, 5000);
	}).mouseleave();


	// 右侧的sidebar_right的li在鼠标悬停时出现p并向右移动至接触
	// 主页上的display商品在鼠标悬停时向左移动n个px
	function moveTo(elem,x_pos,x_final,y_pos,y_final,interval) {
		var left = parseInt(elem.style.left);
		var top = parseInt(elem.style.top);
		if (!left) { left = x_pos; }
		if (!top) { top = y_pos}
		if (x_pos==x_final && y_pos==y_final && elem.movement) {
			clearTimeout(elem.movement);
			return true;
		}
		if (x_pos < x_final) { x_pos ++; }
		if (x_pos > x_final) { x_pos --; }
		if (y_pos < y_final) { y_pos ++; }
		if (y_pos > y_final) { y_pos --; }
		elem.style.left = x_pos + "px";
		elem.style.top = y_pos + "px";
		elem.movement = setTimeout(function () {
			moveTo(elem,x_pos,x_final,y_pos,y_final, interval);
		}, interval);
	}
	var $sidebar_li = $(".sidebar_right li");
	$sidebar_li.hover(function () {
		var p = $(this).children('p')[0];
		p.style.position = "absolute";
		moveTo(p, -120, -80, -13, -13, 5);
	}, function () {
		var p = $(this).children('p')[0];
		p.style.position = "absolute";
		p.style.left = -120 + "px";
	});

	// 导航栏中的每个li在鼠标悬停时出现猫的动画上升
	var $nav_li = $('header nav>ul li');
	$nav_li.hover(function () {
		$(this).find('img').slideUp();
	}, function () {
		$(this).find('img').hide();
	});
	

});