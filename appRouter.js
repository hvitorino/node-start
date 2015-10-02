var requireDir = require('require-dir');

module.exports = function () {
    var self = this;

    self.route = function (app) {
        var allRoutes = requireDir('./routes');

        Object.keys(allRoutes).forEach(function (key) {
            allRoutes[key].register(app);
        });
    };
};