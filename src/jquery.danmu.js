/**
 * 专为danmuplayer定制的jquery.danmu.js
 *
 *
 * jQuery Generic Plugin Module
 * Version 0.1
 * Copyright (c) 2011 Cyntax Technologies - http://cyntaxtech.com
 * Licensed under the Cyntax Open Technology License
 *     http://code.cyntax.com/licenses/cyntax-open-technology
 */

(function ($) {
    $.jQueryPlugin = function (name) {
        $.fn[name] = function (options) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (this.length) {
                return this.each(function () {
                    var instance = $.data(this, name) || $.data(this, name, new cyntax.plugins[name](this, options)._init());
                    if (typeof options === "string") {
                        options = options.replace(/^_/, "");
                        if (instance[options]) {
                            instance[options].apply(instance, args);
                        }
                    }
                });
            }
        };
    };
})(jQuery);

var cyntax = {
    plugins: {}
};
;
/*!
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
/* Changelog:
 *
 * 0.1    2010-06-13  Initial release
 */
(function () {
    var $ = jQuery,
        pauseId = 'jQuery.pause',
        uuid = 1,
        oldAnimate = $.fn.animate,
        anims = {};

    function now() {
        return new Date().getTime();
    }

    $.fn.animate = function (prop, speed, easing, callback) {
        var optall = $.speed(speed, easing, callback);
        optall.complete = optall.old; // unwrap callback
        return this.each(function () {
            // check pauseId
            if (!this[pauseId])
                this[pauseId] = uuid++;
            // start animation
            var opt = $.extend({}, optall);
            oldAnimate.apply($(this), [prop, $.extend({}, opt)]);
            // store data
            anims[this[pauseId]] = {
                run: true,
                prop: prop,
                opt: opt,
                start: now(),
                done: 0
            };
        });
    };

    $.fn.pause = function () {
        return this.each(function () {
            // check pauseId
            if (!this[pauseId])
                this[pauseId] = uuid++;
            // fetch data
            var data = anims[this[pauseId]];
            if (data && data.run) {
                data.done += now() - data.start;
                if (data.done > data.opt.duration) {
                    // remove stale entry
                    delete anims[this[pauseId]];
                } else {
                    // pause animation
                    $(this).stop().stop().stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    $(this).stop();
                    data.run = false;
                }
            }
        });
    };

    $.fn.resume = function () {
        return this.each(function () {
            // check pauseId
            if (!this[pauseId])
                this[pauseId] = uuid++;
            // fetch data
            var data = anims[this[pauseId]];
            if (data && !data.run) {
                // resume animation
                data.opt.duration -= data.done;
                data.done = 0;
                data.run = true;
                data.start = now();
                oldAnimate.apply($(this), [data.prop, $.extend({}, data.opt)]);
            }
        });
    };
})();
;
/**
 * jQuery Timer Plugin
 * Project page - http://code.cyntaxtech.com/plugins/jquery-timer
 * Version 0.1.1
 * Copyright (c) 2011 Cyntax Technologies - http://cyntaxtech.com
 * dependencies: jquery.plugin.js
 * Licensed under the Cyntax Open Technology License
 *     http://code.cyntax.com/licenses/cyntax-open-technology
 * ------------------------------------
 * For details, please visit:
 * http://code.cyntaxtech.com/plugins/jquery-timer
 */

