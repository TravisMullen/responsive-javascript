# Responsive Javascript.
_CSS driven JavaScript._ Use responsive media queries to trigger JavaScript events. Utility functions also available.

This is a concept and technical approach for responsive design. **Keep your JS and CSS in sync!**

## Responsive Events
- A responsive event will be triggered once on page load and each time a viewport breakpoint has been crossed. 
- Responsive events will be triggered for the following viewport breakpoints `viewport:small`, `viewport:medium`, `viewport:large`. 
- Breakpoints are mapped to [CSS media queries](https://github.com/TravisMullen/responsive-javascript/blob/master/css/responsive-javascript.css) ([SCSS version available](https://github.com/TravisMullen/responsive-javascript/blob/master/scss/responsive-javascript.scss)) 
- Also has `viewport:not:*` events.

```js
$( window ) // listen to events on $(window)
    .on('viewport:small', function() {
            // do something to the small viewport
        })
    .on('viewport:not:small', function() {
            // do something to the medium and large viewports
        });
```

###Resize Event
To continuously listen for a `resize` event within a viewport use `viewport:*:resize`. This will be throttled by the [_.debounce](https://lodash.com/docs#debounce) wait time specified in the config. 

```js
$( window )
    .on('viewport:small:resize', function() {
            // do something on every resize event in the small viewport
        })
    .on('viewport:not:small:resize', function() {
            // do something on every resize event within the medium and large viewports
        });
```

Use CSS or SCSS variables to set JS breakpoints. Set-up listeners to activate/deactivate JS modules, shiv JS styles, or whatever you need. JS and CSS always stay in sync.


##Utility Functions 

Call off `rsj` namespace once instantiated. Functions are created based on key names defened in `config.breakpoints`.

Check for "is current viewport" `isBreakpointname`
```js
if ( rjs.isSmall() ) {
    // do something for small 
}
if ( rjs.isMedium() ) {
    // do something for medium
}
if ( rjs.isLarge() ) {
    // do something for large
}
```

Check for "is current or larger viewport" `isBreakpointnameUp`
```js
if ( rjs.isSmallUp() ) {
    // do something for small, medium, and large
}
if ( rjs.isMediumUp() ) {
    // do something for medium, and large
}
if ( rjs.isLargeUp() ) {
    // do something for large
}

```

Check for "is current or smaller viewport" `isBreakpointname`
```js
if ( rjs.isSmallDown() ) {
    // do something for small 
}
if ( rjs.isMediumDown() ) {
    // do something for small and medium
}
if ( rjs.isLargeDown() ) {
    // do something for small, medium and large
}
```


## Initiation and Config Options


Just call `init()` function and its ready to go!
```js
    rjs.init();
```
_Default config values_ 
```js
    {
        name: "responsive-javascript", // class name
        attribTarget: "borderStyle", // style property
        breakpoints: { // style values of property to map
            small: "dashed",
            medium: "dotted",
            large: "double"
        },
        prefix: "viewport", // prefix for trigger name
        debounceTime: 30 // _.debounce wait time in milliseconds
    }
```

Pass in number to change [_.debounce](https://lodash.com/docs#debounce) wait time 
```js
    rjs.init( 100 ); // in milliseconds
```

Pass in object to change master config. Be sure to update [CSS](https://github.com/TravisMullen/responsive-javascript/blob/master/css/responsive-javascript.css) or [SCSS](https://github.com/TravisMullen/responsive-javascript/blob/master/scss/responsive-javascript.scss) style rules accordingly. 
```js
    // example with custom config values
    rsj.init( {
        name: "my-custom-class-name",
        attribTarget: "borderColor",
        breakpoints: {
            small: "red",
            medium: "green",
            large: "purple"
        },
        prefix: "vp",
        debounceTime: 100
    } );
```

## Add Breakpoints

Add viewport names and new style rules to the config object on `init()`. Since `borderStyle` is already declared as the default style property the below example will expand on it by using `inset` and `ridge` values.
```js
    rsj.init( {
        breakpoints: {
            xlarge: "inset",
            xxlarge: "ridge"
        }
    } );
```

Add new style rules to the [CSS](https://github.com/TravisMullen/responsive-javascript/blob/master/css/responsive-javascript.css) (or [SCSS](https://github.com/TravisMullen/responsive-javascript/blob/master/scss/responsive-javascript.scss)) file.
```css
/* xlarge viewport */
@media only screen and (min-width: 92em) {
    .responsive-javascript {
        border-style: inset;
    }
}
/* xxlarge viewport */
@media only screen and (min-width: 124em) {
    .responsive-javascript {
        border-style: ridge;
    }
}
```

Instantiate new triggers to target
```js
$( window )
    .on('viewport:xlarge', function() {
            // do something to the xlarge viewport
        })
    .on('viewport:xxlarge', function() {
            // do something to the xxlarge viewport
        })
    .on('viewport:not:xxlarge', function() {
            // do something to the small, medium, large and xlarge viewports
        });
```

Dynamically Created Utility Functions 
```js
if ( rjs.isXlarge() ) {
    // do something for xlarge
}
if ( rjs.isXxlarge() ) {
    // do something for xxlarge
}
```

###Requires
- jQuery (or similar library for selectors and `.trigger`), provided `.css` and `.js` for use.
- [Lodash](https://lodash.com/docs#debounce) or [Underscore.js](http://underscorejs.org/#debounce)

Gotcha: Load `responsive-javascript.js` library or initiate `rjs.init();` after trigger `.on('viewport:*')` dependencies have been declared. 

Provided style dependencies as both `.css` and `.scss`.

See `h5bp/js/main.js` for example of use.



Copyright (c) 2014 BOOM.BANG.MEDIA.LLC, TravisMullen.com