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
				intialOpen={ true }
			>
				<TextControl
					value={props.text_metafield}
					label={__("Add Video ID", "textdomain")}
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

registerPlugin( 'sidebar-sidebar', {
	icon: 'video',
	render: () => {
		return (
			<>
				{/*	<PluginSidebarMoreMenuItem
					target="sidebar-sidebar"
				>
					{__('Meta Options', 'textdomain')}
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="sidebar-sidebar"
					title={__('Meta Options', 'textdomain')}
				>
					<PluginMetaFields />
				</PluginSidebar>*/ }
				
				<PluginDocumentSettingPanel
					name="sidebar-sidebar"
					title={__('Featured Video', 'textdomain')} >
					<PluginMetaFields />
				</PluginDocumentSettingPanel>
			</>
		)
	}
})
