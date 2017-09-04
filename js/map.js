'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var russianTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var template = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var oldPanel = offerDialog.querySelector('.dialog__panel');
var dialogTitle = offerDialog.querySelector('.dialog__title');

function getRandFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandInt(from, to) {
  return parseInt(Math.random() * (to - from) + from);
}

function getRandFeatures() {
  var result = [];

  for (var i = 0; i < features.length; i++) {
    if (Math.random() > 0.5) {
      result.push(features[i]);
    }
  }
  return result;
}

function generateApartments(count) {

  apartments = [];

  for (var i = 1; i <= count; i++) {

    var x = getRandInt(300, 900);
    var y = getRandInt(100, 500);

    apartments.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer':
        {
          'title': getRandFromArray(titles),
          'address': x + ',' + y,
          'price': getRandInt(1000, 1000000),
          'type': getRandFromArray(types),
          'rooms': getRandInt(1, 5),
          'guests': getRandInt(1, 25),
          'checkin': getRandFromArray(checkin),
          'checkout': getRandFromArray(checkout),
          'features': getRandFeatures(features),
          'description': '',
          'photos': []
        },

      'location':
        {
          'x': x,
          'y': y
        }
    })
  }
  return apartments;
}

function renderPin(apartment) {
  var div = document.createElement('div');
  div.className = 'pin';
  div.setAttribute('style', 'left: ' + apartment.location.x + 'px; top: ' + apartment.location.y + 'px');
  var img = document.createElement('img');
  img.className = 'rounded';
  img.setAttribute('width', '40');
  img.setAttribute('height', '40');
  img.setAttribute('src', apartment.author.avatar);
  div.insertAdjacentHTML('afterBegin', img.outerHTML);
  return div;
}

var renderPanel = function (app) {
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.lodge__title').textContent = app.offer.title;
  templateElement.querySelector('.lodge__address').textContent = app.offer.address;
  templateElement.querySelector('.lodge__price').textContent = app.offer.price + ' ₽/ночь';
  templateElement.querySelector('.lodge__type').textContent = russianTypes[app.offer.type];
  templateElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + app.offer.guests + ' гостей в ' + app.offer.rooms + ' комнатах';
  templateElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + app.offer.checkin + ', выезд до ' + app.offer.checkout;
  templateElement.querySelector('.lodge__description').textContent = app.offer.description;
  dialogTitle.querySelector('img').setAttribute('src', app.author.avatar);
  var lodgeFeatures = templateElement.querySelector('.lodge__features');

  for (var i = 0; i < app.offer.features.length; i++) {
    var feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + app.offer.features[i]);
    lodgeFeatures.appendChild(feature);
  }
  offerDialog.replaceChild(templateElement, oldPanel);
}

var fragment = document.createDocumentFragment();
var apartments = generateApartments(8);

for (var i = 0; i < apartments.length; i++) {
  fragment.appendChild(renderPin(apartments[i]));
}
document.querySelector('.tokyo__pin-map').appendChild(fragment);


renderPanel(apartments[1]);


