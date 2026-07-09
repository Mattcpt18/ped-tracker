if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then(async (reg) => {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    if ("periodicSync" in reg) {
      try {
        await reg.periodicSync.register("check-protocol", {
          minInterval: 24 * 60 * 60 * 1000
        });
      } catch (e) {
        console.log("Periodic Sync not supported");
      }
    }
  });
}