(function ($) {
    cyntax.plugins.timer = function (ele, options) {
        this.$this = $(ele);
        this.options = $.extend({}, this.defaults, options);
        this.timer_info = {id: null, index: null, state: 0};
    };
    cyntax.plugins.timer.prototype = {
        defaults: {
            delay: 1000,      // delay in milliseconds (optional)
            repeat: false,    // true to repeat the timer continuously, or a number for repeating this number of times (optional)
            autostart: true,	// timer starts as soon as it is created, set false to start manually
            callback: null,   // callback (optional)
            url: '',          // url to load content from (optional)
            post: ''          // post data (optional)
        },
        _init: function () {
            if (this.options.autostart) {
                this.timer_info.state = 1;
                this.timer_info.id = setTimeout($.proxy(this._timer_fn, this), this.options.delay);
            }
            return this;
        },
        _timer_fn: function () {
            if (typeof this.options.callback == "function")
                $.proxy(this.options.callback, this.$this).call(this, ++this.timer_info.index);
            else if (typeof this.options.url == "string") {
                ajax_options = {
                    url: this.options.url,
                    context: this,
                    type: (typeof this.options.post == "string" && typeof this.options.post != "" == "" ? "POST" : "GET"),
                    success: function (data, textStatus, jqXHR) {
                        this.$this.html(data);
                    }
                };
                if (typeof this.options.post == "string" && typeof this.options.post != "")
                    ajax_options.data = this.options.post;
                $.ajax(ajax_options);
            }
            if (this.options.repeat && this.timer_info.state == 1 &&
                (typeof this.options.repeat == "boolean" || parseInt(this.options.repeat) > this.timer_info.index))
                this.timer_info.id = setTimeout($.proxy(this._timer_fn, this), this.options.delay);
            else
                this.timer_id = null;
        },
        start: function () {
            if (this.timer_info.state == 0) {
                this.timer_info.index = 0;
                this.timer_info.state = 1;
                this.timer_id = setTimeout($.proxy(this._timer_fn, this), this.options.delay);
            }
        },

        stop: function () {
            if (this.timer_info.state == 1 && this.timer_info.id) {
                clearTimeout(this.timer_info.id);
                this.timer_id = null;
            }
            this.timer_info.state = 0;
        },

        pause: function () {
            if (this.timer_info.state == 1 && this.timer_info.id)
                clearTimeout(this.timer_info.id);
            this.timer_info.state = 0;
        },

        resume: function () {
            this.timer_info.state = 1;
            this.timer_id = setTimeout($.proxy(this._timer_fn, this), this.options.delay);
        }
    };

    $.jQueryPlugin("timer");

})(jQuery);
/*!
 *弹幕引擎核心
 *
 * Copyright 2015 by Ruiko Of AcGit.cc
 * @license MIT
 *
 * 版本3.0 2015/08/12
 */


