/**
 * @file image_preivew.js
 * @brief javascript code for preview image addon
 * @author Xvezda (xvezda@naver.com)
 */
jQuery(function($) {

	$.widget.bridge('tooltip', $.ui.tooltip);

	$('.xe_content').tooltip({
		items : "a:regex(href,\\.(jpe?g|gif|png|bmp)((#|\\?).*)?$)",
		track : true,
		show : {
			effect : 'fade',
			delay: (!$.isEmptyObject(image_preview) && image_preview.delay) ? image_preview.delay : '100'
		},
		position : {
			my : (!$.isEmptyObject(image_preview) && image_preview.position) ? image_preview.position : 'left+15 bottom'
		},
		content : function(callback) {
			var img = $('<img>').attr({
				'src' : $(this).attr('href'),
				'style' : 'max-width:300px;height:auto'
			})
			.load(function() {
				callback(this);
			})
			.error(function() {
				callback('<img src="' + request_uri + 'addons/image_preview/img/ina.gif" />');
			});
			
			return '<img src="' + request_uri + 'addons/image_preview/img/load.gif' + '" />';
		}
	});
});

// regex selector code from http://james.padolsey.com/javascript/regex-selector-for-jquery/
jQuery.expr[':'].regex = function(elem, index, match) {
	var matchParams = match[3].split(','),
	validLabels = /^(data|css):/,
	attr = {
	method: matchParams[0].match(validLabels) ?
		matchParams[0].split(':')[0] : 'attr',
	property: matchParams.shift().replace(validLabels,'')
	},
	regexFlags = 'ig',
	regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
	return regex.test(jQuery(elem)[attr.method](attr.property));
}
