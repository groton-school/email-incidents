const script = document.createElement('script');
script.type = 'text/javascript';
script.src = chrome.runtime.getURL('scripts/inject.js');
document.body.appendChild(script);
