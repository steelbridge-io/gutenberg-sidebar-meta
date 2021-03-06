<?php
	/**
	 * Plugin Name: Gutenberg Sidebar Meta
	 * Plugin URI: https:parsonshosting.com
	 * Description: Provides meta fields in Gutenberg sidebar. Look for the coffee cup icon above sidebar.
	 * Author: Chris Parsons
	 * Author URI: https://steelbridge.io
	 */
	if( ! defined( 'ABSPATH') ) {
		exit;
	}
	
		include 'meta-box.php';
	
		function sidebar_enqueue_assets() {
			$tmp = get_page_template_slug( get_post( 'ID' ) ); // provide page/post ID
			if ( 'page-interview.php' == $tmp ) {
				wp_enqueue_script(
					'sidebar-gutenberg-sidebar',
					plugins_url( 'build/index.js', __FILE__ ),
					array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data' )
				);
			}
		}
		
		
		add_action( 'enqueue_block_editor_assets', 'sidebar_enqueue_assets' );
		
		function sidebar_register_meta() {
			register_meta( 'post', '_sidebar_vimeo_text_metafield', array(
				'show_in_rest'      => true,
				'type'              => 'string',
				//'single'            => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				}
			) );
		}
		
		add_action( 'init', 'sidebar_register_meta' );
	
		function sidebar_register_meta_youtube() {
			register_meta( 'post', '_sidebar_youtube_text_metafield', array(
				'show_in_rest'      => true,
				'type'              => 'string',
				//'single'            => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				}
			) );
		}
		
		add_action( 'init', 'sidebar_register_meta_youtube' );
		
	
