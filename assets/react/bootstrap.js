/**
 * Default Prototypes
 */
String.prototype.toCapitalizeCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toCapitalizeAllWords = function () {
  let splitStr = this.split(' ');

  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].toCapitalizeCase();
  }

  return splitStr.join(' ');
};
$.validator.addMethod('fileSize', function (value, e, param) {
  if (param !== false) {
    var mb = 1000000 * param;
    return e.files.length && e.files[0].size <= mb;
  } else {
    return true;
  }
}, 'File size must be less than {0}MB.');
$.validator.addMethod('notEmpty', function (value) {
  return value.match(/\w+/g) !== null;
}, function (s, e) {
  return 'Please enter a valid value for <b>' + $(e).attr('name').toCapitalizeCase() + '</b>.';
});
$.validator.addMethod('urlString', function (value) {
  return /^[\w\-]+$/g.test(value);
}, function (s, e) {
  return 'Please enter a valid value for <b>' + $(e).attr('name').toCapitalizeCase() + '</b>.';
});
$.validator.addMethod('basicString', function (value) {
  return /^[\w\-\s]+$/g.test(value);
}, function (s, e) {
  return 'Please enter a valid value for <b>' + $(e).attr('name').toCapitalizeCase() + '</b>.';
});
$.validator.addMethod('mobilePK', function (value) {
  return /^((((\+|00|())92(-|\s){0,1})|0)|())3\d{2}(-|\s){0,1}\d{7}$/g.test(value);
}, function (s, e) {
  return 'Please enter a valid value for <b>' + $(e).attr('name').toCapitalizeCase() + '</b>.';
});


/**
 * Load Dependencies
 */
require('inputmask');
window._ = require('lodash');
window.moment = require('moment');

