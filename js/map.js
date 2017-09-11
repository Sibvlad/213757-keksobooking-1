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
