"use strict";

(function ( global ){

    function setConfig( config, inst ) {
        var tmp = _.clone(config);

        tmp.name = config.name || inst.config.name;
        tmp.attribTarget = config.attribTarget || inst.config.attribTarget;
        tmp.breakpoints = config.breakpoints || inst.config.breakpoints;
        tmp.prefix = config.prefix || inst.config.prefix;
        tmp.debounceTime = config.debounceTime || inst.config.debounceTime;

        return tmp;
    }

    function findViewPort( viewport, inst ) {
        var ports = inst.config.breakpoints,
            view;
        for (view in ports) {
            if (viewport === ports[view]) {
                return view;
            } 
        }
        return false;
    };

    function findViewExclusions( viewport, inst ) {
        var ports = inst.config.breakpoints,
            exc = [],
            view;
        for (view in ports) {
            if (viewport !== ports[view]) {
                exc.push( view );
            }
        }
        return exc;
    };

    function getBreakpointKeys( viewport, inst ) {
        var ports = inst.config.breakpoints,
            exc = [],
            view;
        for (view in ports) {
            exc.push( view );
        }
        return exc;
    };

    function buildPortCompare( view, inst ) {
        return function() {
            return inst.viewport === view;
        };
    }

    function buildPortCompareGreater( ports, view, index, inst ) {
        return function() {
            var filteredPorts = ports.slice( index, ports.length );
            return filteredPorts.indexOf( inst.viewport ) >= 0;
        };
    }

    function buildPortCompareLesser( ports, view, index, inst ) {
        return function() {
            var filteredPorts = ports.slice( index, ports.length );
            return filteredPorts.indexOf( inst.viewport ) <= 0;
        };
    }

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
        push: undefined,
        target: undefined, 

        init: function( config ) {
            var that = this;

            if ( _.isObject( config ) ) {
                this.config = setConfig( config, this );
            } else if ( _.isNumber( config ) ) {
                this.config.debounceTime = config;
            }

            this.elm = $( 'body' );

            if ( this.target ) {
                this.target.remove();
            }
            this.target = $( '<div />' , {
                'class': this.config.name,
                'style': "display:none;"
            });
            this.elm.append( this.target );

            
            if ( this.push ) {
                this.$window.off( 'resize' , this.push );
            }
            
            this.pushTriggers();

            // util lib
            this.buildUtility();
            
            
            this.push = _.debounce( function() {
                that.pushTriggers();
            }, this.config.debounceTime );

            this.$window.on( 'resize' , this.push );

        },
        pushTriggers: function() {
            var value = this.target.css( this.config.attribTarget ),
                vp = findViewPort( value, this ),
                excs = findViewExclusions( value, this );

            // for angularjs use `scope.$emit`
            this.$window.trigger( this.config.prefix + ':' + vp + ':resize' );
            for (var i = excs.length - 1; i >= 0; i--) {
                this.$window.trigger( this.config.prefix + ':not:' + excs[i] + ':resize' );
            };

            // if viewport has changed fire trigger
            // protects against refire if init() is called repetitively 
            if ( this.viewport === vp ) {
                return;
            }
            this.viewport = vp;
            this.$window.trigger( this.config.prefix + ':' + vp );
            for (var i = excs.length - 1; i >= 0; i--) {
                this.$window.trigger( this.config.prefix + ':not:' + excs[i] );
            };
        },
        buildUtility: function( config ) {
            var ports = this.config.breakpoints,
                bps = getBreakpointKeys( ports, this ),
                view,
                name,
                index = 0;

            // if calling `buildUtility` then allow for new config 
            // this would allow for you to change breakpoints and update util fns if needed
            if ( _.isObject( config ) ) {
                if ( !_.isObject( config.breakpoints ) ) {
                    config.breakpoints = config;
                }
                this.init( config );
            }
            // add fns to namespace
            for (view in ports) {

                // format fn names `isKeyname` of config.breakpoints
                name = 'is' + view.charAt(0).toUpperCase() + view.slice(1);

                // `isKeyname fns
                this[ name ] = buildPortCompare( view, this );

                // `isKeynameUp fns
                this[ name + 'Up' ] = buildPortCompareGreater( bps, view, index, this );

                // `isKeynameDown fns
                this[ name + 'Down' ] = buildPortCompareLesser( bps, view, index, this );

                index++;
            }
        }
    };
}( this ));

// rjs.init(); // and go!
