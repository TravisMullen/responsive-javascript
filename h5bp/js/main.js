$( window )
	.on(
		'viewport:small',
		function() {
			console.log( 'viewport:small' );
			$('h1')
				.text('small screen detected by javascript!')
				.css('background-color','yellow');
			$('h2')
				.text('small')
				.css('border','1px solid purple');
		})
	.on(
		'viewport:medium',
		function() {
			console.log( 'viewport:medium' );
			$('h2')
				.text('medium')
				.css('border','1px solid red');
		})
	.on(
		'viewport:large',
		function() {
			console.log( 'viewport:large' );
			$('h2')
				.text('large')
				.css('border','1px solid yellow');
		})
	.on(
		'viewport:xlarge',
		function() {
			console.log( 'viewport:xlarge' );
			$('h2')
				.text('extra-large')
				.css('border','1px solid green');
		})
	.on(
		'viewport:not:small',
		function() {
			console.log( 'viewport:not:small' );
			$('h1')
				.text('medium and larger screen detected by javascript!')
				.css('background-color','yellow');
		});