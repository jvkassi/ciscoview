/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

    tableName: 'users',
    // connectio?n: 'mongo',

    schema: true,
    attributes: {

        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'string',
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: 'string'
        },

        online: {
            type: 'boolean',
            defaultsTo: 'false'
        },

        // routers: {
        //     collection: 'routers',
        //     via: 'auth'
        //     // type: 'string'
        // },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.encryptedPassword;
            // delete obj._csrf;
            return obj;
        }


    },
    beforeCreate: function(values, next) {
        // console.log('before')
        // This checks to make sure the password and password confirmation match before creating record
        if (!values.password) {
            return next({
                err: ["Password doesn't match password confirmation."]
            });
        }

        require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
            if (err) return next(err);
            values.encryptedPassword = encryptedPassword;
            // values.online= true;
            next();
        });
    },
    afterUpdate: function(values, next) {
        console.log(values);
        User.publishUpdate(values.id, values);
        next()
    }

};
