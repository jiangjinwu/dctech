/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
;(function($) {
var numberUICreate = function(element, options) {
	var element = $(element);
	var obj = this;

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.numberUI.defaults, options);
	
	this.settings = $settings;
	var $activeTab = null;
	var $navigation = null;
	
	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn);
	}

	

	this.next = function(e) {

		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false;
		}

		if($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false;
		}

		// Did we click the last button
		$index = obj.nextIndex();
		if($index > obj.navigationLength()) {
		} else {
			$navigation.find('li:eq('+$index+') a').tab('show');
		}
	};

	this.previous = function(e) {

		// If we clicked the first then dont activate this
		if(element.hasClass('first')) {
			return false;
		}

		if($settings.onPrevious && typeof $settings.onPrevious === 'function' && $settings.onPrevious($activeTab, $navigation, obj.previousIndex())===false){
			return false;
		}

		$index = obj.previousIndex();
		if($index < 0) {
		} else {
			$navigation.find('li:eq('+$index+') a').tab('show');
		}
	};

	

	// Load onInit
	if($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0);
	}

	

	/*$('a[data-toggle="tab"]', $navigation).on('click', function (e) {
		// Get the index of the clicked tab
		var clickedIndex = $navigation.find('li').index($(e.currentTarget).parent('li'));
		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex)===false){
			return false;
		}
	});

	$('a[data-toggle="tab"]', $navigation).on('shown', function (e) {  // use shown instead of show to help prevent double firing
		$element = $(e.target).parent();
		var nextTab = $navigation.find('li').index($element);

		// If it's disabled then do not change
		if($element.hasClass('disabled')) {
			return false;
		}

		if($settings.onTabChange && typeof $settings.onTabChange === 'function' && $settings.onTabChange($activeTab, $navigation, obj.currentIndex(), nextTab)===false){
				return false;
		}

		
	});*/
	
	
	
};
$.fn.numberUI = function(options) {
	//expose methods
	if (typeof options == 'string') {
		var args = Array.prototype.slice.call(arguments, 1)
		if(args.length === 1) {
			args.toString();
		}
		return this.data('numberUI')[options](args);
	}
	return this.each(function(index){
		var element = $(this);
		// Return early if this element already has a plugin instance
		if (element.data('numberUI')) return;
		// pass options to plugin constructor
		var wizard = new numberUICreate(element, options);
		// Store plugin object in this element's data
		element.data('numberUI', wizard);
		
		
		var first = $("<span class='input-group-addon span-btn'>-</span>");
		var last =$("<span class='input-group-addon span-btn'>+</span>");
		
		var input = $("<input type='text'  value='1' class='form-control col-sm-3'>");
		input.attr("name",wizard.settings.name);
		$(this).append(first);
		$(this).append(input);
		$(this).append(last);
		
		
		console.info(wizard.settings);
		
		first.bind("click",function(){
			if(parseInt(input.val())-wizard.settings.stepLength>=wizard.settings.minValue){
				input.val(parseInt(input.val())-wizard.settings.stepLength);
			}
			
		});
		
		last.bind("click",function(){
			input.val(parseInt(input.val())+wizard.settings.stepLength);
		});
		
		 
	});
};

// expose options
$.fn.numberUI.defaults = {
	defaultValue:1,
	stepLength:1,
	minValue:1,
	name:'number',
	onInit:           null,
	onNext:           null,
	onPrevious:       null
};

})(jQuery);
