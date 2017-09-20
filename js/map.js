'use strict';

window.map = (function () {

  var fragment = document.createDocumentFragment();
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var form = document.querySelector('.notice__form');
  var _apartments = [];
  init();

  return {
    render: function (apartments) {
      _apartments = apartments;
      for (var i = 0; i < apartments.length; i++) {
        var pin = window.pin.render(apartments[i]);
        pin.setAttribute('data-id', i.toString());
        fragment.appendChild(pin);
      }
      document.querySelector('.tokyo__pin-map').appendChild(fragment);
      tokyoPinMap.addEventListener('keydown', onEnterKeyDown);
      var mainPin = document.querySelector('.pin__main');
      mainPin.addEventListener('mousedown', onPinMove);
      form.addEventListener('submit', onFormSubmit);
    },
    getApp: function (id) {
      return _apartments[id];
    },
    dialog: document.querySelector('.dialog')
  };

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
      updateForm();
    }, onError);
  }

  function onPinMove(evt) {
    evt.preventDefault();

    var target = evt.target.closest('.pin');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      evt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (((target.offsetTop - shift.y) > 0) && ((target.offsetTop - shift.y) < 610)) {
        target.style.top = (target.offsetTop - shift.y) + 'px';
      } else {
        target.style.top = target.offsetTop + 'px';
      }

      if (((target.offsetLeft - shift.x) > 0 && (target.offsetLeft - shift.x) < 1155)) {
        target.style.left = (target.offsetLeft - shift.x) + 'px';
      } else {
        target.style.left = (target.offsetLeft) + 'px';
      }

      var address = document.querySelector('#address');
      address.value = 'x: ' + (target.offsetLeft + 32) + ', y: ' + (target.offsetTop + 94);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      tokyoPinMap.removeEventListener('mousemove', onMouseMove);
      tokyoPinMap.removeEventListener('mouseup', onMouseUp);
    }

    tokyoPinMap.addEventListener('mousemove', onMouseMove);
    tokyoPinMap.addEventListener('mouseup', onMouseUp);
  }

  function onEnterKeyDown(event) {
    if (event.keyCode === 13) {
      window.pin.openCard(event);
    }
  }

  function init() {
    updateForm();
    document.querySelector('.tokyo__filters').addEventListener('change', applyFilters);
    window.backend.load(function (records) {
      window.map.render(records.sort(function () {
        return 0.5 - Math.random();
      }).slice(0, 3));
    }, onError);
  }

  function updateForm() {
    var mainPin = document.querySelector('.pin__main');
    var address = document.querySelector('#address');
    address.value = 'x: ' + (mainPin.offsetLeft + 32) + ', y: ' + (mainPin.offsetTop + 94);
  }

  function applyFilters() {
    window.debounce(function () {

      var filterForm = document.querySelector('.tokyo__filters');
      var housingType = filterForm.querySelector('#housing_type').value;
      var housingPrice = filterForm.querySelector('#housing_price').value;
      var housingRoomMumber = filterForm.querySelector('#housing_room-number').value;
      var housingGuestsNumber = filterForm.querySelector('#housing_guests-number').value;
      var features = document.querySelectorAll('input[name="feature"]:checked');

      window.backend.load(function (apartments) {
        var newap = apartments.filter(function (item) {
          if (item.offer.type !== housingType && housingType !== 'any') {
            return false;
          }
          if (housingPrice === 'low' && item.offer.price > 10000) {
            return false;
          }
          if (housingPrice === 'high' && item.offer.price < 50000) {
            return false;
          }
          if (housingPrice === 'middle' && item.offer.price < 10000) {
            return false;
          }
          if (housingPrice === 'middle' && item.offer.price > 50000) {
            return false;
          }
          if (housingRoomMumber !== 'any' && item.offer.rooms !== parseInt(housingRoomMumber, 0)) {
            return false;
          }
          if (housingGuestsNumber !== 'any' && item.offer.guests !== parseInt(housingGuestsNumber, 0)) {
            return false;
          }

          for (var i = 0; i < features.length; i++) {
            if (!item.offer.features.includes(features[i].value)) {
              return false;
            }
          }

          return true;
        });
        window.pin.removePins();
        window.map.render(newap);
      }, onError);

    });
  }

  function onError(message) {
    var errorBlock = document.querySelector('.header__error');
    errorBlock.textContent = message;
    errorBlock.classList.remove('invisible');
  }
})();
