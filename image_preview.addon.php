<?php
/* Copyright (C) Xvezda <http://xvezda.blog.me> */

if(!defined('__XE__'))
{
	exit();
}

/**
 * @file image_preview.addon.php
 * @author Xvezda (xvezda@naver.com)
 * @brief Add-on for preview image from image link
 */
if($called_position == 'before_display_content' && Context::get('module') != 'admin' && (Context::getResponseMethod() == 'HTML' || !isCrawler()) && !Mobile::isFromMobilePhone())
{
	$tags = <<<EOD
<script>
//<![CDATA[
var image_preview = {
%s
};
//]]>
</script>
EOD;

	$temp_arr = array();
	$func_arr = array('xe_validator_id', 'xe_run_method', 'mid_list');
	
	foreach($addon_info as $key => $val)
	{
		if(in_array($key, $func_arr) || $val == '') continue;

		array_push($temp_arr, '	"'.$key.'" : "'.$val.'"');
	}
	$params = implode($temp_arr, ','.PHP_EOL);
	$tags = sprintf($tags, $params);

	Context::addHtmlFooter($tags);

	Context::loadJavascriptPlugin('ui');
	Context::loadFile(array('./addons/image_preview/js/image_preview.min.js', 'body', '', null), true);
}

/* End of file image_preview.addon.php */
/* Location: ./addons/image_preview/image_preview.addon.php */
