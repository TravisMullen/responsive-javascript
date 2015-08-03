$( window )
    .on(
        'viewport:small',
        function() {
            console.log( 'viewport:small' );
            $('p')
                .text('The SMALL screen has been detected by CSS and the DOM has been updated by javascript!');
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
                .css('border','1px solid green');
        })
    // .on(
    //  'viewport:xlarge',
    //  function() {
    //      console.log( 'viewport:xlarge' );
    //      $('h2')
    //          .text('extra-large')
    //          .css('border','1px solid yellow');
    //  })
    .on(
        'viewport:not:small',
        function() {
            console.log( 'viewport:not:small' );
            $('p')
                .text('The MEDIUM and larger screen has been detected by CSS and the DOM has been updated by javascript!');
        });

