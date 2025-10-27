document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector(".play");
    const bedImg = document.querySelector(".bed");

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
    popupOverlay.style.cursor = "pointer";

    // Create full image inside overlay
    const fullImg = document.createElement("img");
    fullImg.src = bedImg.src;
    fullImg.style.width = "80vw";     
    fullImg.style.height = "75vh"; 
    fullImg.style.objectFit = "cover";
    fullImg.style.borderRadius = "16px";
    fullImg.style.boxShadow = "0 0 40px rgba(255,255,255,0.3)";
    popupOverlay.appendChild(fullImg);

   
    document.body.appendChild(popupOverlay);

    playBtn.addEventListener("click", function() {
        popupOverlay.style.display = "flex";
    });


    popupOverlay.addEventListener("click", function() {
        popupOverlay.style.display = "none";
    });
});