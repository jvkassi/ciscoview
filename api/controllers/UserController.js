/**
 * UserController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

// 'use strict';

module.exports = {

    // create function
    // create: function(req, res, next) {
    //  var params = req.params.all();
    //  // console.log(params);
    //  User.create(params,function(err, user) {
    //    if(err) return next(err);
    //    res.status(201);
    //    res.json(user);
    //  })
    // },
    create: function(req, res, next) {

        var userObj = {
            name: req.param('name'),
            title: req.param('title'),
            email: req.param('email'),
            online: req.param('online') || 0,
            password: req.param('password'),
            confirmation: req.param('confirmation')
        }

        // Create a User with the params sent from 
        // the sign-up form --> new.ejs
        User.create(userObj, function userCreated(err, user) {

            // // If there's an error
            // if (err) return next(err);

            if (err) return next(err)
            console.log(err);
            req.session.flash = {
                err: err
            }

            user.save(function(err, user) {
                if (err) return next(err);
                // Let other subscribed sockets know that the user was created.
                User.publishCreate(user);

                res.json(user)

            });
        });
    },
    find: function(req, res, next) {
        var id = req.param('id');
        // var idShortCut = isShortcut(id);

        // if(idShortCut == true) {
        //  return next();
        // }
        if (id) {
            User.findOne(id, function(err, user) {
                if (user === undefined) res.notFound()
                if (err) next(err);
                res.json(user);
            })
        } else {
            var where = req.param('where');
            if (_.isString(where)) {
                where = JSON.parse(where);
            }

            var options = {
                limit: req.param('limit') || undefined,
                skip: req.param('skip') || undefined,
                sort: req.param('sort') || undefined,
                where: where || undefined,
            }

            // console.log("Options : ", options)
            User.find(options, function(err, user) {
                if (user === undefined) return res.notFound()
                if (err) return next(err);
                res.json(user)
            })

        }
    },
    update: function(req, res, next) {
        var criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');


        if (!id) {
            return res.badRequest('No id provided.');

        }
        User.update(id, criteria, function(err, user) {
            if (user.length === 0) return res.notFound();
            if (err) return next(err);
            
            res.json(user);
        });
    },

    subscribe: function(req, res) {

        // Find all current users in the user model
        User.find(function foundUsers(err, users) {
            if (err) return next(err);

            // subscribe this socket to the User model classroom
            User.subscribe(req.socket);

            // subscribe this socket to the user instance rooms
            User.subscribe(req.socket, users);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    },

    destroy: function(req, res, next) {

        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next('User doesn\'t exist.');

            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);

                // Let other sockets know that the user instance was destroyed.
                User.publishDestroy(user.id);

            });

            res.json(user);

        });
    },



};
