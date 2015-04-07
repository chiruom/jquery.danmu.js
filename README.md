# jquery.danmu.js
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
##jQuery弹幕插件

完整文档及Demo地址：http://www.liyawei.cn/danmu/

<h3>简介</h3>

jQuery.Danmu.js是一个让网页某div上运行弹幕效果的jQuery插件
具备彩色弹幕、顶端底端弹幕、自定义弹幕速度、实时调整透明度等弹幕功能
可以给video加上与之时间线同步的弹幕，也可以把弹幕放在网页的其他任何地方，只要你觉得酷炫。

 如果你只需把弹幕应用于视频而非网页的其他位置
请看jQuery.Danmu.js的姊妹项目DanmuPlayer,它是一个Html5弹幕视频播放器
<a target="_blank" href="https://github.com/chiruom/DanmuPlayer/">点击这里</a></pre>



<h3>开始使用</h3>
<pre>
1.第一步引入本插件的js文件,需要和jQuery一起引用。
<code class="language-html">&lt;script src=&quot;danmu/jquery-1.11.1.min.js&quot;&gt;&lt;/script&gt; 
&lt;script  src=&quot;danmu/jquery.danmu.js&quot;&gt;&lt;/script&gt;</code>
</pre>
<pre>
2.新建一个div，这里把id值设为danmu
<code class=language-html>&lt;div id=&quot;danmu&quot;&gt;&lt;/div&gt;</code>
</pre>
<pre>
3.在初始化弹幕插件之前，先向米娜桑介绍插件中的两个灰常重要的类 "danmu"和"danmuss"
danmu对象意指具体某一条弹幕及起信息，它有如下属性：
<code>text——弹幕文本内容。 
color——弹幕颜色。 position——弹幕位置 “0”为滚动 “1” 为顶部 “2”为底部 
size——弹幕文字大小。 “0”为小字 ”1”为大字
time——弹幕所出现的时间。 单位为”分秒“（及1/10秒，100毫秒）
isnew——当出现该属性时（属性值科委任意），会认为这是用户新发的弹幕，从而弹幕在显示的时候会有边框。
</code> 
举例：
<code> var a_danmu={ "text":"2333333" , "color":"green" ,"size":"1","position":"0","time":60};</code>要显示边框的新弹幕：
<code>var a_danmu={ "text":"2333333" , "color":"green" ,"size":"1","position":"0","time":60 ,"isnew":" "}; </code>

danmuss对象是该弹幕视频中所有danmu对象的集合，它的存在是为了提高程序的效率。
每个DanmuPlayer只有一个duamss对象。DanmuPlayer在运行时会把每个danmu对象写入danmuss对象。
dammuss对象每个属性的名称为弹幕所出现的时间点(分秒)，属性值为该时间点所出现的所有弹幕的danmu对象(除掉time属性的)所组成的数组。
例如:
<code class="language-js">var danmuss={ 1:[ { "text":"hahahaha" , "color":"red" ,"size":"0","position":"0"}, 
{ "text":"233333" , "color":"red" ,"size":"0","position":"2"} ],
 3:[ { "text":"poi" , "color":"red" ,"size":"1","position":"1"}, 
{ "text":"2333" , "color":"#FFFFFF" ,"size":"0","position":"0"} ],
 50:[ { "text":"XXX真好" , "color":"#FFFFFF" ,"size":"0","position":"2"}, ] };
