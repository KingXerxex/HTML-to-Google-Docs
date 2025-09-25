chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'savePage') {
        const APPS_SCRIPT_WEB_APP_URL = 'Deploy Script in Apps Script as a Web App and place the url HERE';
        fetch(APPS_SCRIPT_WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', 
            },
            body: JSON.stringify({
                html: message.html,
                title: message.title
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data.startsWith('https')) {
                chrome.tabs.create({ url: data });
                chrome.tabs.sendMessage(sender.tab.id, { action: 'pageSaved' });
            } else {                
                console.error('Error from Apps Script:', data);
            }
        })
        .catch(error => console.error('Fetch error:', error));
       
        return true; 
    }
});