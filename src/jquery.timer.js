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

(function( $ ){
	cyntax.plugins.timer = function( ele , options ){
		this.$this = $( ele );
		this.options = $.extend( {} , this.defaults , options );
		this.timer_info = {id:null, index:null, state:0};
	};
	cyntax.plugins.timer.prototype = {
		defaults : { 
			delay: 1000,      // delay in milliseconds (optional)
			repeat: false,    // true to repeat the timer continuously, or a number for repeating this number of times (optional)
			autostart: true,	// timer starts as soon as it is created, set false to start manually
			callback: null,   // callback (optional)
			url: '',          // url to load content from (optional)
			post: ''          // post data (optional)
		},
		_init : function(){
			if (this.options.autostart) {
				this.timer_info.state = 1;
				this.timer_info.id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay);
			}
			return this;
		},
		_timer_fn : function() {
				if (typeof this.options.callback == "function")
					$.proxy( this.options.callback, this.$this ).call(this, ++this.timer_info.index);
				else if (typeof this.options.url == "string") {
					ajax_options = {
						url: this.options.url,
						context: this,
						type: (typeof this.options.post == "string" && typeof this.options.post != "" == "" ? "POST": "GET"),
						success: function(data, textStatus, jqXHR) {
							this.$this.html(data);
						}
					};
					if (typeof this.options.post == "string" && typeof this.options.post != "")
						ajax_options.data = this.options.post;
					$.ajax(ajax_options);
				}
				if ( this.options.repeat && this.timer_info.state == 1 &&
					(typeof this.options.repeat == "boolean" || parseInt(this.options.repeat) > this.timer_info.index) )
					this.timer_info.id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay );
				else
					this.timer_id = null;
		},
		start : function() {
			if (this.timer_info.state == 0) {
				this.timer_info.index = 0;
				this.timer_info.state = 1;
				this.timer_id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay);
			}
		},
		
		stop : function(){
			if ( this.timer_info.state == 1 && this.timer_info.id ) {
				clearTimeout(this.timer_info.id);
				this.timer_id = null;
			}
			this.timer_info.state = 0;
		},
		
		pause : function() {
			if ( this.timer_info.state == 1 && this.timer_info.id )
				clearTimeout(this.timer_info.id);
			this.timer_info.state = 0;
		},
		
		resume : function() {
			this.timer_info.state = 1;
			this.timer_id = setTimeout( $.proxy( this._timer_fn, this ) , this.options.delay);
		}
	};

	$.jQueryPlugin( "timer" );
	
})( jQuery );
