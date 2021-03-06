/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /kanban': {controller: 'HomepageController', action: 'index'},
  'POST /category/new': {controller: 'Category', action: 'new'},
  'GET /category/list': {controller: 'Category', action: 'list'},

  'POST /card/new': {controller: 'Card', action: 'newCard'},
  'GET /card/list': {controller: 'Card', action: 'list'},
  'POST /category/update': {controller: 'Card', action: 'update'},
  'POST /card/remove': {controller: 'Card', action: 'remove'},

  'POST /user/new': {controller: 'User', action: 'newUser'},
  'GET /test': {controller: 'Signup', action: 'index'},
  'GET /': {controller: 'AuthController', action: 'dashboard'},
  'GET /login': {controller: 'AuthController', action: 'login'},
  'POST /login': {controller: 'AuthController', action: 'authenticate'},
  'GET /logout': {controller: 'AuthController', action: 'logout'},
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
