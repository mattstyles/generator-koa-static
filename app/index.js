'use strict';
var util    = require('util');
var path    = require('path');
var fs      = require( 'fs' );
var yeoman  = require('yeoman-generator');
var yosay   = require('yosay');

module.exports  = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require( '../package.json' );
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log( yosay(
            'Welcome to the Koa-Static generator!'
        ));

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

            // @TODO: be explicit
            this.directory( 'bin', 'bin' );
            this.directory( 'public', 'public' );
            this.directory( 'lib', 'lib' );
        },

    },

    end: function () {
        this.installDependencies();
    }
});
