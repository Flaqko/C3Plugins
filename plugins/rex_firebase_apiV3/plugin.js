//Converted with C2C3AddonConverter v1.0.0.8
"use strict";

{
	const PLUGIN_ID = "Rex_FirebaseAPIV3";
	const PLUGIN_VERSION = "3.3.0.0";
	const PLUGIN_CATEGORY = "web";

	let app = null;

	const PLUGIN_CLASS = SDK.Plugins.Rex_FirebaseAPIV3 = class Rex_FirebaseAPIV3 extends SDK.IPluginBase {
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
			SDK.Lang.PushContext(".properties");
			this._info.SetProperties([
				new SDK.PluginProperty("text", "api-key", ""),
				new SDK.PluginProperty("text", "auth-domain", ""),
				new SDK.PluginProperty("text", "database-url", ""),
				new SDK.PluginProperty("text", "storage-bucket", ""),
				new SDK.PluginProperty("check", "log", false)
			]);
			this._info.AddFileDependency({
				filename: "firebase.js",
				type: "external-script"
			});
			this._info.AddFileDependency({
				filename: "c2runtime/rex_firebaseAddAfterInitializeHandler.js",
				type: "inline-script"
			});
			this._info.AddFileDependency({
				filename: "c2runtime/rex_firebaseCallbackMapKlass.js",
				type: "inline-script"
			});		
			this._info.AddFileDependency({
				filename: "c2runtime/rex_firebaseItemListKlass.js",
				type: "inline-script"
			});
			this._info.AddFileDependency({
				filename: "c2runtime/rex_keys2Value.js",
				type: "inline-script"
			});						
			SDK.Lang.PopContext();		// .properties
			SDK.Lang.PopContext();
		}
	};
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
