/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'logs',
    attributes: {

        // one to many auth
        connection: {
            model: 'connection'
        },
        message: {
            type: 'string'
        }
    }
};
