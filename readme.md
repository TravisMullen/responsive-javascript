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

Use CSS or SCSS variables to set JS breakpoints. Set-up listeners to activate/deactivate JS modules, shiv JS styles, or whatever you need and have JS and CSS always stay in sync.

_Requires jQuery (or similar library for selectors), provided `.css` and `.js` for use._

Gotcha: Load `responsive-javascript.js` library or initiate `rjs.init();` after trigger `.on('viewport:*')` dependencies have been declared. 

Provided as both `.css` and `.scss`.

See `h5bp/main.js` for example of use.



Copyright (c) 2014 BOOM.BANG.MEDIA.LLC, TravisMullen.com