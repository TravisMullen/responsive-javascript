// "use strict";

var rjs = {

	version: "0.0.1",


	config: {
		name: "responsive-javascript",
		attribTarget: "borderStyle",
		viewports: {
			small: "dashed",
			medium: "dotted",
			large: "double",
			xlarge: "groove"
		},
		tiggerPrefix: "viewport"
	},

	$window: $( window ),

	init: function( config ) {
		var that = this;

		// this.elm = $("[" + this.config.name + "]"); // attach to attrib
		this.elm = $("body"); // attach to body

		this.target = $( "<div />" , {
			id: this.config.name,
			style: "display:none;"
		});

		this.elm.append( this.target );

		that.pushTriggers();

		this.$window.resize(function() {
			that.pushTriggers();
		});

	},
	findViewPort: function( viewport ) {
		var ports = this.config.viewports;
		for (view in ports) {
		    if (viewport === ports[view]) {
		    	return view;
		    }
		}
	},
	findViewExclusions: function( viewport ) {
		var ports = this.config.viewports,
			exc = [];
		for (view in ports) {
		    if (viewport != ports[view]) {
		    	exc.push( view );
		    }
		}
		return exc;
	},
	pushTriggers: function() {
		var value = this.target.css( this.config.attribTarget ),
			vp = this.findViewPort( value ),
			excs = this.findViewExclusions( value );

		// for angularjs use `scope.$emit`
		this.$window.trigger( this.config.tiggerPrefix + ":" + vp );

		for (var i = excs.length - 1; i >= 0; i--) {
			this.$window.trigger( this.config.tiggerPrefix + ":not:" + excs[i] );
		};
	}
};


// rjs.init(); // has to load after modules dependent on it


