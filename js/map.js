'use strict';

window.map = (function () {

  var fragment = document.createDocumentFragment();
  var dialogClose = document.querySelector('.dialog__close');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var _apartments = [];

  return {
    render: function (apartments) {
      _apartments = apartments;
      for (var i = 0; i < apartments.length; i++) {
        var pin = window.pin.render(apartments[i]);
        fragment.appendChild(pin);
      }
      document.querySelector('.tokyo__pin-map').appendChild(fragment);
      window.card.updatePanel(apartments[0]);
      tokyoPinMap.addEventListener('keydown', keydownHandler);
      dialogClose.addEventListener('click', window.card.closePanel);
      dialogClose.addEventListener('keydown', closeKeydownHandle);
      var mainPin = document.querySelector('.pin__main');
      mainPin.addEventListener('mousedown', onPinMove);
    },
    getApp: function (id) {
      for (var j = 0; j < _apartments.length; j++) {
        if (_apartments[j].author.avatar === id) {
          return _apartments[j];
        }
      }
      return '';
    },
    onError: function (message) {
      var errorBlock = document.querySelector('.header__error');
      errorBlock.textContent = message;
      errorBlock.classList.remove('invisible');
    },
    dialog: document.querySelector('.dialog')
  };

  // var form = document.querySelector('.notice__form');
  // form.addEventListener('submit', function (evt) {
  //   window.backend.save(new FormData(form), function () {
  //
  //     }
  //   , onError);
  //   evt.preventDefault();
  // });

  function onPinMove(evt) {
    evt.preventDefault();

    var target = evt.target.closest('.pin');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      evt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      target.style.top = (target.offsetTop - shift.y) + 'px';
      target.style.left = (target.offsetLeft - shift.x) + 'px';

      var address = document.querySelector('#address');
      address.value = 'x: ' + (target.offsetLeft + 32) + ', y: ' + (target.offsetTop + 94);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      tokyoPinMap.removeEventListener('mousemove', onMouseMove);
      tokyoPinMap.removeEventListener('mouseup', onMouseUp);
    };

    tokyoPinMap.addEventListener('mousemove', onMouseMove);
    tokyoPinMap.addEventListener('mouseup', onMouseUp);
  }


  function keydownHandler(event) {
    if (event.keyCode === 13) {
      window.pin.openCard(event);
    }
    if (event.keyCode === 27) {
      window.card.closePanel();
    }
  }

  function closeKeydownHandle(event) {
    if (event.keyCode === 13) {
      window.card.closePanel();
    }
  }
})();

window.backend.load(window.map.render, window.map.onError);
