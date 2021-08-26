/**
 * User
 *
 * @module      :: Model
 * @description :: Model to maintain application's users who can log in to this application.
 */


const moment = require('moment');


module.exports = {
  attributes: {

    name: {
      type: 'string',
      required: false,
      maxLength: 120
    },

    phoneNo: {
      type: 'string',
      unique: true,
      maxLength: 15,
      required: true,
      columnName: 'phone_number',
      columnType: 'varchar(15)'
    },



    seen: {
      type: 'boolean',
      defaultsTo: false
    },

    verified: {
      type: 'boolean',
      defaultsTo: true
    },

    email: {
      type: 'string',
      unique: true,
      isEmail: true,
      allowNull: true,
      maxLength: 200
    },

    password: {
      type: 'string',
      protect: true,
      allowNull: true
    },

    userType: {
      type: 'string',
      maxLength: 15,
      columnName: 'user_type',
      columnType: 'varchar(15)',
      isIn: ['admin', 'support', 'customer', 'technician']
    },
    userRole: {
      type: 'string',
      maxLength: 15,
      columnName: 'user_role',
      columnType: 'varchar(15)',

    },

    updatedAt: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'updated_at',
      autoUpdatedAt: true
    },

    createdAt: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'created_at',
      autoCreatedAt: true
    },



  },


};
