chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.clear(); // Clear storage on installation for testing
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveTime") {
      chrome.storage.sync.set({[message.videoUrl]: message.currentTime}, () => {
        sendResponse({status: "Time saved"});
      });
      return true; // Keeps the message channel open for sendResponse
    } else if (message.action === "getTime") {
      chrome.storage.sync.get([message.videoUrl], (result) => {
        sendResponse({currentTime: result[message.videoUrl] || 0});
      });
      return true; // Keeps the message channel open for sendResponse
    }
  });
  