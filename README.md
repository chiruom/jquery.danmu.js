# jquery.danmu.js
jQuery弹幕插件，Web前端弹幕插件。

完整文档及Demo地址：http://www.liyawei.cn/danmu/

<h3>简介</h3>

本插件实现弹幕功能，就如某些视频网站上的弹幕功能一样，只不过国内大多数视频网站是用flash实现的，而本插件通过jQuery。
就如绝大多数视频网站的弹幕功能，私也实现了彩色弹幕，顶端弹幕及底端弹幕，也可以即时操控弹幕透明度。当然也可以在弹幕运行的过程中暂停和继续。

<h3>用法</h3>

<p>
              <ol>
            <li>不用多说，第一步要引入js文件，把jquery.danmu.js和jQuery一起引用。
<pre><code class="language-html">&lt;script src=&quot;danmu/jquery-1.11.1.min.js&quot;&gt;&lt;/script&gt; 
&lt;script  src=&quot;danmu/jquery.danmu.js&quot;&gt;&lt;/script&gt;</code></pre>
            </li>
            <li>
              插件中定义了弹幕对象，意指具体某一条弹幕及起信息，对象名字叫”danmu”,该对象有如下属性：<br> 
              text——弹幕文本内容。 <br>
              color——弹幕颜色。 position——弹幕位置 “0”为滚动 “1” 为顶部 “2”为底部 <br>
              size——弹幕文字大小。 “0”为小字 ”1”为大字<br> 
              time——弹幕所出现的时间。 单位为”分秒“（及1/10秒，100毫秒）<br>
              isnew——当出现该属性时（属性值科委任意），会认为这是用户新发的弹幕，从而弹幕在显示的时候会有边框。
               例如：
               <pre><code class="language-js"> var a_danmu={ &quot;text&quot;:&quot;2333333&quot; , &quot;color&quot;:&quot;green&quot; ,&quot;size&quot;:&quot;1&quot;,&quot;position&quot;:&quot;0&quot;,&quot;time&quot;:60}; </code></pre>
               要显示边框的新弹幕：
                    <pre><code class="language-js"> var a_danmu={ &quot;text&quot;:&quot;2333333&quot; , &quot;color&quot;:&quot;green&quot; ,&quot;size&quot;:&quot;1&quot;,&quot;position&quot;:&quot;0&quot;,&quot;time&quot;:60 ,&quot;isnew&quot;:&quot; &quot;}; </code></pre>
               另外，为提高效率，插件另外定义了一种名为danmuss的对象，意指所有弹幕的集合，这个对象在每个弹幕屏中是唯一的。插件在运行时会把每个danmu对象写入danmuss对象，然后在相应的时间把某条弹幕放映于屏幕。dammuss对象每个属性的名称为弹幕所出现的时间点(分秒)，属性值为该时间点所出现的所有弹幕的danmu对象(没有time属性)所组成的数组。<br>
               例如： 
