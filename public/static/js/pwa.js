(function () {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').catch(function () {
            // App still works in the browser if service worker registration fails.
        });
    });
})();
