'use strict';

window.form = (function () {

  var TIMES_IN = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var TIMES_OUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var NOTICE_TYPES = [
    'flat',
    'bungalo',
    'house',
    'palace'
  ];

  var NOTICE_PRICES = [
    '1000',
    '0',
    '5000',
    '10000'
  ];

  var ROOMS_NUMBER = [
    '1',
    '2',
    '3',
    '100'
  ];

  var ROOMS_CAPACITY = [
    '1',
    '2',
    '3',
    '0'
  ];

  var timeElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var address = document.querySelector('#address');

  return {
    init: function () {
      window.synchronizeFields(timeElem, timeOutElem, TIMES_IN, TIMES_OUT, 'value');
      window.synchronizeFields(timeOutElem, timeElem, TIMES_OUT, TIMES_IN, 'value');
      window.synchronizeFields(type, price, NOTICE_TYPES, NOTICE_PRICES, 'value');
      window.synchronizeFields(roomNumber, capacity, ROOMS_NUMBER, ROOMS_CAPACITY, 'value');
      window.synchronizeFields(capacity, roomNumber, ROOMS_CAPACITY, ROOMS_NUMBER, 'value');
      roomNumber.addEventListener('change', window.form.changeTypeHandler);

      var title = document.querySelector('#title');
      address.setAttribute('readonly', '');
      address.required = true;
      title.required = true;
      title.setAttribute('minlength', '30');
      title.setAttribute('maxlength', '100');

      price.required = true;
      price.setAttribute('placeholder', '1000');
      price.setAttribute('min', '0');
      price.setAttribute('max', 1000000);
      isNumeric(price.value);

      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      var form = document.querySelector('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('enctype', 'multipart/form-data');
      form.setAttribute('action', 'https://1510.dump.academy/keksobooking');
    },
    validate: function () {
      var valid = true;
      if (address.value !== '') {
        valid = valid && true;
      } else {
        valid = false;
        address.style = 'border:1px solid red;';
      }

      if (type.value === 'flat' && price.value >= 1000 || type.value === 'bungalo' && price.value >= 0 || type.value === 'house' && price.value >= 5000 || type.value === 'palace' && price.value >= 10000) {
        valid = valid && true;
      } else {
        valid = false;
        price.style = 'border:1px solid red;';
      }

      return valid;
    },
    changeTypeHandler: function (event) {

      var oneOption = document.createElement('option');
      oneOption.setAttribute('value', '1');
      oneOption.innerHTML = 'для 1 гостя';

      var twoOption = document.createElement('option');
      twoOption.setAttribute('value', '2');
      twoOption.innerHTML = 'для 2 гостей';

      var threeOption = document.createElement('option');
      threeOption.setAttribute('value', '3');
      threeOption.innerHTML = 'для 3 гостей';

      var zeroOption = document.createElement('option');
      zeroOption.setAttribute('value', '0');
      zeroOption.innerHTML = 'не для гостей';

      if (event.target.value === '1') {
        capacity.innerHTML = '';
        capacity.appendChild(oneOption);
      }

      if (event.target.value === '2') {
        capacity.innerHTML = '';
        capacity.appendChild(oneOption);
        twoOption.setAttribute('selected', '');
        capacity.appendChild(twoOption);
      }

      if (event.target.value === '3') {
        capacity.innerHTML = '';
        capacity.appendChild(oneOption);
        capacity.appendChild(twoOption);
        threeOption.setAttribute('selected', '');
        capacity.appendChild(threeOption);
      }

      if (event.target.value === '100') {
        capacity.innerHTML = '';
        capacity.appendChild(zeroOption);
      }
    }
  };
})();

window.form.init();
