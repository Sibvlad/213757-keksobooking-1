'use strict';


(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  function map(onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  }

  window.backend = {
    save: function (data, onLoad, onError) {
      if (window.form.validate()) {
        var xhr = map(onLoad, onError);
        xhr.open('POST', SERVER_URL);
        xhr.send(data);
      }
    },
    load: function (onLoad, onError) {
      var xhr = map(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();


