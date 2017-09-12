'use strict';

window.showCard = (function (event) {
  var checkPin = event.target.closest('.pin');
  if (checkPin) {
    window.pin.deselectPin();
    checkPin.classList.add('pin--active');
    var id = checkPin.querySelector('img').getAttribute('src');
    window.card.updatePanel(window.map.getApp(id));
    window.map.dialog.style.display = 'block';
  }
});
