﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Rex_jsshell = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Rex_jsshell.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	
	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
		// function call
		this.functionName = "";
		this.functionParams = [];
		this.returnValue = null;
        this.c2FnType = null;		

        // callback
        this.callbackTag = "";   
        this.callbackParams = [];   // callbackParams
        var self=this;
        this.getCallback = function(callbackTag)
        {
            if (callbackTag == null)
                return null;
        
            var cb = function ()
            {
                self.callbackTag = callbackTag;            
                cr.shallowAssignArray(self.callbackParams, arguments);
                self.runtime.trigger(cr.plugins_.Rex_jsshell.prototype.cnds.OnCallback, self); 
            }
            return cb;
        };

        this.getC2FnCallback = function(c2FunctionName)
        {
            if (c2FunctionName == null)
                return null;
        
            var cb = function ()
            {
				self.callC2Fn(c2FunctionName, arguments);
            }
            return cb;
        };
	};
    
	instanceProto.onDestroy = function ()
	{
	};   

    instanceProto.LoadAPI = function(src, onload_, onerror_)
	{
	    var scripts=document.getElementsByTagName("script");
	    var exist=false;
	    for(var i=0;i<scripts.length;i++)
	    {
	    	if(scripts[i].src.indexOf(src) != -1)
	    	{
	    		exist=true;
	    		break;
	    	}
	    }
	    if(!exist)
	    {
	    	var newScriptTag=document.createElement("script");
            newScriptTag["type"] = "text/javascript";
            newScriptTag["src"] = src;
            
            // onLoad callback
            var self=this;        
            var onLoad = function()
            {
                self.isLoaded = true;
                if (onload_)
                    onload_();
            };
            var onError = function()
            {
                if (onerror_)
                    onerror_();
            };        
            newScriptTag["onload"] = onLoad;
            newScriptTag["onerror"] = onError;            
	    	document.getElementsByTagName("head")[0].appendChild(newScriptTag);
	    }
	};	

	instanceProto.getC2FnType = function ()
	{
        if (this.c2FnType === null)
        {
            if (window["c2_callRexFunction2"])
                this.c2FnType = "c2_callRexFunction2";
            else if (window["c2_callFunction"])
                this.c2FnType = "c2_callFunction";            
            else
                this.c2FnType = "";
        }
        return this.c2FnType;
	};   

     // [fnName, param0, param1, ….]
    var gC2FnParms = [];
    instanceProto.callC2Fn = function (c2FnName, params)
    {
        var c2FnGlobalName = this.getC2FnType();
        if (c2FnGlobalName === "")
            return 0;
        
        var i, cnt=params.length;
        gC2FnParms.length = 0;        
        for(i=0; i<cnt; i++)
        {
            gC2FnParms.push( din(params[i]) );
        }
        var retValue = window[c2FnGlobalName](c2FnName, gC2FnParms);
        gC2FnParms.length = 0;
        
        return retValue;
    };		

    var invokeFunction = function (functionName, params, isNewObject)
	{
		var names = functionName.split(".");
		var fnName = names.pop();
		var o = getValue(names, window);

        var retValue;
		if (isNewObject)
		{
			params.unshift(null);			
			retValue = new (Function.prototype.bind.apply(o[fnName], params));
		}
		else
		{
            retValue = o[fnName].apply(o, params);
		}
        return retValue;
	}; 	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	pluginProto.cnds = new Cnds();    

	Cnds.prototype.OnCallback = function (tag)
	{
		return cr.equals_nocase(tag, this.callbackTag);
	};
	//////////////////////////////////////
	// Actions
	function Acts() {};
	pluginProto.acts = new Acts();

    Acts.prototype.InvokeFunction = function (varName)
	{
		if (this.functionName === "")
		    return;
        		
		var params = this.functionParams;
		this.functionParams = [];	
		this.returnValue = invokeFunction(this.functionName, params);
		if (varName !== "")		
		{
			setValue(varName, this.returnValue, window);
		}
	}; 

    Acts.prototype.CreateInstance = function (varName)
	{
		if (varName === "")
		    return;
		if (this.functionName === "")
		    return;
               		
		var params = this.functionParams;
		this.functionParams = [];				
		var o = invokeFunction(this.functionName, params, true);
		setValue(varName, o, window);
	}; 	
    
    Acts.prototype.SetFunctionName = function (name)
	{
        this.functionName = name;      
	}; 

    Acts.prototype.AddValue = function (v)
	{
		this.functionParams.push(v);      
	};     

    Acts.prototype.AddJSON = function (v)
	{
		this.functionParams.push(JSON.parse(v));      
	};    

    Acts.prototype.AddBoolean = function (v)
	{
		this.functionParams.push(v === 1);      
	}; 

    Acts.prototype.AddCallback = function (callbackTag)
	{
		this.functionParams.push( this.getCallback(callbackTag) );      
	};

    Acts.prototype.AddNull = function ()
	{
		this.functionParams.push( null );      
	};

    Acts.prototype.AddObject = function (varName)
	{
		this.functionParams.push( getValue(varName, window) );      
	};    	

    Acts.prototype.AddC2Callback = function (c2FnName)
	{
		this.functionParams.push( this.getC2FnCallback(c2FnName) );      
	};

    Acts.prototype.SetProp = function (varName, value)
	{
		setValue(varName, value, window);
	};  

    Acts.prototype.LoadAPI = function (src, successTag, errorTag)
	{
		this.LoadAPI(src, this.getCallback(successTag), this.getCallback(errorTag));   
	};
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	pluginProto.exps = new Exps();

	Exps.prototype.Param = function (ret, index, keys, default_value)
	{             
        var val = this.callbackParams[index];   
		if (typeof(keys) === "number")
		{
		    keys = [keys];
		}
		ret.set_any( getItemValue(val, keys, default_value) );
	}; 

	Exps.prototype.ParamCount = function (ret)
	{
		ret.set_int( this.callbackParams.length );
	}; 

	Exps.prototype.ReturnValue = function (ret, keys, default_value)
	{        
		ret.set_any( getItemValue(this.returnValue, keys, default_value) );
	}; 

	Exps.prototype.Prop = function (ret, keys, default_value)
	{        
		ret.set_any( getItemValue(window, keys, default_value) );
	}; 
    
    var PARAMTYPE_VALUE = 0;
    var PARAMTYPE_JSON = 1;
    var PARAMTYPE_CALLBACK = 2;
    var PARAMTYPE_VAR = 3;
    var PARAMTYPE_C2FN = 4;  
    var gExpPattern = /^@#@(\[.*\])@#@/;
	Exps.prototype.Call = function (ret, functionName)
	{       
        var params = [];
        var i, cnt=arguments.length;
        for(i=2; i<cnt; i++)
        {
            var param = arguments[i];
            if ((typeof(param) === "string") && (gExpPattern.test(param)))
            {
                param = param.match(gExpPattern)[1];
                param = JSON.parse(param);
                switch (param[0])
                {
                case PARAMTYPE_VALUE:    param = param[1];                       break;
                case PARAMTYPE_JSON:     param = param[1];                       break;
                case PARAMTYPE_CALLBACK: param = this.getCallback(param[1]);     break;
                case PARAMTYPE_VAR:      param = getValue(param[1], window);     break;
                case PARAMTYPE_C2FN:     param = this.getC2FnCallback(param[1]); break;
                default: param = null;
                }
            }
            params.push(param);
        }
        var retValue = invokeFunction(functionName, params);
		ret.set_any( din(retValue) );
	}; 

	Exps.prototype.ValueParam = function (ret, value)
	{        
        var param = [PARAMTYPE_VALUE, value];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	}; 

	Exps.prototype.JSONParam = function (ret, s)
	{        
        var param = [PARAMTYPE_JSON, JSON.parse(s)];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	};

	Exps.prototype.BooleanParam = function (ret, b)
	{        
        var param = [PARAMTYPE_VALUE, (b===1)];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	};

	Exps.prototype.CallbackParam = function (ret, fnName)
	{        
        var param = [PARAMTYPE_CALLBACK, fnName];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	};

	Exps.prototype.NullParam = function (ret)
	{        
        var param = [PARAMTYPE_VALUE, null];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	};

	Exps.prototype.ObjectParam = function (ret, varName)
	{        
        var param = [PARAMTYPE_VAR, varName];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	};    

	Exps.prototype.C2FnParam = function (ret, fnName)
	{        
        var param = [PARAMTYPE_C2FN, fnName];
        param = "@#@" +JSON.stringify(param)+ "@#@";
	    ret.set_string( param );
	}; 

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------    
    // ------------------------------------------------------------------------   	

	var getValue = function(keys, root)
	{           
        if ((keys == null) || (keys === "") || (keys.length === 0))
        {
            return root;
        }
        else
        {
            if (typeof (keys) === "string")
                keys = keys.split(".");
            
            var i,  cnt=keys.length, key;
            var entry = root;
            for (i=0; i< cnt; i++)
            {
                key = keys[i];                
                if (entry.hasOwnProperty(key))
                    entry = entry[ key ];
                else
                    return;              
            }
            return entry;                    
        }
	}; 

        
	var getEntry = function(keys, root, defaultEntry)
	{
        var entry = root;
        if ((keys === "") || (keys.length === 0))
        {
            //entry = root;
        }
        else
        {
            if (typeof (keys) === "string")
                keys = keys.split(".");
            
            var i,  cnt=keys.length, key;
            for (i=0; i< cnt; i++)
            {
                key = keys[i];                
                if ( (entry[key] == null) || (typeof(entry[key]) !== "object") )                
                {
                    var newEntry;
                    if (i === cnt-1)
                    {
                        newEntry = defaultEntry || {};
                    }
                    else
                    {
                        newEntry = {};
                    }
                    
                    entry[key] = newEntry;
                }
                
                entry = entry[key];            
            }           
        }
        
        return entry;
	};  

	var setValue = function(keys, value, root)
	{        
        if ((keys === "") || (keys.length === 0))
        {
            if ((value !== null) && typeof(value) === "object")
            {
				root = value;
            }
        }
        else
        {            
            if (typeof (keys) === "string")
                keys = keys.split(".");
            
            var lastKey = keys.pop(); 
            var entry = getEntry(keys, root);
            entry[lastKey] = value;
        }
	}; 	

 	var getItemValue = function (item, k, default_value)
	{
		return din(getValue(k, item), default_value);
	};	    
    
    var din = function (d, default_value)
    {       
        var o;
	    if (d === true)
	        o = 1;
	    else if (d === false)
	        o = 0;
        else if (d == null)
        {
            if (default_value != null)
                o = default_value;
            else
                o = 0;
        }
        else if (typeof(d) == "object")
            o = JSON.stringify(d);
        else
            o = d;
	    return o;
    };    
}());