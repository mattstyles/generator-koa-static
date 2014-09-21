'use strict';
var util    = require('util');
var path    = require('path');
var fs      = require( 'fs' );
var yeoman  = require('yeoman-generator');
var yosay   = require('yosay');

module.exports  = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require( '../package.json' );

        this.on( 'end', function() {
            if ( !this.options[ 'skip-install' ] ) {
                this.installDependencies();
            }
        });
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        if ( !this.options[ 'skip-install-message' ] ) {
            this.log( yosay(
                'Welcome to the Koa-Static generator!'
            ));
        }

        // var prompts = [{
        //     type: 'confirm',
        //     name: 'someOption',
        //     message: 'Would you like to enable this option?',
        //     default: true
        // }];
        //
        // this.prompt(prompts, function (props) {
        //     this.someOption = props.someOption;
        //
        //     done();
        // }.bind(this));

        done();
    },

    writing: {
        app: function () {
            this.src.copy( 'package.json', 'package.json' );
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
