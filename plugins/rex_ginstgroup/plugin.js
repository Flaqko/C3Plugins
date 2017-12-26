//Converted with C2C3AddonConverter v1.0.0.14
"use strict";

{
	const PLUGIN_ID = "Rex_gInstGroup";
	const PLUGIN_VERSION = "1.0.0.0";
	const PLUGIN_CATEGORY = "data-and-storage";

	let app = null;

	const PLUGIN_CLASS = SDK.Plugins.Rex_gInstGroup = class Rex_gInstGroup extends SDK.IPluginBase {
		constructor() {
			super(PLUGIN_ID);
			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
			this._info.SetIcon("icon.png", "image/png");
			this._info.SetName(lang(".name"));
			this._info.SetDescription(lang(".description"));
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("Rex.Rainbow");
			this._info.SetHelpUrl(lang(".help-url"));
			this._info.SetIsSingleGlobal(false);
			this._info.SetIsDeprecated(false);
			this._info.SetSupportsEffects(false);
			this._info.SetMustPreDraw(false);
			this._info.SetCanBeBundled(false);
			SDK.Lang.PushContext(".properties");
			this._info.SetProperties([]);
			this._info.AddFileDependency({
				filename: "c2runtime/rex_pickUIDs.js",
				type: "inline-script"
			});
			this._info.AddFileDependency({
				filename: "c2runtime/rex_group.js",
				type: "inline-script"
			});
			this._info.AddFileDependency({
				filename: "c2runtime/rex_shuffleArr.js",
				type: "inline-script"
			});			
			SDK.Lang.PopContext(); // .properties
			SDK.Lang.PopContext();
		}
	};
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}