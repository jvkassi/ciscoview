/**
 * Connection.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'connections',
    attributes: {

        // one to many routers
        host: {
            model: 'host'
        },
        // one to many auth
        auth: {
            model: 'auth'
        },
        transport: {
            type: 'string',
            defaultsTo: 'ssh'
        },
        connected: {
            type: 'boolean',
            defaultsTo: false
        },
        port: {
            type: 'integer',
            defaultsTo: '22'
        },
    }
};
