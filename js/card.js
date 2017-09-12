'use strict';

window.card = (function () {

  var template = document.querySelector('#lodge-template').content;
  var russianTypes = {
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
    templateElement.querySelector('.lodge__type').textContent = russianTypes[_app.offer.type];
    templateElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + _app.offer.guests + ' гостей в ' + _app.offer.rooms + ' комнатах';
    templateElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + _app.offer.checkin + ', выезд до ' + _app.offer.checkout;
    templateElement.querySelector('.lodge__description').textContent = _app.offer.description;
    dialogTitle.querySelector('img').setAttribute('src', _app.author.avatar);
    var lodgeFeatures = templateElement.querySelector('.lodge__features');


    for (var i = 0; i < _app.offer.features.length; i++) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + _app.offer.features[i]);
      lodgeFeatures.appendChild(feature);
    }

    offerDialog.replaceChild(templateElement, oldPanel);
  }

  return {
    updatePanel: updateCard,
    closePanel: function () {
      window.map.dialog.style.display = 'none';
      window.pin.deselectPin();
    }
  };
})();
