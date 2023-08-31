const butInstall = document.getElementById('buttonInstall');

// Event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit'); 
    console.log("event" + event); 
    event.preventDefault(); 
    window.deferredPrompt = event; 
});

// Event listener for the 'click' event on the 'butInstall' element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return; 
    }
    promptEvent.prompt(); 
    window.deferredPrompt = null; 
    butInstall.classList.toggle('hidden', true); 
});

// Event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    console.log('install hit'); 
    window.deferredPrompt = null; 
});
