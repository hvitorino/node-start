var requireDir = require('require-dir');

module.exports = {
    route: function (app) {
        var allRoutes = requireDir('./routes');

        Object.keys(allRoutes).forEach(function (key) {
            allRoutes[key].register(app);
        });
    }
};