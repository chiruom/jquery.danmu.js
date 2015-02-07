# danmu
jQuery弹幕插件，Web前端弹幕插件。

完整文档及Demo地址：http://www.liyawei.cn/danmu/

<h3>简介<h3>

本插件实现弹幕功能，就如某些视频网站上的弹幕功能一样，只不过国内大多数视频网站是用flash实现的，而本插件通过jQuery。
就如绝大多数视频网站的弹幕功能，私也实现了彩色弹幕，顶端弹幕及底端弹幕，也可以即时操控弹幕透明度。当然也可以在弹幕运行的过程中暂停和继续。
欣赏一个例子：

发弹幕:
弹幕显示:

<h3>用法</h3>

    不用多说，第一步要引入js文件，因为本插件依赖于jquery.plugin、jquery.timer、jquery.pause。所以要把它们和jQuery还有jquery.danmu.js一起引用。


     <script language="javascript" type="text/javascript" src="danmu/jquery-1.11.1.min.js"></script> 

     <script language="javascript" type="text/javascript" src="danmu/jquery.plugin.js"></script> 

     <script language="javascript" type="text/javascript" src="danmu/jquery.timer.js"></script> 

     <script language="javascript" type="text/javascript" src="danmu/jquery.pause.js"></script>

      <script language="javascript" type="text/javascript" src="danmu/jquery.danmu.js"></script>

    插件中定义了弹幕对象，意指具体某一条弹幕及起信息，对象名字叫”danmu”,该对象有如下属性：
    text——弹幕文本内容。
    color——弹幕颜色。 position——弹幕位置 “0”为滚动 “1” 为顶部 “2”为底部
    size——弹幕文字大小。 “0”为小字 ”1”为大字
    time——弹幕所出现的时间。 单位为”分秒“（及1/10秒，100毫秒）
    例如：

     var a_danmu={ "text":"2333333" , "color":"green" ,"size":"1","position":"0","time":60}; 

    另外，为提高效率，插件另外定义了一种名为danmuss的对象，意指所有弹幕的集合，这个对象在每个弹幕屏中是唯一的。插件在运行时会把每个danmu对象写入danmuss对象，然后在相应的时间把某条弹幕放映于屏幕。dammuss对象每个属性的名称为弹幕所出现的时间点(分秒)，属性值为该时间点所出现的所有弹幕的danmu对象(没有time属性)所组成的数组。
    例如：

    var danmuss={ 1:[ { "text":"hahahaha" , "color":"red" ,"size":"0","position":"0"}, 
    { "text":"233333" , "color":"red" ,"size":"0","position":"2"} ],
     3:[ { "text":"poi" , "color":"red" ,"size":"1","position":"1"}, 
    { "text":"2333" , "color":"#FFFFFF" ,"size":"0","position":"0"} ],
     50:[ { "text":"XXX真好" , "color":"#FFFFFF" ,"size":"0","position":"2"}, ] };

    要在屏幕中插入弹幕，首先需要划定一个区域，使用<div>。
    例如现在创建一个id=”danmu”的div作为弹幕将要飞过的区域 <div id="danmu"> </div>
    然后调用插件方法，传递配置属性即可


        ("#danmu").danmu({
     
    left: 0, //区域的左边边界位置，相对于父div 

    top: 0 , //区域的上边边界位置，相对于父div 

    height: 360, //区域的高度 width: 640, //区域的宽度 

    zindex :100, //div的css样式zindex

    speed:5000, //弹幕速度，飞过区域的毫秒素 

    sumtime:900 , //弹幕运行总时间
     
    danmuss:{}, //danmuss对象，运行时的弹幕内容 

    default_font_color:"#FFFFFF", //弹幕默认字体颜色 

    font_size_small:24, //小号弹幕的字体大小,注意此属性值只能是整数

    font_size_big:28, //大号弹幕的字体大小 

    opacity:"0.7", //弹幕默认透明度 

    top_botton_danmu_time:4000 //顶端底端弹幕持续时间 } );

    所有属性都不是必须指定，默认值就如上。
    当不指定danmuss时，也可以在调用此方法后用

    $('#danmu').danmu("add_danmu",新弹幕对象)

    ;逐一添加danmu对象。
    当然在弹幕运行的过程中，可以随时用

    $('#danmu').danmu("add_danmu",新弹幕对象); 

    添加弹幕。

    做完以上准备后，可以使弹幕在该区域开始运行，调用

    $('#danmu').danmu('danmu_start'); 

    即可运行。
    其他方法：
    暂停弹幕：

    $('#danmu').danmu('danmu_pause'); 

    暂停后继续：

    $('#danmu').danmu('danmu_resume'); 

    停止弹幕：

    $('#danmu').danmu('danmu_stop');  

    即时增加弹幕：

    $('#danmu').danmu("add_danmu",新弹幕对象); 

    使弹幕时间同步与视频的时间，可能需要以下两种方法： 获取弹幕运行的当前时间(单位为分秒)：

    $('#danmu').data("nowtime"); 

    设置弹幕运行的当前时间(单位为分秒)：

    $('#danmu').data("nowtime"，新时间)  

    更改弹幕透明度：

    $(#danmu).data("opacity",新透明度数值);

    是否处于暂停状态：

    $('#danmu').data("paused");


    如果需要像视频网站那样使用户所发弹幕得以保存，需要使用到web后端及数据库技术。 
