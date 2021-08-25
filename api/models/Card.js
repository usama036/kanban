/**
 * Card.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: false,
    },
    category: {
      type: 'string',
      allowNull: false,
    },

    description: {
      type: 'string',
      allowNull: false,
    },
    image: {
      type: 'string',
      columnType:'text',
      allowNull: false,
    },
    checkbox: {
      type: 'boolean',
      defaultsTo: false,
    },
  },

};

