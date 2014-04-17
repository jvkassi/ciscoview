/**
 * Connection.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

    	// one to many routers
        router: {
            model: 'router'
        },

        // one to many auth
        auth: {
            model: 'auth'
        },
        connected: {
        	type: 'boolean',
        	defaultsTo: false
        },
    }
};
