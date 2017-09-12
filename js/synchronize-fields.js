'use strict';

window.synchronizeFields = (function (elementOne, elementTwo, valueOne, valueTwo, property) {
  elementOne.addEventListener('change', function () {
    elementTwo[property] = valueTwo[valueOne.indexOf(elementOne.value)];
  });
});
