const throttle = require('lodash.throttle');
import Player from '@vimeo/player';

const CURRENT_TIME = 'videoplayer-current-time';
const player = new Player(document.querySelector('iframe'));

lookForSavedTime();

player.on('timeupdate', throttle(onPlayerTimeupdate, 1000));

function onPlayerTimeupdate(e) {
  localStorage.setItem(CURRENT_TIME, e.seconds);
}
function lookForSavedTime() {
  if (localStorage.getItem(CURRENT_TIME) !== null) {
    player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
  }
}
