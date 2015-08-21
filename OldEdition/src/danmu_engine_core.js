/*!
 *弹幕引擎核心
 *
 * Copyright 2015 by Liyawei Of AcGit.cc 
 * @license MIT
 */



;(function( $ ){


 var Danmu= function (element, options) {
    this.$element	= $(element);  
    this.options	= options;
    $(element).data("nowtime",0);
    $(element).data("danmu_array",options.danmuss);
    $(element).data("opacity",options.opacity);
    $(element).data("paused",1);
    $(element).data("topspace",0);
    $(element).data("bottomspace",0);


    this.$element .css({
		"position":"absolute",
		"left":this.options.left,
		"top":this.options.top,
		"width":this.options.width,
		"height":this.options.height,
		"z-index":this.options.zindex,
		"color":options.default_font_color,
		"overflow":"hidden"
	});
    var heig=this.$element.height();
	var row_conut=parseInt(heig/options.font_size_big);
	var rows_used=new Array();

	$("<div class='timer71452'></div>").appendTo(this.$element );
	this.$timer=$(".timer71452");
	this.$timer.timer({
		delay: 100,
		repeat: options.sumtime,
		autostart: false,
		callback: function( index ) {
			heig=$(element).height();
			//row_conut=parseInt(heig/options.font_size_big);
			if($(element).data("danmu_array")[$(element).data("nowtime")]){
				var danmus=$(element).data("danmu_array")[$(element).data("nowtime")];
				for(var i=0;i<danmus.length;i++){
					var a_danmu="<div class='flying flying2' id='linshi'></div>";
					$(element).append(a_danmu);
					$("#linshi").text(danmus[i].text);
					$("#linshi").css({
						"color":danmus[i].color
						,"text-shadow":" 0px 0px 2px #000000"
						,"-moz-opacity":$(element).data("opacity")
						,"opacity": $(element).data("opacity")
						,"white-space":"nowrap"
						,"font-weight":"bold"
						,"font-family":"SimHei" 
						,"font-size":options.font_size_big
					});
					if (danmus[i].color<"#777777")
						$("#linshi").css({
							"text-shadow":" 0px 0px 2px #FFFFFF"
						});
					if (danmus[i].hasOwnProperty('isnew')){
						$("#linshi").css({"border":"2px solid "+danmus[i].color});
					}
					if( danmus[i].size == 0)  $("#linshi").css("font-size",options.font_size_small);
					if  ( danmus[i].position == 0){
						//var top_local=parseInt(30+(options.height-60)*Math.random());//随机高度
						var row = parseInt(row_conut*Math.random());
						while (rows_used.indexOf(row)>=0 ){
							var row = parseInt(row_conut*Math.random());
						}
						rows_used.push(row);
						//console.log(rows_used.length);
						if (rows_used.length==row_conut){
							rows_used =new Array();
							row_conut=parseInt(heig/options.font_size_big);
						}
						var top_local=(row)*options.font_size_big;

						$("#linshi").css({"position":"absolute"
										,"top":top_local
										,"left":options.width
										 });
						var fly_tmp_name="fly"+parseInt(heig*Math.random()).toString();	
						$("#linshi").attr("id",fly_tmp_name);
						$('#'+fly_tmp_name).animate({left:-$(this).width()*3,},options.speed
							,function(){$(this).remove();}	
						 );
					}
					else if ( danmus[i].position == 1){
						var top_tmp_name="top"+parseInt(10000*Math.random()).toString();
						$("#linshi").attr("id",top_tmp_name)
						$('#'+top_tmp_name).css({
							"width":options.width
							,"text-align":"center"
							,"position":"absolute"
							,"top":(5+$(element).data("topspace"))
								 });
						 $(element).data("topspace",$(element).data("topspace")+options.font_size_big);
						$('#'+top_tmp_name).fadeTo(options.top_botton_danmu_time,$(element).data("opacity"),function(){
							$(this).remove();
							$(element).data("topspace",$(element).data("topspace")-options.font_size_big);
						}
						);						
					}
					else if ( danmus[i].position == 2){
						var bottom_tmp_name="top"+parseInt(10000*Math.random()).toString();
						$("#linshi").attr("id",bottom_tmp_name)
						$('#'+bottom_tmp_name).css({
							"width":options.width
							,"text-align":"center"
							,"position":"absolute"
							,"bottom":0+$(element).data("bottomspace")
								 });
						$(element).data("bottomspace",$(element).data("bottomspace")+options.font_size_big);
						$('#'+bottom_tmp_name).fadeTo(options.top_botton_danmu_time,$(element).data("opacity"),function(){
							$(this).remove();
							$(element).data("bottomspace",$(element).data("bottomspace")-options.font_size_big)
						}
						);
						
					} //else if
				}   // for in danmus
			}  //if (danmus)
				$(element).data("nowtime",$(element).data("nowtime")+1);
			
			
		}
	});		  
};


Danmu.DEFAULTS = {
		left: 0,    
		top: 0 , 
		height: 360,
		width: 640,
		zindex :100,
		speed:20000,
		sumtime:65535	,
		danmuss:{},
		default_font_color:"#FFFFFF",
		font_size_small:16,
		font_size_big:24,
		opacity:"0.9",
		top_botton_danmu_time:6000
	}



Danmu.prototype.danmu_start = function(){	
	this.$timer.timer('start');
	this.$element.data("paused",0);
};

Danmu.prototype.danmu_stop = function(){
	this.$timer.timer('stop');
	$('.flying').remove();
	nowtime=0;
	this.$element.data("paused",1);
	this.$element.data("nowtime",0);
};


Danmu.prototype.danmu_pause = function(){
	this.$timer.timer('pause');
	$('.flying').pause();
	this.$element.data("paused",1);
};


Danmu.prototype.danmu_resume = function(){
	this.$timer.timer('resume');
	$('.flying').resume();
	this.$element.data("paused",0);
};

Danmu.prototype.danmu_hideall= function(){
	$('.flying').css({"opacity":0});

};

Danmu.prototype.add_danmu = function(arg){
	if(this.$element.data("danmu_array")[arg.time]){
		this.$element.data("danmu_array")[arg.time].push(arg);
	}
	else{
		this.$element.data("danmu_array")[arg.time]=new Array();
		this.$element.data("danmu_array")[arg.time].push(arg);
	}

};

	
function Plugin(option,arg) {
    return this.each(function () {
      var $this   = $(this);
      var options = $.extend({}, Danmu.DEFAULTS, typeof option == 'object' && option);
      var data    = $this.data('danmu');
      var action  = typeof option == 'string' ? option : NaN;
      if (!data) $this.data('danmu', (data = new Danmu(this, options)))
      if (action)	data[action](arg);  
    })
};


$.fn.danmu             = Plugin;
$.fn.danmu.Constructor = Danmu;


})(jQuery);