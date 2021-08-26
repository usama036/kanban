/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {


  login: async function (req, res) {

    if (req.session.userData) {
      return res.redirect('/kanban');
    }

    return res.view('pages/login', {
      title: 'Login to Admin Panel',
      className: 'login',
      layout: 'layouts/auth'
    });

  },


  authenticate: async function (req, res) {

    let User = await sails.helpers
      .serviceCall.with({
        type: 'users.login',
        _data: req.allParams()
      });

    if (User.status === 'success' && ['admin', 'operational', 'support'].indexOf(User.user.userType) !== -1) {

      User.user.token = User.token;

      req.session.userData = User.user;

      delete User.user;
      delete User.token;

      return res.json(User);
    }

    return res.json({
      status: 'warning',
      message: (User.message === 'Login Successful' ? 'You are not admin level user.' : User.message)
    });

  },


  logout: async function (req, res) {

    delete req.session.userData;

    return res.redirect('/login');

  },


  dashboard: async function (req, res) {
    const {userData} = req.session;

    if ( userData.userType !== 'admin' ) {
      return res.redirect('/orders/manage');
    }

    return res.view('pages/homepage', {title: 'Dashboard',userData});
  },
};

