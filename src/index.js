import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl,  ColorPicker } from "@wordpress/components";
import { withSelect, withDispatch } from "@wordpress/data";

let PluginMetaFields = (props) => {
	return (
		<>
			<PanelBody
				title={__("Vimeo Video ID", "textdomain")}
				icon="video-alt3"
				intialOpen={ false }
			>
				<TextControl
					value={props.text_metafield}
					label={__("Add Vimeo Video ID", "textdomain")}
					onChange={(value) => props.onMetaFieldChange(value)}
				/>
				
			</PanelBody>
		</>
	)
}

PluginMetaFields = withSelect(
	(select) => {
		return {
			text_metafield: select('core/editor').getEditedPostAttribute('meta')['_sidebar_vimeo_text_metafield']
		}
	}
)(PluginMetaFields);

PluginMetaFields = withDispatch(
	(dispatch) => {
		return {
			onMetaFieldChange: (value) => {
				dispatch('core/editor').editPost({meta: {_sidebar_vimeo_text_metafield: value}})
			}
		}
	}
)(PluginMetaFields);


let PluginMetaYoutube = (props) => {
	return (
		<>
			<PanelBody
				title={__("YouTube Video ID", "textdomain")}
				icon="video-alt3"
				intialOpen={ false }
			>
				<TextControl
					value={props.text_metafield_youtube}
					label={__("Add YouTube Video ID", "textdomain")}
					onChange={(value) => props.onYouTubeFieldChange(value)}
				/>
			
			</PanelBody>
		</>
	)
}

PluginMetaYoutube = withSelect(
	(select) => {
		return {
			text_metafield_youtube: select('core/editor').getEditedPostAttribute('meta')['_sidebar_youtube_text_metafield']
		}
	}
)(PluginMetaYoutube);

PluginMetaYoutube = withDispatch(
	(dispatch) => {
		return {
			onYouTubeFieldChange: (value) => {
				dispatch('core/editor').editPost({meta: {_sidebar_youtube_text_metafield: value}})
			}
		}
	}
)(PluginMetaYoutube);

registerPlugin( 'sidebar-sidebar', {
	icon: 'video',
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					name="sidebar-sidebar"
					title={__('Featured Video', 'textdomain')} >
					<PluginMetaFields />
					<PluginMetaYoutube />
				</PluginDocumentSettingPanel>
			</>
		)
	}
})
