module.exports = function () {
    return {
        register: function (app) {
            app.route('/')
                .get(function (req, res, next) {
                    res.render('index', { title: 'Express' });
                });
        }
    };
} ();