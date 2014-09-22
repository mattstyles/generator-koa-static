'use strict';
var util    = require( 'util' );
var path    = require( 'path' );
var yeoman  = require( 'yeoman-generator' );
var yosay   = require( 'yosay' );

module.exports  = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require( '../package.json' );

        this.on( 'end', function() {
            if ( !this.options[ 'skip-install' ] ) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        if ( !this.options[ 'skip-install-message' ] ) {
            this.log( yosay(
                'Welcome to the Koa-Static generator!'
            ));
        }

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'What would you like to call this awesome project?',
                validate: function( str ) {
                    return !/\s/.test( str );
                }
            },
            {
                type: 'input',
                name: 'ghUser',
                message: 'What is your Github username?'
            }
        ];

        this.prompt( prompts, function( props ) {
            Object.keys( props ).forEach( function( prop ) {
                this[ prop ] = props[ prop ];
            }.bind( this ));

            done();
        }.bind( this ) );
    },

    writing: {
        app: function () {
            // this.src.copy( 'package.json', 'package.json' );
            this.template( '_package.json', 'package.json' );
            this.src.copy( 'bower.json', 'bower.json' );
            this.src.copy( '.bowerrc', '.bowerrc' );
            this.src.copy( 'README.md', 'README.md' );
            this.src.copy( 'index.js', 'index.js' );

            this.dest.mkdir( 'bin' );
            this.dest.mkdir( 'lib' );
            this.dest.mkdir( 'public' );

            this.src.copy( 'bin/start', 'bin/start' );
            this.src.copy( 'lib/tmpl/404.hjs', 'lib/tmpl/404.hjs' );
            this.src.copy( 'lib/util/views.js', 'lib/util/views.js' );
            this.src.copy( 'lib/server.js', 'lib/server.js' );
            this.src.copy( 'public/index.html', 'public/index.html' );

            // Add extra empty dirs
            this.dest.mkdir( 'lib/routes' );
            this.dest.mkdir( 'lib/middleware' );
            this.dest.mkdir( 'public/vendor' );
        }
    }
});