;
(function ($) {
    var Danmu = function (element, options) {
        this.$element = $(element);
        this.options = options;
        this.id = $(element).attr("id");
        $(element).data("nowTime", 0);
        $(element).data("danmuList", options.danmuList);
        $(element).data("opacity", options.opacity);
        $(element).data("paused", 1);
        $(element).data("topSpace", 0);
        $(element).data("bottomSpace", 0);
        this.$element.css({
            "position": "absolute",
            "left": this.options.left,
            "top": this.options.top,
            "width": this.options.width,
            "height": this.options.height,
            "z-index": this.options.zindex,
            "color": options.defaultFontColor,
            "overflow": "hidden"
        });
        var me = this;
        //播放器长宽
        me.height = this.$element.height();
        me.width = this.$element.width();
        //速度
        me.speed = 1000/options.speed;

        //防止重复
        this.launched = [];
        this.preTime = 0;
        //最大弹幕数控制
        var maxCount = this.options.maxCountInScreen;
        var maxCountPerSec = this.options.maxCountPerSec;
        var nowCount = 0;
        var nowSecCount = 0;
        //格式控制
        this.rowCount = parseInt(me.height / options.FontSizeBig);
        if (me.options.SubtitleProtection) {
            me.rowCount = me.rowCount - 3;
        }
        this.rows = [];
        this.topRows=[];
        this.bottomRows=[];
        this.initRows = function (me) {
            // me.rowCount = parseInt(me.height / options.FontSizeBig);
            for (var i = 0; i < me.rowCount; i++) {
                me.rows[i] = 0;
                me.topRows[i]=0;
                me.bottomRows[i]=0;
            }

        };

        this.initRows(this);
        me.getRow = function (me) {
            var result = 0;
            while (me.rows[result] !== 0) {
                result = result + 1;
                if (result >= me.rowCount) {

                    me.initRows(me);
                    result = 0;
                    break;
                }
            }
            return result;
        };
        me.getTopRow = function (me) {
            for(var i=0;i<me.topRows.length;i++){
                if (me.topRows[i] == 0){
                    return i;
                }
            }
        };

        me.getBottomRow = function (me) {
            for(var i=0;i<me.bottomRows.length;i++){
                if (me.bottomRows[i] == 0){
                    return i;
                }
            }
        };
        me.checkRow = function (me) {
            for (var i in me.rows) {
                if (me.rows[i] !== 0 && typeof($("#" + me.rows[i]).position()) !== "undefined" && ( $("#" + me.rows[i]).position().left < (me.$element.width() - $("#" + me.rows[i]).width()) )) {
                    me.rows[i] = 0
                }
            }
        };
        //me.startCheck = function(me){
        //    setInterval(me.checkRow(me),10);
        //};
        //  me.startCheck(me);

        $("<div class='danmakuTimer'></div>").appendTo(this.$element);
        this.$timer = $(".danmakuTimer");
        this.$timer.timer({
            delay: 100,
            repeat: options.sumTime,
            autostart: false,
            callback: function (index) {
                setTimeout(function () {
                    //计时前置  试验表明前置很好
                    if (me.options.danmuLoop && $(element).data("nowTime") >= $(element).data("sumTime")) {
                        $(element).data("nowTime", 0);
                    }
                    $(element).data("nowTime", $(element).data("nowTime") + 1);
                    //更新播放器面积参数
                    me.height = $(element).height();
                    me.width = $(element).width();
                    //防止重复
                    if (Math.abs($(element).data("nowTime") - (me.preTime + 1)) > 10) {
                        me.launched = [];
                    }
                    me.preTime = $(element).data("nowTime");
                    //更新行数
                    var rowCOld = me.rowCount;
                    me.rowCount = parseInt(me.height / options.FontSizeBig);
                    setTimeout(me.checkRow(me), 0);
                    //字幕保护
                    if (me.options.SubtitleProtection) {
                        me.rowCount = me.rowCount - 3;
                    }
                    if (rowCOld !== 0 && me.rowCount !== rowCOld) {
                        me.initRows(me);
                    }
                    nowSecCount = 0;

                    if ($(element).data("danmuList")[$(element).data("nowTime")] && me.launched.indexOf($(element).data("nowTime")) < 0) {
                        var nowTime = $(element).data("nowTime");
                        var danmus = $(element).data("danmuList")[nowTime];
                        for (var i = (danmus.length - 1); i >= 0; i--) {
                            setTimeout(me.checkRow(me), 0);
                            //setTimeout(me.runDanmu(danmus[i],nowCount,maxCount,nowSecCount,maxCountPerSec,options,me,$(element),speed,$(this)),1);
                            //  setTimeout(me.runDanmu(danmus[i],options,me,$(element),speed,$(this)),1);

                            // console.log(nowCount);
                            var a_danmu = "<span class='danmaku' id='" + me.id + "tempDanmaku'></span>";
                            $(element).append(a_danmu);
                            var danmaku = danmus[i];
                            $("#" + me.id + "tempDanmaku").text(danmaku.text)
                                .css({
                                    "color": danmaku.color
                                    , "text-shadow": " 0px 0px 2px #000000"
                                    , "-moz-opacity": $(element).data("opacity")
                                    , "opacity": $(element).data("opacity")
                                    , "white-space": "nowrap"
                                    , "font-weight": "bold"
                                    , "font-family": "SimHei"
                                    , "font-size": options.FontSizeBig
                                });
                            if (danmaku.color < "#777777")
                                $("#" + me.id + "tempDanmaku").css({
                                    "text-shadow": " 0px 0px 2px #FFFFFF"
                                });
                            if (danmaku.hasOwnProperty('isnew')) {
                                $("#" + me.id + "tempDanmaku").css({"border": "2px solid " + danmaku.color});
                            }
                            if (danmaku.size == 0)  $("#" + me.id + "tempDanmaku").css("font-size", options.fontSizeSmall);
                            if (danmaku.position == 0) {
                                var flyTmpName = me.id + "fly" + parseInt(new Date().getTime()).toString();
                                $("#" + me.id + "tempDanmaku").attr("id", flyTmpName);
                                if (nowCount <= maxCount && nowSecCount <= maxCountPerSec) {
                                    me.checkRow(me);
                                    var row = me.getRow(me);
                                    me.rows[row] = flyTmpName;
                                    danmaku["row"] = row;
                                    var top_local = (row) * options.FontSizeBig;
                                    danmaku["width"] = $("#" + flyTmpName).width();
                                    // var offsetLeft = parseInt(Math.random() * 2 * options.FontSizeBig);
                                    var left_local = $("#" + me.id).width();
                                    $("#" + flyTmpName).css({
                                        "width": $("#" + flyTmpName).width()
                                        , "position": "absolute"
                                        , "top": top_local
                                        , "left": left_local
                                    });
                                    var newSpeed = ($(element).width()+400)/me.speed;
                                    nowCount++;
                                    nowSecCount++;
                                    $("#" + flyTmpName).animate({left: -($("#" + flyTmpName).width() + 400)}, newSpeed
                                        , function () {
                                            $(this).remove();
                                            nowCount--;
                                            nowSecCount--;
                                        }
                                    );
                                }
                                else {
                                    $("#" + flyTmpName).remove();
                                }
                            }
                            else if (danmaku.position == 1) {
                                var topTmpId = me.id + "top" + parseInt(10000 * Math.random()).toString();
                                $("#" + me.id + "tempDanmaku").attr("id", topTmpId);
                                var temRow=me.getTopRow(me);
                                $(element).data("topSpace", options.FontSizeBig*temRow);
                                me.topRows[temRow]=1;
                                $("#" + topTmpId).css({
                                    "width": "100%"
                                    , "text-align": "center"
                                    , "position": "absolute"
                                    , "top": ($(element).data("topSpace"))
                                    , "left": "0"
                                });
                                $("#" + topTmpId).data("row",temRow);
                                $("#" + topTmpId).fadeTo(options.topBottomDanmuTime, $(element).data("opacity"), function () {
                                        me.topRows[$(this).data("row")]=0;
                                        $(this).remove();

                                    }
                                );
                            }
                            else if (danmaku.position == 2) {
                                var bottomTmpId = me.id + "bottom" + parseInt(10000 * Math.random()).toString();
                                $("#" + me.id + "tempDanmaku").attr("id", bottomTmpId);
                                var temRow=me.getBottomRow(me);
                                $(element).data("bottomSpace", options.FontSizeBig*temRow);
                                me.bottomRows[temRow]=1;
                                $("#" + bottomTmpId).css({
                                    "width": options.width
                                    , "left": "0"
                                    , "text-align": "center"
                                    , "position": "absolute"
                                    , "bottom": 0 + $(element).data("bottomSpace")
                                });
                                $("#" + bottomTmpId).data("row",temRow);
                                $("#" + bottomTmpId).fadeTo(options.topBottomDanmuTime, $(element).data("opacity"), function () {
                                        me.bottomRows[$(this).data("row")]=0;
                                        $(this).remove();
                                    }
                                );

                            } //else if
                            danmus[i] = danmaku;
                        }   // for in danmus
                        $(element).data("danmuList")[nowTime] = danmus
                    }  //if (danmus)
                    me.launched.push($(element).data("nowTime"));
                    //   }, 0);

                    //循环
                    if (index == options.sumTime && options.isLoop) {
                        me.$timer.timer('stop');
                        me.$timer.timer('start');
                    }

                })
            }
        });
    };


    Danmu.DEFAULTS = {
        left: 0,
        top: 0,
        height: 360,
        width: 640,
        zindex: 100,
        speed: 8000,
        sumTime: 65535,
        danmuLoop: false,
        danmuList: {},
        defaultFontColor: "#FFFFFF",
        fontSizeSmall: 16,
        FontSizeBig: 24,
        opacity: "0.9",
        topBottomDanmuTime: 6000,
        SubtitleProtection: false,
        positionOptimize: false,
        maxCountInScreen: 40,
        maxCountPerSec: 10
    };


    Danmu.prototype.danmuStart = function () {
        this.$timer.timer('start');
        this.$element.data("paused", 0);
    };


    Danmu.prototype.danmuStop = function () {
        this.$timer.timer('stop');
        $("#" + this.id + ' .danmaku').remove();
        nowTime = 0;
        this.$element.data("paused", 1);
        this.$element.data("nowTime", 0);
    };


    Danmu.prototype.danmuPause = function () {
        this.$timer.timer('pause');
        $("#" + this.id + ' .danmaku').pause();
        this.$element.data("paused", 1);
    };


    Danmu.prototype.danmuResume = function () {
        this.$timer.timer('resume');
        $("#" + this.id + ' .danmaku').resume();
        this.$element.data("paused", 0);
    };

    Danmu.prototype.danmuHideAll = function () {
        $("#" + this.id + ' .danmaku').css({"opacity": 0});
        this.initRows(this);
    };


    Danmu.prototype.setTime = function (arg) {
        $("#" + this.id + ' .danmaku').remove();
        this.$element.data("nowTime", arg);

    };

    Danmu.prototype.setOpacity = function (arg) {
        $("#" + this.id + ' .danmaku').css("opacity", arg);
        this.$element.data("opacity", arg);

    };


    Danmu.prototype.addDanmu = function (arg) {
        if (arg instanceof Array) {
            for (var i in arg) {
                if (this.$element.data("danmuList")[arg[i]["time"]]) {
                    this.$element.data("danmuList")[arg[i]["time"]].push(arg[i]);
                }
                else {
                    this.$element.data("danmuList")[arg[i]["time"]] = [];
                    this.$element.data("danmuList")[arg[i]["time"]].push(arg[i]);
                }
            }
        }
        else {
            if (this.$element.data("danmuList")[arg.time]) {
                this.$element.data("danmuList")[arg.time].push(arg);
            }
            else {
                this.$element.data("danmuList")[arg.time] = [];
                this.$element.data("danmuList")[arg.time].push(arg);
            }
        }
    };


    function Plugin(option, arg) {
        return this.each(function () {
            var $this = $(this);
            var options = $.extend({}, Danmu.DEFAULTS, typeof option == 'object' && option);
            var data = $this.data('danmu');
            var action = typeof option == 'string' ? option : NaN;
            if (!data) $this.data('danmu', (data = new Danmu(this, options)));
            if (action)    data[action](arg);
        })
    };


    $.fn.danmu = Plugin;
    $.fn.danmu.Constructor = Danmu;


})(jQuery);