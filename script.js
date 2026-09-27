// Breakthrough Author Live — small interactions, no build step needed.

document.addEventListener('DOMContentLoaded', function () {
  // VSL placeholder: clicking/enter shows a friendly note until a real video is added.
  var vsl = document.getElementById('vslPlaceholder');
  if (vsl) {
    var openNote = function () {
      vsl.querySelector('.video-caption').innerHTML =
        '<strong>Add your video:</strong> drop an .mp4 (or an embed) into the .video-placeholder in index.html to replace this placeholder.';
    };
    vsl.addEventListener('click', openNote);
    vsl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openNote();
      }
    });
  }

  // Track simple funnel events to localStorage so PageView/ViewContent style
  // events are visible during testing even without a real ad pixel wired up.
  try {
    var log = JSON.parse(localStorage.getItem('bal_events') || '[]');
    log.push({ event: 'PageView', page: location.pathname, at: Date.now() });
    localStorage.setItem('bal_events', JSON.stringify(log));
  } catch (e) { /* localStorage unavailable — ignore */ }

  // Every buy button counts as InitiateCheckout intent.
  document.querySelectorAll('a.btn-buy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      try {
        var log = JSON.parse(localStorage.getItem('bal_events') || '[]');
        log.push({ event: 'InitiateCheckout', at: Date.now() });
        localStorage.setItem('bal_events', JSON.stringify(log));
      } catch (e) { /* ignore */ }
      // If you wire up a real Meta Pixel, also call: fbq('track', 'InitiateCheckout');
    });
  });
});
