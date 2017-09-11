'use strict';

window.generateApartments = (function (count) {
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var apartments;


  function getRandFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandInt(from, to) {
    return parseInt(Math.random() * (to - from) + from, 0);
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

  function generateApartments(_count) {
    apartments = [];
    for (var i = 1; i <= _count; i++) {

      var x = getRandInt(300, 900);
      var y = getRandInt(100, 500);

      apartments.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },

        'offer': {
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

        'location': {
          'x': x,
          'y': y
        }
      });
    }
    return apartments;
  }

  return generateApartments(count);
});
