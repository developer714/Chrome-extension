document.getElementById('clear').addEventListener('click', function () {
    chrome.storage.sync.clear();
    alert('Saved playback times cleared.');
});