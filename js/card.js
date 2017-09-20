'use strict';

window.card = (function () {

  var template = document.querySelector('#lodge-template').content;
  var types = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  function updateCard(_app) {
    var offerDialog = document.querySelector('#offer-dialog');
    var oldPanel = offerDialog.querySelector('.dialog__panel');
    var templateElement = template.cloneNode(true);
    var dialogTitle = offerDialog.querySelector('.dialog__title');
    templateElement.querySelector('.lodge__title').textContent = _app.offer.title;
    templateElement.querySelector('.lodge__address').textContent = _app.offer.address;
    templateElement.querySelector('.lodge__price').textContent = _app.offer.price + '₽/ночь';
    templateElement.querySelector('.lodge__type').textContent = types[_app.offer.type];
    templateElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + _app.offer.guests + ' гостей в ' + _app.offer.rooms + ' комнатах';
    templateElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + _app.offer.checkin + ', выезд до ' + _app.offer.checkout;
    templateElement.querySelector('.lodge__description').textContent = _app.offer.description;
    dialogTitle.querySelector('img').setAttribute('src', _app.author.avatar);
    var lodgeFeatures = templateElement.querySelector('.lodge__features');

    var photos = templateElement.querySelector('.lodge__photos');

    _app.offer.photos.forEach(function (photo) {
      var img = document.createElement('img');
      img.src = photo;
      img.width = 52;
      img.height = 42;
      img.alt = 'Lodge img';
      photos.appendChild(img);
    });

    _app.offer.features.forEach(function (feature) {
      var span = document.createElement('span');
      span.classList.add('feature__image');
      span.classList.add('feature__image--' + feature);
      lodgeFeatures.appendChild(span);
    });

    offerDialog.replaceChild(templateElement, oldPanel);
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    tokyoPinMap.addEventListener('keydown', onEscKeyDown);
  }

  function onEscKeyDown(event) {
    if (event.keyCode === 27) {
      window.card.closePanel();
    }
  }

  return {
    updatePanel: updateCard,
    closePanel: function () {
      window.map.dialog.style.display = 'none';
      window.pin.deselectPin();
      var dialogClose = window.map.dialog.querySelector('.dialog__close');
      dialogClose.removeEventListener('click', window.card.onCloseMouseClick);
      dialogClose.removeEventListener('keydown', window.pin.onCloseKeydown);
      var tokyoPinMap = document.querySelector('.tokyo__pin-map');
      tokyoPinMap.removeEventListener('keydown', onEscKeyDown);
    }
  };
})();
