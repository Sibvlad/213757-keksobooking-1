'use strict';

window.map = (function () {
  var apartments = window.generateApartments(8);

  var fragment = document.createDocumentFragment();
  var dialogClose = document.querySelector('.dialog__close');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  return {
    render: function () {
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
      for (var j = 0; j < apartments.length; j++) {
        if (apartments[j].author.avatar === id) {
          return apartments[j];
        }
      }
      return '';
    },
    dialog: document.querySelector('.dialog')
  };


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

window.map.render();
