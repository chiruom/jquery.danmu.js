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
   // alert($(element).data("danmu_array"));

    this.$element .css({
		"position":"absolute",
		"left":this.options.left,
		"top":this.options.top,
		"width":this.options.width,
		"height":this.options.height.toString()+"px",
		"z-index":this.options.zindex,
		"color":options.default_font_color,
		"font-family":"Microsoft YaHei" ,
		"font-size":options.font_size_small,
		"overflow":"hidden"
	});

	$("<div class='timer'></div>").appendTo(this.$element );
	this.$timer=$(".timer");
	this.$timer.timer({
		delay: 100,
		repeat: options.sumtime,
		autostart: false,
		callback: function( index ) {
			if($(element).data("danmu_array")[$(element).data("nowtime")]){
				var danmus=$(element).data("danmu_array")[$(element).data("nowtime")];
				for(var i=0;i<danmus.length;i++){
					var a_danmu="<div class='flying' id='linshi'></div>";
					$(element).append(a_danmu);
					$("#linshi").text(danmus[i].text);
					$("#linshi").css({
						"color":danmus[i].color
						,"text-shadow":" 2px 2px 2px #000000"
						,"-moz-opacity":$(element).data("opacity")
						,"opacity": $(element).data("opacity")
						,"white-space":"nowrap"
					});
					if( danmus[i].size == 1)  $("#linshi").css("font-size",options.font_size_big);
					if  ( danmus[i].position == 0){
						var top_local=parseInt(30+(options.height-60)*Math.random());//随机高度
						$("#linshi").css({"position":"absolute"
										,"top":top_local
										,"left":options.width
										 });
						var fly_tmp_name="fly"+parseInt(options.height*Math.random()).toString();	
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
		speed:5000,
		sumtime:65535	,
		danmuss:{},
		default_font_color:"#FFFFFF",
		font_size_small:24,
		font_size_big:28,
		opacity:"0.7",
		top_botton_danmu_time:4000
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
