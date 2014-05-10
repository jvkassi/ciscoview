/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    // users: function(req, res) {
        
    //     var relation = 'user';
    //     var childPk =  req.param('id')
    //     var where = childPk 
    //     console.log(childPk);
    //     // ? [childPk] : actionUtil.parseCriteria(req);
    //     Auth
    //         .find()
    //         // .where( {user: childPk})
    //         .exec(function found(err, matchingRecord) {

    //         	console.log(matchingRecord);
    //         	var auths = matchingRecord.filter(function(x) {if(x.user == childPk) return x })
    //             // if (err) return res.serverError(err);
    //             // if (!matchingRecord) return res.notFound('No record found with the specified id.');
    //             // console.log(matchingRecord['user'])
    //             // if (!matchingRecord[relation]) return res.notFound(util.format('Specified record (%s) is missing relation `%s`', parentId, alias));
    //             return res.ok(auths);
    //         });

    // }
    subscribe: function(req, res) {
        console.log("subscribing..")
        // Find all current users in the user model
        Auth.find(function found(err, users) {
            if (err) return next(err);

            // subscribe this socket to new create users
            Auth.watch(req.socket);

            // subscribe this socket to existing users
            Auth.subscribe(req.socket, users);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    },
};
