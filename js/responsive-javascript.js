"use strict";

(function ( global ){
    global.rjs = {

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

            // util lib
            this.buildUtility();

            this.pushTriggers();

            push = _.debounce( function() {
                that.pushTriggers();
            }, this.config.debounceTime );

            this.$window.on( 'resize' , push );

        },
        setConfig: function( config ) {
            var tmp = _.clone(config);

            tmp.name = config.name || this.config.name;
            tmp.attribTarget = config.attribTarget || this.config.attribTarget;
            if (config.breakpoints) {
                tmp.breakpoints.small = config.breakpoints.small || this.config.breakpoints.small;
                tmp.breakpoints.medium = config.breakpoints.medium || this.config.breakpoints.medium;
                tmp.breakpoints.large = config.breakpoints.large || this.config.breakpoints.large;
            }
            tmp.prefix = config.prefix || this.config.prefix;
            tmp.debounceTime = config.debounceTime || this.config.debounceTime;

            return tmp;
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
        buildUtility: function() {
            var ports = this.config.breakpoints,
                help = {},
                view,
                name;
            for (view in ports) {
                name = 'is' + view.charAt(0).toUpperCase() + view.slice(1);
                this[name] = help[name] = function() {
                    return this.viewport === view;
                };
            }
            return help;
        }
    };
}( this ));

// rjs.init(); // and go!

