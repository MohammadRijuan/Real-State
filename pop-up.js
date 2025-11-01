document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector(".play");

    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = 0;
    popupOverlay.style.left = 0;
    popupOverlay.style.width = "100%";
    popupOverlay.style.height = "100%";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    popupOverlay.style.display = "none";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.zIndex = "1000";

    // Create iframe for YouTube video
    const iframe = document.createElement("iframe");
    iframe.width = "80%";
    iframe.height = "75%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "16px";
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    
    popupOverlay.appendChild(iframe);
    document.body.appendChild(popupOverlay);

    playBtn.addEventListener("click", function() {
        iframe.src = "https://www.youtube.com/embed/qemqQHaeCYo?autoplay=1";
        popupOverlay.style.display = "flex";
    });

    // Close popup on click
    popupOverlay.addEventListener("click", function() {
        popupOverlay.style.display = "none";
        iframe.src = ""; 
    });
});
