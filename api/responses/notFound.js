/**
 * notFound.js
 *
 * A custom not found response.
 */

module.exports = function notFound(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Get access to `sails`
  var sails = req._sails;

  // Set status code
  res.status(404);

  // If the request wants JSON, send back the appropriate status code.
  if (req.wantsJSON || !res.view) {
    return res.sendStatus(404);
  }

  return res.view('404', {layout: 'layouts/auth', title: '404', className: 'error error-404', error: optionalData}, function (err, html) {
    // If a view error occured, fall back to JSON.
    if (err) {
      //
      // Additionally:
      // • If the view was missing, ignore the error but provide a verbose log.
      if (err.code === 'E_VIEW_FAILED') {
        sails.log.verbose('res.notFound() :: Could not locate view for error page (sending text instead).  Details: ', err);
      }
      // Otherwise, if this was a more serious error, log to the console with the details.
      else {
        sails.log.warn('res.notFound() :: When attempting to render error page view, an error occured (sending text instead).  Details: ', err);
      }
      return res.sendStatus(404);
    }

    return res.send(html);
  });

};
