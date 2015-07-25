"use strict";

// ** requires 
// https://lodash.com/docs#debounce
// or
// http://underscorejs.org/#debounce

var rjs = {

    version: "1.0.1",

    config: {
        name: "responsive-javascript",
        attribTarget: "borderStyle",
        breakpoints: {
            small: "dashed",
            medium: "dotted",
            large: "double"
        },
        prefix: "viewport",
        debounceTime: 30
    },

    $window: $( window ),
    viewport: undefined,

    init: function( config ) {
        var that = this,
            push;

        if ( _.isObject( config ) ) {
            this.config = this.setConfig( config );
        } else if ( _.isNumber( config ) ) {
            this.config.debounceTime = config;
        }

        // this.elm = $("[" + this.config.name + "]"); // attach to attrib
        this.elm = $( 'body' ); // attach to body

        this.target = $( '<div />' , {
            'class': this.config.name,
            'style': "display:none;"
        });

        this.elm.append( this.target );

        this.pushTriggers();

        push = _.debounce( function() {
            that.pushTriggers();
        }, this.config.debounceTime );

        this.$window.on( 'resize' , push );

    },
    setConfig: function( config ) {
        return {
            name: config.name || this.config.name,
            attribTarget: config.attribTarget || this.config.attribTarget,
            breakpoints: {
                small: config.breakpoints && config.breakpoints.small || this.config.breakpoints.small,
                medium: config.breakpoints && config.breakpoints.medium || this.config.breakpoints.medium,
                large: config.breakpoints && config.breakpoints.large || this.config.breakpoints.large
            },
            prefix: config.prefix || this.config.prefix,
            debounceTime: config.debounceTime || this.config.debounceTime
        }
    },
    findViewPort: function( viewport ) {
        var ports = this.config.breakpoints,
            view;
        for (view in ports) {
            if (viewport === ports[view]) {
                return view;
            }
        }
    },
    findViewExclusions: function( viewport ) {
        var ports = this.config.breakpoints,
            exc = [],
            view;
        for (view in ports) {
            if (viewport !== ports[view]) {
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
        this.$window.trigger( this.config.prefix + ':' + vp + ':resize' );
        for (var i = excs.length - 1; i >= 0; i--) {
            this.$window.trigger( this.config.prefix + ':not:' + excs[i] + ':resize' );
        };

        // if viewport has changed fire trigger
        if ( this.viewport === vp ) {
            return;
        }
        this.viewport = vp;
        this.$window.trigger( this.config.prefix + ':' + vp );
        for (var i = excs.length - 1; i >= 0; i--) {
            this.$window.trigger( this.config.prefix + ':not:' + excs[i] );
        };
    },
    isSmall: function() {
        return this.viewport === 'small';
    },
    isMedium: function() {
        return this.viewport === 'medium';
    },
    isLarge: function() {
        return this.viewport === 'large';
    }
};

// rjs.init(); // has to load after modules dependent on it

