document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");
  
    videos.forEach(video => {
      const videoUrl = video.currentSrc;
  
      // Fetch the saved time from storage
      chrome.runtime.sendMessage({action: "getTime", videoUrl}, (response) => {
        video.currentTime = response.currentTime;
  
        video.addEventListener("timeupdate", () => {
          chrome.runtime.sendMessage({action: "saveTime", videoUrl, currentTime: video.currentTime});
        });
      });
    });
  });
  