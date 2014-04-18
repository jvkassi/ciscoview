/**
 * Auth.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'auths',
    attributes: {

        // one to many user
        user: {
            model: 'user'
        },
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        secret: {
            type: 'string'
        }
    }
};
