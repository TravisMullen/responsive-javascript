## responsive-javascript.js

Version `0.0.1`

- Keep your JS and CSS in sync at all times.
- Keep your breakpoint declarations out of your JS. Keep style rules in the style-sheet.
- Selectively toggle JS functionality using omitted events `viewport:small`, `viewport:medium`, `viewport:large`, `viewport:xlarge`. 
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
```js
$( window )
	.on('viewport:small:resize', function() {
			// do something on every resize event to the small viewport
		})
	.on('viewport:not:small:resize', function() {
			// do something on every resize event to the medium and larger viewports
		});
```

## Initiate and Config Options


Just call `init()` function and its ready to go!
```js
	rjs.init();
```

Pass in number to change [_.debounce](https://lodash.com/docs#debounce) timeout
```js
	rjs.init( 100 );
```

Pass in object to change master config. Be sure to update CSS targets accordingly. 
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