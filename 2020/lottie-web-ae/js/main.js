var animation = bodymovin.loadAnimation({
  container: document.getElementById('player-anim'), // Required
  path: 'data.json', // Required
  renderer: 'svg/canvas/html', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: 'Player Animation', // Name for future reference. Optional.
});
