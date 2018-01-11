//Converted with C2C3AddonConverter v1.0.0.14
"use strict";

{
	const PLUGIN_ID = "rex_bbcodeText";
	const PLUGIN_VERSION = "0.1.0.0";
	const PLUGIN_CATEGORY = "general";

	let app = null;

	const PLUGIN_CLASS = SDK.Plugins.rex_bbcodeText = class rex_bbcodeText extends SDK.IPluginBase
	{
		constructor()
		{
			super(PLUGIN_ID);
			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
			this._info.SetIcon("icon.png", "image/png");
			this._info.SetName(lang(".name"));
			this._info.SetDescription(lang(".description"));
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("Rex.Rainbow");
			this._info.SetHelpUrl(lang(".help-url"));
			this._info.SetPluginType("world");
			this._info.SetIsResizable(true);
			this._info.SetIsRotatable(false);
			this._info.SetHasImage(false);
			this._info.SetIsTiled(false);
			this._info.SetIsSingleGlobal(false);
			this._info.SetIsDeprecated(false);
			this._info.SetSupportsEffects(true);
			this._info.SetMustPreDraw(false);
			this._info.SetCanBeBundled(false);
			this._info.AddCommonPositionACEs();
			this._info.AddCommonSizeACEs();
			this._info.AddCommonPositionACEs();
			this._info.AddCommonAppearanceACEs();
			this._info.AddCommonZOrderACEs();
			SDK.Lang.PushContext(".properties");
			this._info.SetProperties([
				new SDK.PluginProperty("longtext", "text", "Text"),
                new SDK.PluginProperty("font", "font", "Arial"),
				new SDK.PluginProperty("integer", "font-size", 12),
				new SDK.PluginProperty("integer", "line-height", 0),
				new SDK.PluginProperty("check", "bold", false),
				new SDK.PluginProperty("check", "italic", false),
				new SDK.PluginProperty("color", "color",[0,0,0]),
				new SDK.PluginProperty("combo", "horizontal-alignment", {initialValue:"left", items:["left","center","right"]}),
				new SDK.PluginProperty("combo", "vertical-alignment", {initialValue:"top", items:["top","center","bottom"]}),
				new SDK.PluginProperty("combo", "wrapping", {initialValue:"word", items:["word","character"]}),
                new SDK.PluginProperty("check", "initial-visibility", true),				
				new SDK.PluginProperty("combo", "hotspot", {initialValue:"top-left", items:["top-left","top","top-right","left","center","right","bottom-left","bottom","bottom-right"]}),
				new SDK.PluginProperty("combo", "baseline", {initialValue:"top", items:["alphabetic","top"]}),
				new SDK.PluginProperty("float", "shift-down", 13),
				new SDK.PluginProperty("combo", "force-render", {initialValue:"no", items:["no","yes"]}),
				new SDK.PluginProperty("combo", "lock-canvas-size", {initialValue:"no", items:["no","yes"]}),
				new SDK.PluginProperty("group", "stroke"),
				new SDK.PluginProperty("integer", "stroke-line-width", 1),
				new SDK.PluginProperty("combo", "stroke-line-join", {initialValue:"miter", items:["miter","round","bevel"]}),
				new SDK.PluginProperty("group", "underline"),
				new SDK.PluginProperty("integer", "underline-thickness", 1),
				new SDK.PluginProperty("integer", "underline-offset-y", 0),
				new SDK.PluginProperty("group", "shadow"),
				new SDK.PluginProperty("integer", "shadow-offset-x", 10),
				new SDK.PluginProperty("integer", "shadow-offset-y", 10),
				new SDK.PluginProperty("integer", "shadow-blur", 20),
				new SDK.PluginProperty("color", "shadow-color",[0,0,0]),
				new SDK.PluginProperty("group", "background"),
				new SDK.PluginProperty("text", "background-color", "")
			]);
			this._info.AddFileDependency({
				filename: "c2runtime/rex_objCacheKlass.js",
				type: "inline-script"
			});			
			this._info.AddFileDependency({
				filename: "c2runtime/rex_text2Lines.js",
				type: "inline-script"
			});	
			this._info.AddFileDependency({
				filename: "c2runtime/rex_canvasText.js",
				type: "inline-script"
			});												
			this._info.AddFileDependency({
				filename: "c2runtime/rex_imageBank.js",
				type: "inline-script"
			});						
			SDK.Lang.PopContext();		// .properties
			SDK.Lang.PopContext();
		}
	};
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
