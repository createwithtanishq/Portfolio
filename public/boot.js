/* Runs before first paint: marks JS as available and applies the saved motion preference. */
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  try { if (localStorage.getItem('motion') === 'off') d.classList.add('motion-off'); } catch (e) {}
})();
