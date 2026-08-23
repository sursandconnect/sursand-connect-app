
(function () {
  const SYNC_KEY = 'scLastDataSync';

  function controller() {
    return navigator.serviceWorker && navigator.serviceWorker.controller;
  }

  function requestRefresh() {
    const c = controller();
    if (c) {
      c.postMessage({ type: 'SC_REFRESH_DATA' });
    }
  }

  function setLastSync(value) {
    try {
      localStorage.setItem(SYNC_KEY, value || new Date().toISOString());
    } catch (_) {}
  }

  window.SursandOffline = {
    refresh: requestRefresh,
    lastSync: function () {
      try {
        return localStorage.getItem(SYNC_KEY) || '';
      } catch (_) {
        return '';
      }
    }
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', function (event) {
      const data = event.data || {};

      if (data.type === 'SC_DATA_UPDATED') {
        setLastSync(data.timestamp);

        /*
          We deliberately DO NOT force-reload an open page.
          This prevents losing partially completed forms.
          The updated data is available immediately on the
          next page opening, navigation, refresh or data request.
        */
        window.dispatchEvent(
          new CustomEvent('sursand-data-updated', {
            detail: data
          })
        );
      }
    });

    navigator.serviceWorker.ready.then(function () {
      if (navigator.onLine) {
        requestRefresh();
      }
    }).catch(function () {});
  }

  window.addEventListener('online', function () {
    requestRefresh();
  });
})();