<pre><code class="language-js">var danmuss={ 1:[ { &quot;text&quot;:&quot;hahahaha&quot; , &quot;color&quot;:&quot;red&quot; ,&quot;size&quot;:&quot;0&quot;,&quot;position&quot;:&quot;0&quot;}, <br>{ &quot;text&quot;:&quot;233333&quot; , &quot;color&quot;:&quot;red&quot; ,&quot;size&quot;:&quot;0&quot;,&quot;position&quot;:&quot;2&quot;} ],<br> 3:[ { &quot;text&quot;:&quot;poi&quot; , &quot;color&quot;:&quot;red&quot; ,&quot;size&quot;:&quot;1&quot;,&quot;position&quot;:&quot;1&quot;}, <br>{ &quot;text&quot;:&quot;2333&quot; , &quot;color&quot;:&quot;#FFFFFF&quot; ,&quot;size&quot;:&quot;0&quot;,&quot;position&quot;:&quot;0&quot;} ],<br> 50:[ { &quot;text&quot;:&quot;XXX真好&quot; , &quot;color&quot;:&quot;#FFFFFF&quot; ,&quot;size&quot;:&quot;0&quot;,&quot;position&quot;:&quot;2&quot;}, ] };</code></pre> 
            </li>
            <li>
            要在屏幕中插入弹幕，首先需要划定一个区域，使用&lt;div&gt;。 <br>例如现在创建一个id=”danmu”的div作为弹幕将要飞过的区域 &lt;div id=&quot;danmu&quot;&gt; &lt;/div&gt; <br>然后调用插件方法，传递配置属性。<br>
<pre><code class="language-js">(&quot;#danmu&quot;).danmu({
left: 0, //区域的左边边界位置，相对于父div 
top: 0 , //区域的上边边界位置，相对于父div 
height: 360, //区域的高度 width: 640, //区域的宽度 
zindex :100, //div的css样式zindex
speed:5000, //弹幕速度，飞过区域的毫秒数 
sumtime:900 , //弹幕运行总时间
danmuss:{}, //danmuss对象，运行时的弹幕内容 
default_font_color:&quot;#FFFFFF&quot;, //弹幕默认字体颜色 
font_size_small:24, //小号弹幕的字体大小,注意此属性值只能是整数
font_size_big:28, //大号弹幕的字体大小 
opacity:&quot;0.7&quot;, //弹幕默认透明度 
top_botton_danmu_time:4000 //顶端底端弹幕持续时间 } );</code></pre> 
所有属性都不是必须指定，默认值就如上。<br>
当不指定danmuss时，也可以在调用此方法后用
<pre><code class="language-js">$('#danmu').danmu(&quot;add_danmu&quot;,新弹幕的danmu类型对象)</code></pre>
;逐一添加danmu对象。 <br>
当然在弹幕运行的过程中，可以随时用 <pre><code class="language-js">$('#danmu').danmu(&quot;add_danmu&quot;,新弹幕的danmu类型对象) </code></pre>添加弹幕。 <br>
<br> 
</li>
<li>
做完以上准备后，可以使弹幕在该区域开始运行，调用<pre><code class="language-js">$('#danmu').danmu('danmu_start'); </code></pre>即可运行。<br> 
</li>
<li>
其他方法：<br> 暂停弹幕：<pre><code class="language-js">$('#danmu').danmu('danmu_pause'); </code></pre> 
暂停后继续：<pre><code class="language-js">$('#danmu').danmu('danmu_resume'); </code></pre>
停止弹幕：<pre><code class="language-js">$('#danmu').danmu('danmu_stop');  </code></pre>
即时增加弹幕：<pre><code class="language-js">$('#danmu').danmu(&quot;add_danmu&quot;,新弹幕的danmu类型对象); </code></pre>使弹幕时间同步与视频的时间，可能需要和时间相关的方法，如下。<br>
获取弹幕运行的当前时间(单位为分秒)：<pre><code class="language-js">$('#danmu').data(&quot;nowtime&quot;); </code></pre> 
设置弹幕运行的当前时间(单位为分秒)：<pre><code class="language-js">$('#danmu').data(&quot;nowtime&quot;，新时间)  </code></pre> 
更改弹幕透明度：<pre><code class="language-js">$(#danmu).data(&quot;opacity&quot;,新透明度数值);</code></pre> 是否处于暂停状态：<pre><code class="language-js">$('#danmu').data("paused");</code></pre>
<br>如果需要像视频网站那样使用户所发弹幕得以保存，需要使用到web后端及数据库技术。

</li>
</ol>
<h3>Demo</h3>
<p>请访问http://www.liyawei.cn/danmu/  上面有个Demo,并做到了与html5 video的结合</p> 
<h3>推荐的方法</h3>
<ol>
<li>
 通过控制好弹幕div的left、top、height、width、zindex属性，可以让弹幕正好悬浮于html视频之上，就如Demo中的那样。
</li>
<li>
在用户发弹幕时，可以在前端生成两个danmu对象，一个是有isnew属性的，即时使用add_danmu方法添加弹幕。另一个是没有isnew属性的，使用ajax技术写入数据库。
</li>
</ol>
<h3>许可</h3>
<p>你可以随意使用本项目，只需要在您的项目中添加这么一行注释：<br>
jQuery.danmu.js (//github.com/chiruom/danmu/) - Licensed under the MIT license</p> 
