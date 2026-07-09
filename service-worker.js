self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

/* DAILY BACKGROUND CHECK */
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "check-protocol") {
    event.waitUntil(checkProtocol());
  }
});

/* READ PROTOCOL FROM STORAGE */
async function getProtocol() {
  const data = await self.registration.storage.get("saved_protocol");
  if (!data) return null;
  return JSON.parse(data);
}

/* CHECK IF TODAY HAS A SCHEDULED INJECTION */
async function checkProtocol() {
  const protocol = await getProtocol();
  if (!protocol || !protocol.notifyInjections) return;

  const start = new Date(protocol.startDate);
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const totalDays = protocol.cycleDuration * 7;

  if (diff < 0 || diff >= totalDays) return;

  let hasDoseToday = false;

  protocol.compounds.forEach(c => {
    const interval = Math.floor(7 / c.frequency);
    if (diff % interval === 0) hasDoseToday = true;
  });

  if (hasDoseToday) {
    self.registration.showNotification("Protocol Reminder", {
      body: "You scheduled an injection today.",
      icon: "protocol-logo.png",
      badge: "protocol-logo.png"
    });
  }
}
