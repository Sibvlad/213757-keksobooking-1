'use strict';

window.form = (function () {
  var timeElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');

  var timesIn = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var timesOut = [
    '12:00',
    '13:00',
    '14:00'
  ];

  window.synchronizeFields(timeElem, timeOutElem, timesIn, timesOut, 'value');

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var noticeTypes = [
    'flat',
    'bungalo',
    'house',
    'palace'

  ];
  var noticePrices = [
    '1000',
    '0',
    '5000',
    '10000'
  ];

  window.synchronizeFields(type, price, noticeTypes, noticePrices, 'value');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var roomsNumber = [
    '1',
    '2',
    '3',
    '100'
  ];

  var roomsCapacity = [
    '1',
    '2',
    '3',
    '0'
  ];

  window.synchronizeFields(roomNumber, capacity, roomsNumber, roomsCapacity, 'value');


  var title = document.querySelector('#title');
  var address = document.querySelector('#address');
  address.setAttribute('readonly', '');
  title.required = true;
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');

  price.required = true;
  price.setAttribute('placeholder', '1000');
  price.setAttribute('min', '0');
  price.setAttribute('max', '1 000 000');
  isNumeric(price.value);

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  var form = document.querySelector('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');
  form.setAttribute('action', 'https://1510.dump.academy/keksobooking');
})();
