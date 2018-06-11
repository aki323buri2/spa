<?php
if (!function_exists('baseameWithoutExtension'))
{
	function basenameWithoutExtension($path)
	{
		return preg_replace('/\.[^.]+$/', '', basename($path));
	}
}