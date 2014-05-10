/**
 * Router
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

    tableName: 'hosts',
    // connection: 'mongo',
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        ip: {
            type: 'ip',
            required: true,
            unique: true,
        },
        vendor: {
            type: 'string'
        },
        secret: {
            type: 'string'
        },
        // users: {
        // 	collection: 'users',
        // 	via: 'router'
        // },
        toJSON: function() {
            var obj = this.toObject();
            // delete obj.encryptedPassword;
            // delete obj._csrf;
            return obj;
        }
    },

};
