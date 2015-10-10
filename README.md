# jQuery.danmu.js

## jQuery弹幕插件

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)     [![License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)



**jQuery.Danmu.js是一个让网页某div上运行弹幕效果的jQuery插件**

具备彩色弹幕、顶端底端弹幕、自定义弹幕速度、实时调整透明度等弹幕功能

可以给video加上与之时间线同步的弹幕，也可以把弹幕放在网页的其他任何地方，只要你觉得酷炫。



**Demo地址：http://www.liyawei.cn/danmu/**



**更新日志**
>**Vision 4**
>
>1.放弃了以秒做单秒，继续改用分秒。
>
>2.对弹幕位置布局做了进一步优化。
>
>3.性能继续提升。
>
>4.bug增量修复
>- - -

>**Version 3**
>

>1.增加了弹幕显示的数量的控制，屏幕上的显示的弹幕数量和每秒的最大弹幕数量。

>2.大幅度的性能优化，大幅度减少了漏帧的问题。

>3.对弹幕位置做了进一步优化，减少了重叠现象的发生。

>- - -

> **Version 2**
>

> 1.API规范化。

> 2.新增了弹幕循环，字幕保护，弹幕位置优化等功能。

> 3.弹幕对象的时间改为秒，不再用分秒作为单位了。

> 4.一个页面可以添加多个弹幕区。

> 6.性能的优化，更少的CPU占用和漏帧。

> *.此版本API较上一版本有较大改变，若需使用上一版本，请去OldEdition目录下。



###文档



**1**.第一步引入本插件的js文件,需要和jQuery一起引用。

```html
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery.danmu.js.js"></script>
```

---

**2**.新建一个div，这里把id值设为danmu

```html
<div id="danmu"></div>
```



---

**3**.在初始化弹幕插件之前，先向米娜桑介绍插件中的一个灰常重要的类 "danmu"

danmu对象意指具一条弹幕，它有如下属性：

```javascript
text——弹幕文本内容。
color——弹幕颜色。
position——弹幕位置 0为滚动 1 为顶部 2为底部
size——弹幕文字大小。 0为小字 1为大字
time——弹幕所出现的时间。 单位为分秒（十分之一秒）
isnew——当出现该属性时（属性值可为任意），会认为这是用户新发的弹幕，从而弹幕在显示的时候会有边框。

```

举例：

```javascript
var aDanmu={ text:"这是弹幕" ,color:"white",size:1,position:0,time:2};

```

要显示边框的新弹幕：

```javascript
var aDanmu={ text:"这是弹幕" ,color:"white",size:1,position:1,time:2,isnew:1};

```

---

**4**.现在来初始化弹幕插件咯，需要传递一些参数。所有的参数都不是必须的，默认值就如下。

```javascript

$("danmu").danmu({
height: 360,  //弹幕区高度
width: 640,   //弹幕区宽度
zindex :100,   //弹幕区域z-index属性
speed:7000,      //滚动弹幕的默认速度，这是数值值得是弹幕滚过每672像素所需要的时间（毫秒）
sumTime:65535,   //弹幕流的总时间
danmuLoop:false,   //是否循环播放弹幕
defaultFontColor:"#FFFFFF",   //弹幕的默认颜色
fontSizeSmall:16,     //小弹幕的字号大小
FontSizeBig:24,       //大弹幕的字号大小
opacity:"0.9",			//默认弹幕透明度
topBottonDanmuTime:6000,   // 顶部底部弹幕持续时间（毫秒）
SubtitleProtection:false,     //是否字幕保护
positionOptimize:false,         //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分

maxCountInScreen: 40,   //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
maxCountPerSec: 10      //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
});

```

(注意：插件css的position属性为absolute，即绝对定位。如果需要让插件进入文档流，可以嵌套入别的div。)

弹幕区已经有了，给它添加弹幕对象：

```javascript
$("#danmu").danmu("addDanmu",[
   { text:"这是滚动弹幕" ,color:"white",size:1,position:0,time:2}
  ,{ text:"这是顶部弹幕" ,color:"yellow" ,size:1,position:1,time:3}
  ,{ text:"这是底部弹幕" , color:"red" ,size:1,position:2,time:3}
])

 ```

让弹幕开始运行的方法：

```javascript
$('#danmu').danmu('danmuStart');
```

或者：

```javascript
$('#danmu').danmu('danmuResume');
```

刷新页面后就可以在div中看到弹幕运行的效果啦。



---

**5**.插件在无论是在开始运行之前，还是运行之中，都是随时接受新的弹幕对象的。就如“发弹幕”这样的动作一样。

为插件增加新弹幕的方法：

```javascript
$('#danmu').danmu("add_danmu",新弹幕的弹幕对象 或者 弹幕对象的数组)

```

---

**6**.其他方法：

暂停弹幕：

```javascript
$('#danmu').danmu('danmuPause');
```

暂停后继续：

```javascript
$('#danmu').danmu('danmuResume');

```

停止弹幕：

```javascript
$('#danmu').danmu('danmuStop');

```

即时增加弹幕：
```javascript
$('#danmu').danmu(addDanmu,新弹幕的弹幕对象或弹幕对象数组);
```

使弹幕时间同步与视频的时间，可能需要和时间相关的方法，如下。

获取弹幕运行的当前时间(单位为秒)：

```javascript
$('#danmu').data("nowTime");

```

设置弹幕运行的当前时间(单位为秒)：

```javascript
$('#danmu').danmu("setTime",新时间);

```



更改弹幕透明度：

```javascript
$(#danmu).danmu("setOpacity",新透明度数值);

```

是否处于暂停状态：

```javascript
$('#danmu').data("paused");

```

隐藏当前已所有弹幕：

```javascript
$('#danmu').data("hideAll");

```

若要彻底隐藏后来的弹幕，请将透明度设为0。



---

**7**.推荐的方法：

处理发弹幕事件时，可以在前端生成两个弹幕对象，一个是有isnew属性的，即时使用addAanmu方法添加弹幕。另一个是没有isnew属性的，使用ajax技术写入数据库。

这里给出了一个将处理用户新发弹幕时的例子:

```javascript
function send_danmu() {

	var text = document.getElementById('danmu_text').value;

	var color = danmu_color;

	var position_select = jQuery("[name='danmu_position']").filter(":checked");

	var position = position_select.attr("value")

	var position_size = jQuery("[name='danmu_size']").filter(":checked");

	var size = position_size.attr("value");

	var time = jQuery('#danmu').data("nowTime") +1;

	//以上部分为从页面控件中获取用户输入的弹幕内容及选择的颜色等选项

	var text_obj = '{ text:"' + text + '",color:"' + color + '",size:"' + size + '",position:"' + position + '",time:' + time + '}';    //构造字符串形式的弹幕对象

	if (url_to_post_danmu)    //url_to_post_danmu 为接受推送的后端地址

		jQuery.post(url_to_post_danmu, {

			danmu: text_obj

		});       //向服务器推送danmu对象的字符串形式

	var text_obj = '{ text:"' + text + '",color:"' + color + '",size:"' + size + '",position:"' + position + '",time:' + time + ',isnew:""}';   //构造加上了innew属性的字符串danmu对象

	var new_obj = eval('(' + text_obj + ')');       //转化为js对象

	jQuery('#danmu').danmu("addAanmu", new_obj);    //向插件中添加该danmu对象

};

```

---

**8**.如果你只需将弹幕用于视频，强烈建议你使用本项目的姊妹项目DanmuPlayer,它是个HTML5弹幕视频播放器

项目地址： http://www/liyawei.cn/danmuplayer



###许可



你可以随意使用本项目，只需要在您的项目中添加这么一行注释：

```html
jquery.danmu.js (//github.com/chiruom/danmu/) - Licensed under the MIT license

```