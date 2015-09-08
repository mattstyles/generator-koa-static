
require( 'babel-core/register' )({
    stage: 2,
    optional: [
        'es7.classProperties'
    ],
    loose: [
        'es6.modules',
        'es6.classes'
    ],
    only: /generator-koa-static/
})
module.exports = require( './app' )
