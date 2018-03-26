var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'wallet';
	locals.data = {};
	var user_agent = req.header('user-agent').toLowerCase();
	console.log(user_agent);
	var agent = {
		linux: {
			link: 'http://dl.ledgerd.org/ledgerd-wallet-linux64-0.4.1.zip',
			icon: 'fa fa-linux',
			text: 'Linux',
		},
		osx: {
			link: 'http://dl.ledgerd.org/ledgerd-wallet-osx64-0.4.1.zip',
			icon: 'fa fa-apple',
			text: 'Mac OSX',
		},
		windows: {
			link: 'http://dl.ledgerd.org/ledgerd-wallet-win32-0.4.1.zip',
			icon: 'fa fa-windows',
			text: 'Windows',
		},
		android: {
			link: 'http://dl.ledgerd.org/Ledgerd.apk',
			icon: 'fa fa-android',
			text: 'Android',
		},
		iphone: {
			link: 'http://dl.ledgerd.org/Ledgerd.ipa',
			icon: 'fa fa-apple',
			text: 'iOS',
		},
	};
	if (user_agent.indexOf('linux')) {
		locals.agent = agent.linux;
	} else if (user_agent.indexOf('osx')) {
		locals.agent = agent.osx;
	} else if (user_agent.indexOf('windows')) {
		locals.agent = agent.windows;
	} else if (user_agent.indexOf('android')) {
		locals.agent = agent.android;
	} else if (user_agent.indexOf('iphone')) {
		locals.agent = agent.iphone;
	} else {
		locals.agent = {
			link: '#wallet-more',
			icon: 'fa fa-download',
			text: 'Wallet',
		};
	}
	// Render the view
	view.render('wallet_download');
};
