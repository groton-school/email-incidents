chrome.runtime.onMessageExternal.addListener((request) => {
  if (request.copiedEmail) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('assets/images/logo-32px.png'),
      title: 'Email Incidents',
      message: `Copied email for "${request.copiedEmail}" to clipboard`
    });
  }
});
