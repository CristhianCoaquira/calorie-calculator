<?php

/**
 * Plugin Name: Keto Calculator
 * Description: Keto Calculator
 * Version: 1.4.7
 * License: GPLv2 or later
 * Text Domain: keto-calculator
 *
 * @package keto-calculator
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
	exit;
}

define('KETOCALCULATOR_PLUGIN_DIR', plugin_dir_path(__FILE__));

if (!function_exists('keto_scripts_basic')) {

	/**
	 * Enqueue Ketocist Keto Calculator Script
	 */
	function keto_scripts_basic()
	{
		// check whether your content has shortcode.
		wp_register_script('keto-calculator-js', plugins_url('assets/js/keto-calculator.js', __FILE__), array('jquery'), null, true);
	}

	add_action('wp_enqueue_scripts', 'keto_scripts_basic');
}

if (!function_exists('keto_style_basic')) {

	/**
	 * Enqueue Ketocist Keto Calculator Style
	 */
	function keto_style_basic()
	{
		wp_register_style('keto-calculator-css', plugins_url('assets/css/keto-calculator.css', __FILE__), array(), null, 'all');
	}

	add_action('wp_enqueue_scripts', 'keto_style_basic');
}

if (!function_exists('keto_calculator')) {

	/**
	 * Ketocist Keto Calculator Shortcode
	 */
	function keto_calculator()
	{
		wp_enqueue_style('keto-calculator-css');
		wp_enqueue_script('keto-calculator-js');
		load_template(dirname(__FILE__) . '/template-parts/keto-calculator.php');
	}

	add_shortcode('keto_calculator', 'keto_calculator');
}

if (!function_exists('keto_calculator_translation')) {
	/**
	 * Enable Support.
	 */
	function keto_calculator_translation()
	{
		// Translate text from .mo files.
		load_theme_textdomain('keto-calculator', KETOCALCULATOR_PLUGIN_DIR . '/languages');
	}

	add_action('after_setup_theme', 'keto_calculator_translation', 12);
}
