# Responsive Javascript.
_CSS driven JavaScript._ Use responsive media queries to trigger JavaScript events. Utility functions also available.

*Keep your JS and CSS in sync at all times!*

## Responsive Events
- A responsive event will be trigger once on page load and each time a viewport breakpoint has been crossed. 
- Responsive event will be triggered for the following viewport breakpoints `viewport:small`, `viewport:medium`, `viewport:large`, `viewport:xlarge`. 
- Breakpoints are mapped to [CSS media queries](https://github.com/TravisMullen/responsive-javascript/blob/master/css/responsive-javascript.css) ([SCSS version available](https://github.com/TravisMullen/responsive-javascript/blob/master/scss/responsive-javascript.scss)) 
- Also has `viewport:not:*` events.

```js
$( window ) // listen to events on $(window)
    .on('viewport:small', function() {
            // do something to the small viewport
        })
    .on('viewport:not:small', function() {
            // do something to the medium and larger viewports
        });
```

*Resize Event*
To continuously listen for a `resize` event within a viewport use `viewport:*:resize`. This will be throttled by the [_.debounce](https://lodash.com/docs#debounce) specified in the config. 

```js
$( window )
    .on('viewport:small:resize', function() {
            // do something on every resize event to the small viewport
        })
    .on('viewport:not:small:resize', function() {
            // do something on every resize event to the medium and larger viewports
        });
```

Use CSS or SCSS variables to set JS breakpoints. Set-up listeners to activate/deactivate JS modules, shiv JS styles, or whatever you need. JS and CSS always stay in sync.


##Utility Functions 

Call off `rsj` namespace once instantiated.
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


## Initiation and Config Options

Just call `init()` function and its ready to go!
```js
    rjs.init();
```

Pass in number to change [_.debounce](https://lodash.com/docs#debounce) timeout
```js
    rjs.init( 100 );
```

Pass in object to change master config. Be sure to update [CSS](https://github.com/TravisMullen/responsive-javascript/blob/master/css/responsive-javascript.css) or [SCSS](https://github.com/TravisMullen/responsive-javascript/blob/master/scss/responsive-javascript.scss) style rules accordingly. 
```js
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
    } )
```

_Requires_
- jQuery (or similar library for selectors and `.trigger`), provided `.css` and `.js` for use.
- [Lodash](https://lodash.com/docs#debounce) or [Underscore.js](http://underscorejs.org/#debounce)

Gotcha: Load `responsive-javascript.js` library or initiate `rjs.init();` after trigger `.on('viewport:*')` dependencies have been declared. 

Provided style dependencies as both `.css` and `.scss`.

See `h5bp/js/main.js` for example of use.



Copyright (c) 2014 BOOM.BANG.MEDIA.LLC, TravisMullen.com