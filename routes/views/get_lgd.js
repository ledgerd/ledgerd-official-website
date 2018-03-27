var keystone = require('keystone');
var ledgerd = require('ledgerd-lib');

exports = module.exports = function (req, res) {
	var list = keystone.list('GetLGD');
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	console.log(req.body.address, ip);
	list.model.find().where('address', req.body.address).exec(function (err, items) {
		console.log(err);
		console.log(items);
		if (items.length === 0) {
			var secret = 'shDziyesCVXpUecNvde1ZgB4nMAjq';
			var sourceAddress = 'Lrhsr7cTnHWGLuCbiCEjhaivJegwb7f4Qi';
			var api = new ledgerd.RippleAPI({ server: 'ws://s.ledgerd.org:6006' });
			api.connect().then(function () {
				console.log('已连接');
				api.preparePayment(sourceAddress, {
					source: {
						address: sourceAddress,
						maxAmount: {
							currency: 'XRP',
							value: '100',
						},
					},
					destination: {
						address: req.body.address,
						amount: {
							currency: 'XRP',
							value: '100',
						},
					},
				}).then(function (prepared) {
					var signed = api.sign(prepared.txJSON, secret);
					console.warn('txJSON', prepared.txJSON);
					console.warn('signed', signed);
					api.submit(signed.signedTransaction).then(function (result) {
						console.warn('result', result);
						if (result.resultCode === 'tesSUCCESS') {
							var item = new list.model();
							item.set({ address: req.body.address, ip: ip, amount: 100 });
							item.save();
							res.send({
								error: 0,
								message: '成功领取100LGD',
							});
						} else {
							res.send({
								error: 2,
								message: result.resultCode + '->' + result.resultMessage,
							});
						}
					}).catch(function (reason) { console.log(reason);
						res.send({
							error: 3,
							message: reason.resultCode + '->' + reason.resultMessage,
						});
					});
				}).catch(function (reason) { console.log(reason);
					res.send({
						error: 4,
						message: reason.resultCode + '->' + reason.resultMessage,
					});
				});
			});
		} else {
			res.send({
				error: 1,
				message: '此地址已经领取',
			});
		}
	});
};
