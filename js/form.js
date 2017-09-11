'use strict';

window.form = (function () {
  var address = document.querySelector('#address');
  address.required = true;

  var title = document.querySelector('#title');
  title.required = true;
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  var price = document.querySelector('#price');
  price.required = true;
  price.setAttribute('placeholder', '1000');
  price.setAttribute('min', '0');
  price.setAttribute('max', '1000000');
  isNumeric(price.value);

  var timeElem = document.getElementById('timein');

  timeElem.addEventListener('change', function (element) {
    var target = element.target.value;
    var timeOutElem = document.querySelector('#timeout');
    var optionValue = timeOutElem.querySelector('option[value="' + target + '"]');
    optionValue.setAttribute('selected', 'selected');
  });

  var typeRoom = document.querySelector('#type');


  typeRoom.addEventListener('change', function (element) {
    var target = element.target.value;
    if (target === 'flat') {
      price.setAttribute('placeholder', '1000');
      price.setAttribute('min', '1000');
    } else if (target === 'bungalo') {
      price.setAttribute('placeholder', '0');
    } else if (target === 'house') {
      price.setAttribute('placeholder', '5000');
      price.setAttribute('min', '5000');
    } else {
      price.setAttribute('placeholder', '10000');
      price.setAttribute('min', '10000');
    }
  });

  var roomNumber = document.querySelector('#room_number');
  roomNumber.addEventListener('change', function (element) {
    var target = element.target.value;
    var capacity = document.querySelector('#capacity');
    var capOptionOne = capacity.querySelector('option[value="1"]');
    var capOptionTwo = capacity.querySelector('option[value="2"]');
    var capOptionThree = capacity.querySelector('option[value="3"]');
    var capOptionFour = capacity.querySelector('option[value="0"]');
    capOptionThree.removeAttribute('selected');
    if (target === '1') {
      capOptionOne.setAttribute('selected', 'selected');
    } else if (target === '2') {
      capOptionTwo.setAttribute('selected', 'selected');
    } else if (target === '3') {
      capOptionThree.setAttribute('selected', 'selected');
    } else if (target === '100') {
      capOptionFour.setAttribute('selected', 'selected');
    }
  });

  var form = document.querySelector('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');
  form.setAttribute('action', 'https://1510.dump.academy/keksobooking');
});
