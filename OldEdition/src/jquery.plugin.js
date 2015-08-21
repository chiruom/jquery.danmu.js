/**
 * jQuery Generic Plugin Module
 * Version 0.1
 * Copyright (c) 2011 Cyntax Technologies - http://cyntaxtech.com
 * Licensed under the Cyntax Open Technology License
 *     http://code.cyntax.com/licenses/cyntax-open-technology
 */

(function( $ ) {
	$.jQueryPlugin = function( name ) {
		$.fn[name] = function( options ) {
			var args = Array.prototype.slice.call( arguments , 1 );
			if( this.length ) {
				return this.each( function() {
					var instance = $.data( this , name ) || $.data( this , name , new cyntax.plugins[name]( this , options )._init() );
					if( typeof options === "string" ){
						options = options.replace( /^_/ , "" );
						if( instance[options] ) {
							instance[options].apply( instance , args );
						}
					}
				});
			}
		};
	};
})( jQuery );

var cyntax = {
	plugins : {}
};