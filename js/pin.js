'use strict';

window.pin = (function () {
  return {
    render: function (apartment) {
      var div = document.createElement('div');
      div.className = 'pin';
      div.setAttribute('style', 'left: ' + apartment.location.x + 'px; top: ' + apartment.location.y + 'px');
      var img = document.createElement('img');
      img.className = 'rounded';
      img.setAttribute('width', '40');
      img.setAttribute('height', '40');
      img.setAttribute('src', apartment.author.avatar);
      img.setAttribute('tabindex', '0');
      div.insertAdjacentHTML('afterBegin', img.outerHTML);
      div.addEventListener('click', window.pin.openCard);

      return div;
    },
    deselectPin: function () {
      var element = document.querySelector('.pin--active');
      if (element) {
        element.classList.remove('pin--active');
      }
    },
    openCard: function (event) {
      var checkPin = event.target.closest('.pin');
      if (checkPin) {
        window.pin.deselectPin();
        checkPin.classList.add('pin--active');
        var id = checkPin.querySelector('img').getAttribute('src');
        window.card.updatePanel(window.map.getApp(id));
        window.map.dialog.style.display = 'block';
      }
    }
  };
})();

