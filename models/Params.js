var keystone = require('keystone');
// var Types = keystone.Field.Types;

/**
 * Model
 * ==========
 */
var Params = new keystone.List('Params');

Params.add({
	key: { type: String, required: true, unique: true, index: true, initial: true },
	value: { type: String, required: true, initial: true },
});


/**
 * Registration
 */
// GetLGD.defaultColumns = 'address, ip, createAt';
Params.register();
