'use strict';

function timerGame (callback) {
  setTimeout(() => {
    callback && callback();
  }, 1000);
}

module.exports = timerGame;