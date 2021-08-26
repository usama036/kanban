/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 */


module.exports = async (req, res, proceed) => {

  if (req.session.userData) {
    let now = sails.config.globals.moment().unix();
    let creationDate = sails.config.globals.moment(req.session.userData.token.createdAt, 'hh:mmA DD/MM/YYYY').unix();

    if ((now - creationDate) > 30 * 24 * 60 * 60) {
      sails.log.info('users.regenerateToken');

      let callRes = await sails.helpers.serviceCall.with({
        type: 'users.regenerateToken',
        userData: req.session.userData
      });

      if (typeof callRes.status !== 'undefined') {
        return res.unAuthorized();
      }

      req.session.userData = callRes.user;
    }

    return proceed();
  }

  return res.unAuthorized();

};

