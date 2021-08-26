/**
 * All Services and their requests
 */

module.exports.services = {
  users: {
    csrf: '/csrf-token',
    login: '/entrance/login',
    register: `/entrance/register`,
    logout: '/account/logout',
    reset: '/password/reset',
    getProfile: '/account/profile',
    updateProfile: '/account/profile',
    allUsers: '/account/users',
    validateToken: '/token/validate',
    regenerateToken: '/token/regenerate',
  },

  resolveUri: ( route = '' ) => {
    const {endpoint, version} = sails.config.userServices;
    const url = `${endpoint.replace(/\/$/, '')}/${version}`;

    return route.trim()
      ? `${url}/${route.replace(/^\//, '')}`
      : url;
  },
};
