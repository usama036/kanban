/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: false,
    },
    password: {
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: false,
    },
    checkbox: {
      type:'boolean',
      defaultsTo: false,
    },
    role: {
      type: 'string',
      columnType:'varchar(255)',
      isIn: ['user', 'admin'],
      allowNull: false,
    }
  },

};

