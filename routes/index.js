/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// 处理404错误
keystone.set('404', function (req, res, next) {
	res.notfound();
});

// 处理其它错误
keystone.set('500', function (err, req, res, next) {
	var title, message;
	if (err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.err(err, title, message);
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/member', routes.views.member);
	app.get('/download-wallet', routes.views.wallet_download);
	app.get('/get-lgd', routes.views.get_lgd);
	app.get('/validator', routes.views.validator);
	app.get('/market-maker', routes.views.market_maker);
	app.get('/gateway', routes.views.gateway);
	app.get('/org', routes.views.org);
	app.get('/project', routes.views.project);
	app.get('/govern', routes.views.govern);
	app.get('/proposal', routes.views.proposal);
	app.get('/jobs', routes.views.jobs);
	app.get('/vote', routes.views.vote);
	app.get('/vote/history', routes.views.vote_history);
	app.get('/docs', routes.views.docs);
	app.get('/tools', routes.views.tools);
	app.get('/policy', routes.views.policy);
	app.get('/terms', routes.views.terms);
	app.get('/election', routes.views.election);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
