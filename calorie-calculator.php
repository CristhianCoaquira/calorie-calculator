<?php

/**
 * Plugin Name: Calorie Calculator
 * Description: Calorie Calculator
 * Version: 1.0.0
 * License: GPLv2 or later
 * Text Domain: calorie-calculator
 *
 * @package calorie-calculator
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
	exit;
}

define('CALORIE_CALCULATOR_PLUGIN_DIR', plugin_dir_path(__FILE__));

if (!function_exists('calorie_scripts_basic')) {

	/**
	 * Enqueue Ketocist Calorie Calculator Script
	 */
	function calorie_scripts_basic()
	{
		// check whether your content has shortcode.
		wp_register_script('calorie-calculator-js', plugins_url('assets/js/calorie-calculator.js', __FILE__), array('jquery'), null, true);
	}

	add_action('wp_enqueue_scripts', 'calorie_scripts_basic');
}

if (!function_exists('calorie_style_basic')) {

	/**
	 * Enqueue Ketocist Calorie Calculator Style
	 */
	function calorie_style_basic()
	{
		wp_register_style('calorie-calculator-css', plugins_url('assets/css/calorie-calculator.css', __FILE__), array(), null, 'all');
	}

	add_action('wp_enqueue_scripts', 'calorie_style_basic');
}

if (!function_exists('calorie_calculator')) {

	/**
	 * Ketocist Calorie Calculator Shortcode
	 */
	function calorie_calculator()
	{
		wp_enqueue_style('calorie-calculator-css');
		wp_enqueue_script('calorie-calculator-js');
		load_template(dirname(__FILE__) . '/template-parts/calorie-calculator.php');
	}

	add_shortcode('calorie_calculator', 'calorie_calculator');
}

if (!function_exists('calorie_calculator_translation')) {
	/**
	 * Enable Support.
	 */
	function calorie_calculator_translation()
	{
		// Translate text from .mo files.
		load_theme_textdomain('calorie-calculator', CALORIE_CALCULATOR_PLUGIN_DIR . '/languages');
	}

	add_action('after_setup_theme', 'calorie_calculator_translation', 12);
}
