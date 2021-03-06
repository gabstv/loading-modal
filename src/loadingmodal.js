/*!
 * Loading Modal
 * https://ggithub.com/gabstv/loading-modal
 *
 * Copyright 2017 Gabriel Ochsenhofer
 !*/

(function(){

	function log(stuff){
		if(console && console.log){
			console.log(stuff);
		}
	}

	var isready = false;
	if(window.$ || window.jQuery){
		// init the loading modal
		jQuery(document).ready(function($) {
			var modal = new LoadingModal();
			modal.init();
		});
	}else{
		// dont always get jQuery because it is maybe loading already
		var doready = function(){
			isready = true;
			if(window.$ || window.jQuery){
				//jquery is loaded
				var modal = new LoadingModal();
				modal.init();
			}else{
				var imported = document.createElement('script');
				imported.src = 'https://code.jquery.com/jquery-2.1.4.min.js';
				imported.integrity = 'sha384-R4/ztc4ZlRqWjqIuvf6RX5yb/v90qNGx6fS48N0tRxiGkqveZETq72KgDVJCp2TC';
				imported.crossOrigin = 'anonymous';
				document.head.appendChild(imported);
				var can_has_jquery = function(){
					if(window.$ || window.jQuery){
						var modal = new LoadingModal();
						modal.init();
						return;
					}
					setTimeout(can_has_jquery, 25);
				}
				setTimeout(can_has_jquery, 25);
			}
		}
		ready(doready);
	}
	function ready(callback){
		// Mozilla, Opera and webkit nightlies currently support this event
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
	            document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
	            callback();
	        }, false );
		// If IE event model is used
		}else if(document.attachEvent){
			// ensure firing before onload,
        	// maybe late but safe also for iframes
        	document.attachEvent("onreadystatechange", function(){
	            if ( document.readyState === "complete" ) {
	                document.detachEvent( "onreadystatechange", arguments.callee );
	                callback();
	            }
	        });
	        // If IE and not an iframe
	        // continually check to see if the document is ready
	        if ( document.documentElement.doScroll && window == window.top ) (function(){
	            if (isready) return;
	            try {
	                // If IE is used, use the trick by Diego Perini
	                // http://javascript.nwbox.com/IEContentLoaded/
	                document.documentElement.doScroll("left");
	            } catch( error ) {
	                setTimeout( arguments.callee, 0 );
	                return;
	            }
	            // and execute any waiting functions
	            isready = true;
	            callback();
	        })();
		}else{
			window.onload = callback;
		}
	}
	function LoadingModal(){
		var self = this;
		self.shown = false;
		// start
		self.init = function(){
			var $ = window.$;
			if(window.jQuery) $ = window.jQuery;

			var modal_css = '#gabs-loading-modal{';
			modal_css = modal_css + 'display: none;';
			modal_css = modal_css + 'position: fixed;';
			modal_css = modal_css + 'z-index: 10002;';
			modal_css = modal_css + 'top: 0;left: 0;right: 0;bottom: 0;';
			modal_css = modal_css + 'background-color: rgba(0,0,0,0.5);';
			modal_css = modal_css + 'color: #fff;';
			modal_css = modal_css + 'font-size: 20px;';
			modal_css = modal_css + 'text-align: center;';
			modal_css = modal_css + 'padding: 40% 0 40% 0;';
			modal_css = modal_css + '}';

			$('head').append('<style>' + modal_css + '</style>');
			var divv = '<div id="gabs-loading-modal"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>';
			$('body').append(divv);

			
			window.loading_modal = self;
		};
		self.show = function(){
			if(!self.shown){
				self.shown = true;

				// get highest z-index
				var highest = -1;
				$('*').each(function(){
					var c = parseInt($(this).css("z-index"), 10);
					if(c && c > highest) highest = c;
				});

				var zi = 10000;
				if(zi <= highest){
					zi = highest+1;
				}
				$('#gabs-loading-modal').css('z-index', zi);
			}
			$('#gabs-loading-modal').show();
		};
		self.hide = function(){
			$('#gabs-loading-modal').hide();
		}
	}
})();