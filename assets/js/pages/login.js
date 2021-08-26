jQuery(document).ready(function ($) {

  $('#login-form').submit(function (e) {
    e.preventDefault();

    var _data = {};

    $(this).serializeArray().filter(function (val) {
      _data[val.name] = val.value;
    });

    var $s = $('#login-spinner').removeAttr('style').hide().fadeIn();
    $.post('/login', _data).done(function (res) {
      if (res.status === 'success') {
        window.location.href = '/';
      } else {
        new Noty({
          text: '<div class="text-left">' + res.message + '</div>',
          type: 'warning',
          theme: 'mint',
          layout: 'topRight',
          timeout: 5000
        }).show();
      }
      $s.fadeOut();
    });

    return false;
  });

});
