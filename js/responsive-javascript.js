"use strict";

var rjs = {

    version: "0.0.1",

    config: {
        name: "responsive-javascript",
        attribTarget: "borderStyle",
        breakpoints: {
            small: "dashed",
            medium: "dotted",
            large: "double"
        },
        prefix: "viewport"
    },

    $window: $( window ),

    init: function() {
        var that = this,
            push;

        // this.elm = $("[" + this.config.name + "]"); // attach to attrib
        this.elm = $( 'body' ); // attach to body

        this.target = $( '<div />' , {
            'class': this.config.name,
            'style': "display:none;"
        });

        this.elm.append( this.target );

        this.pushTriggers();
        
        // ** requires 
        // https://lodash.com/docs#debounce
        // or
        // http://underscorejs.org/#debounce
        
        push = _.debounce( function() {
            that.pushTriggers();
        }, 30);

        this.$window.on( 'resize' , push );

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
        this.$window.trigger( this.config.prefix + ":" + vp );
        console.log("vp",vp);

        this.viewport = vp; // add to namespace

        for (var i = excs.length - 1; i >= 0; i--) {
            this.$window.trigger( this.config.prefix + ":not:" + excs[i] );
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

