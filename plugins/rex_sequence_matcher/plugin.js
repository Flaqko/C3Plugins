//Converted with C2C3AddonConverter v1.0.0.14
"use strict";

{
	const PLUGIN_ID = "Rex_SequenceMatcher";
	const PLUGIN_VERSION = "0.1.0.0";
	const PLUGIN_CATEGORY = "general";

	let app = null;

	const PLUGIN_CLASS = SDK.Plugins.Rex_SequenceMatcher = class Rex_SequenceMatcher extends SDK.IPluginBase
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
			this._info.SetIsSingleGlobal(false);
			this._info.SetIsDeprecated(false);
			this._info.SetSupportsEffects(false);
			this._info.SetMustPreDraw(false);
			this._info.SetCanBeBundled(false);
			SDK.Lang.PushContext(".properties");
			this._info.SetProperties([
				new SDK.PluginProperty("integer", "buffer-length", 10)
			]);
			this._info.AddFileDependency({
				filename: "c2runtime/rex_seqnenceMatcher.js",
				type: "inline-script"
			});			
			SDK.Lang.PopContext();		// .properties
			SDK.Lang.PopContext();
		}
	};
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
