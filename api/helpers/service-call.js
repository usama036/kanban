const axios = require('axios');

module.exports = {

  friendlyName: 'Service Request Helper',

  description: 'System services request helper to call a service and get results.',

  inputs: {

    type: {
      type: 'string',
      defaultsTo: 'get',
      description: 'Request type eg: GET, POST, PUT, DELETE'
    },

    _data: {
      type: 'json',
      description: 'Request information to send service'
    },

    userData: {
      type: 'json',
      description: 'User information for request'
    }

  },

  exits: {

    success: {
      status: 'success',
      message: 'Request successfully completed.',
      info: {}
    },

    badServer: {
      status: 'error',
      message: 'Bad service.'
    },

    unknownRequest: {
      status: 'error',
      message: 'Bad service.'
    }

  },

  fn: async function ( inputs ) {
    let Response = Object.create(null);

    switch ( inputs.type ) {
      case 'users.login':
        Response = LoginRequest(inputs);
        break;
      case 'users.reset':
        Response = ResetPassword(inputs);
        break;
      case 'users.updateProfile':
        Response = UpdateProfile(inputs);
        break;
      case 'users.regenerateToken':
        Response = RegenerateToken(inputs);
        break;
    }

    return Response;
  }
};

/**
 * Reset Password of User Request using service
 *
 * @return {null}
 */
async function ResetPassword ( inputs ) {
  let Response = Object.create(null);

  try {
    Response = await axios.put(reqUrl(inputs.type), inputs._data, {headers: {Authorization: 'Bearer ' + inputs.userData.token.token}});
  } catch ( e ) {
    return {
      status: 'error',
      message: 'Bad service.'
    };
  }

  return Response.data;
}

/**
 * Regenerate User Token Request using service
 *
 * @return {null}
 */
async function RegenerateToken ( inputs ) {
  let Response = Object.create(null);

  try {
    Response = await axios.post(reqUrl(inputs.type), inputs.userData.token);
  } catch ( e ) {
    return {
      status: 'error',
      message: 'Bad service.'
    };
  }

  return Response.data;
}

/**
 * Update User Profile Request using service
 *
 * @return {null}
 */
async function UpdateProfile ( inputs ) {
  let Response = Object.create(null);

  try {
    Response = await axios.put(reqUrl(inputs.type), inputs._data, {headers: {Authorization: 'Bearer ' + inputs.userData.token.token}});
  } catch ( e ) {
    return {
      status: 'error',
      message: 'Bad service.'
    };
  }

  return Response.data;
}

/**
 * Login User Request using service
 *
 * @return User
 */
async function LoginRequest ( inputs ) {
  console.log('==========================');
  let Response = Object.create(null);
  console.log(inputs);
  try {
    Response = await axios.get(reqUrl('users.csrf'));
  } catch ( e ) {
    return {
      status: 'error',
      message: e.response ? 'Invalid login info.' : 'Bad service.',
    };
  }

  inputs._data._csrf = Response.data._csrf;

  try {
    Response = await axios.post(reqUrl(inputs.type), inputs._data, {headers: {Cookie: Response.headers['set-cookie'][0]}});
  } catch ( e ) {
    return {
      status: 'error',
      message: e.response ? 'Invalid login info.' : 'Bad service.',
    };
  }

  Response.data.status = Response.data.message === 'Login Successful' ? 'success' : 'error';

  return Response.data;
}

// Get URL of Request
function reqUrl ( type ) {
  let path = sails.config.services;

  _.forEach(type.split('.'), item => {
    path = path[item];
  });

  return sails.config.services.resolveUri(path);
}

