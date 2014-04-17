/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, ok) {

    // User is allowed, proceed to controller
    if (req.session.authenticated) {
        return ok();
    }

    // User is not allowed
    else {
        if (req.isSocket) {
            return res.send({
                err: "You are not permitted to perform this action.",
                code: 403

            }, 403);
        }
        // return res.send({
        //     err: "You are not permitted to perform this action."
        // }, 403);
        return ok()
    }
};
