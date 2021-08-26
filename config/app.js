/**
 * Application main configurations
 *
 * @type {{appName: string, oauth: {tokenLife: number}}}
 */


module.exports = {


  app: {

    name: 'kenben',

    url: 'http://localhost:1337/',

    public: 'uploads',

    upload: 'assets/uploads',


    oauth: {

      tokenLife: 30 * 24 * 60 * 60,

    }

  },



};