</code>
</pre>
<pre>
4.现在我们来初始化弹幕插件，在初始化前，可以先定义一个danmuss对象以做观察，上一节例举的那个对象就可以。
好了，现在来初始化弹幕插件咯，需要传递一些参数。所有的参数都不是必须的，默认值就如下。
<code class="language-js">(&quot;#danmu&quot;).danmu({
left: 0,    //区域的起始位置x坐标
top: 0 ,  //区域的起始位置y坐标
height: 360, //区域的高度 
width: 640, //区域的宽度 
zindex :100, //div的css样式zindex
speed:20000, //弹幕速度，飞过区域的毫秒数 
sumtime:900 , //弹幕运行总时间
danmuss:{}, //danmuss对象，运行时的弹幕内容 
default_font_color:&quot;#FFFFFF&quot;, //弹幕默认字体颜色 
font_size_small:16, //小号弹幕的字体大小,注意此属性值只能是整数
font_size_big:24, //大号弹幕的字体大小 
opacity:&quot;0.9&quot;, //弹幕默认透明度 
top_botton_danmu_time:6000 //顶端底端弹幕持续时间 
} );</code>(注意：插件css的position属性为absolute，即绝对定位。如果需要让插件进入文档流，可以嵌套入别的div。)
让弹幕开始运行的方法：
<code class="language-js">$('#danmu').danmu('danmu_start'); </code>如果你传递了合法的danmuss对象进去（不是必须的），刷新页面后就可以在div中看到弹幕运行的效果啦。
</pre>
<pre>
5.插件在无论是在开始运行之前，还是运行之中，都是随时接受新的弹幕对象的。就如“发弹幕”这样的动作一样。
为插件增加新弹幕的方法：
<code class="language-js">$('#danmu').danmu(&quot;add_danmu&quot;,新弹幕的danmu类型对象)</code>如果你没有在初始化是传递danmuss对象进去，也可以逐一用此方法向插件传递要播放的弹幕。</pre>
<pre>
6.其他方法：
暂停弹幕：<code class="language-js">$('#danmu').danmu('danmu_pause');</code>暂停后继续：<code class="language-js">$('#danmu').danmu('danmu_resume');</code>停止弹幕：<code class="language-js">$('#danmu').danmu('danmu_stop'); </code>即时增加弹幕：<code class="language-js">$('#danmu').danmu(&quot;add_danmu&quot;,新弹幕的danmu类型对象); </code>使弹幕时间同步与视频的时间，可能需要和时间相关的方法，如下。获取弹幕运行的当前时间(单位为分秒)：<code class="language-js">$('#danmu').data(&quot;nowtime&quot;); </code>设置弹幕运行的当前时间(单位为分秒)：<code class="language-js">$('#danmu').data(&quot;nowtime&quot;，新时间)  </code>更改弹幕透明度：<code class="language-js">$(#danmu).data(&quot;opacity&quot;,新透明度数值);</code>是否处于暂停状态：<code class="language-js">$('#danmu').data("paused");</code>隐藏当前已所有弹幕：<code class="language-js">$('#danmu').data("hide_all");</code>若要彻底隐藏后来的弹幕，请将透明度设为0
</pre>


<pre>
7.推荐的方法：
通过控制好弹幕div的left、top、height、width、zindex属性，可以让弹幕正好悬浮于html视频或其他标签之上之上。
如果需要像视频网站那样使用户所发弹幕得以保存，需要使用到web后端及数据库技术。
在用户发弹幕时，可以在前端生成两个danmu对象，一个是有isnew属性的，即时使用add_danmu方法添加弹幕。另一个是没有isnew属性的，使用ajax技术写入数据库。
这里给出了一个将处理用户新发弹幕时的例子
<code class="language-js">function send_danmu() {
  var text = document.getElementById('danmu_text').value;
  var color = danmu_color;
  var position_select = jQuery("[name='danmu_position']").filter(":checked");
  var position = position_select.attr("value")
  var position_size = jQuery("[name='danmu_size']").filter(":checked");
  var size = position_size.attr("value");
  var time = jQuery('#danmu').data("nowtime") + 5;
  //以上部分为从页面空间中获取用户输入的弹幕内容及选择的颜色等选项
  var text_obj = '{ "text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '","time":' + time + '}';    //构造字符串形式的弹幕对象
  if (url_to_post_danmu)    //url_to_post_danmu 为接受推送的后端地址
    jQuery.post(url_to_post_danmu, {
      danmu: text_obj
    });       //向服务器推送danmu对象的字符串形式
  var text_obj = '{ "text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '","time":' + time + ',"isnew":""}';   //构造加上了innew属性的字符串danmu对象
  var new_obj = eval('(' + text_obj + ')');       //转化为js对象
  jQuery('#danmu').danmu("add_danmu", new_obj);    //向插件中添加该danmu对象
  document.getElementById('danmu_text').value = '';  //清空用户输入框
};</code>
</pre>
<pre>
8.如果你只需将弹幕用于视频，强烈建议你使用本项目的姊妹项目DanmuPlayer,它是个HTML5弹幕视频播放器
项目地址：<a target="_blank" href=""></a>
</pre>
<h3>许可</h3>
<pre>
你可以随意使用本项目，只需要在您的项目中添加这么一行注释：
<code class="language-html">jquery.danmu.js (//github.com/chiruom/danmu/) - Licensed under the MIT license</code>
</pre>
