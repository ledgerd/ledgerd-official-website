var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Model
 * ==========
 */
var GetLGD = new keystone.List('GetLGD', {
	autokey: { from: 'address', path: 'key', unique: true },
});

GetLGD.add({
	address: { type: String, required: true, unique: true, index: true, initial: true },
	ip: { type: String, required: true, index: true, initial: true },
	amount: { type: Types.Money, required: true, initial:true },
	createAt: { type: Types.Datetime, default: Date.now },
});


/**
 * Registration
 */
// GetLGD.defaultColumns = 'address, ip, createAt';
GetLGD.register();
