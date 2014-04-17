/**
 * Allow only request originated from the server.
 */
module.exports = function(req, res, ok) {

    var origin = req.headers.origin || req.headers.referer,

        allowedOrigins = [
            'http://localhost',
            'http://127.0.0.1',
            'http://web.mib4fun.ci',
            'http://web.mib4fun.ci/',
            'http://proxy.mib4fun.ci/'
        ],

        n = allowedOrigins.length,
        i,

        sameOrigin = false;
    // console.log(origin);
    // console.log(req.session);
    if (origin) {
        for (i = 0; i < n; i++) {
            if (origin.indexOf(allowedOrigins[i]) == 0) {
                sameOrigin = true;
                break;
            }
        }
    }

    // if (sameOrigin) {
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Origin', req.headers.referer);

    return ok();
    // } else {
    //     return res.send(403);
    // }

};
