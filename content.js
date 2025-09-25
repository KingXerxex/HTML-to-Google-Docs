const saveButton = document.createElement('button');
saveButton.innerText = 'Save to Google Docs';
Object.assign(saveButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '9999',
    padding: '10px 15px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)'
});
document.body.appendChild(saveButton);
saveButton.addEventListener('click', () => {
    console.log("Save button clicked. Sending page HTML to background script.");
    saveButton.innerText = 'Saving...';
    saveButton.disabled = true;
    chrome.runtime.sendMessage({
        action: 'savePage',
        title: document.title,
        html: document.documentElement.outerHTML
    });
});
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'pageSaved') {
        saveButton.innerText = 'Saved!';
        setTimeout(() => {
            saveButton.innerText = 'Save to Google Docs';
            saveButton.disabled = false;
        }, 2000);
    }
});