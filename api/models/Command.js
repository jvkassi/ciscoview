/**
* Command.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName : 'commands',
  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	role: {
  		model: 'role',
  		// defaultsTo: 'user'
  	}
  }
};

