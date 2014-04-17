/**
 * Router
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

    tableName: 'routers',
    // connection: 'mongo',

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        ip: {
            type: 'string',
            required: true,
            unique: true,
            ip: true
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

    afterUpdate: function(values, next) {
        // console.log(values);
        Router.publishUpdate(values.id, values);
        next()
    }

};
