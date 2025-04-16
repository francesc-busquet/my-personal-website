document.addEventListener("DOMContentLoaded", function () {
  const imageMap = {
    "overview-app": "assets/updated-overview-app",
    "batching-schematic-representation": "assets/batching-schematic-representation",
    "improving-app-with-batching": "assets/improving-app-with-batching",
    "improving-app-with-caching": "assets/improving-app-with-caching"
  };

  let lastMode = document.body.classList.contains("quarto-light") ? "light" : "dark";

  function getCurrentMode() {
    return document.body.classList.contains("quarto-light") ? "light" : "dark";
  }

  function getUpdatedSrc(src, isLightMode) {
    const match = Object.entries(imageMap).find(([key, _]) => src.includes(key));
    if (match) {
      const [, baseSrc] = match;
      return isLightMode ? `${baseSrc}.png` : `${baseSrc}-dark-mode.png`;
    }
    return src; // unchanged if not matched
  }

  function updateImages(force = false) {
    const currentMode = getCurrentMode();
    if (!force && currentMode === lastMode) return;

    const isLightMode = currentMode === "light";

    // Update inline images
    document.querySelectorAll("img").forEach(img => {
      img.src = getUpdatedSrc(img.src, isLightMode);
    });

    // Update lightbox images
    document.querySelectorAll(".gslide-image img").forEach(img => {
      img.src = getUpdatedSrc(img.src, isLightMode);
    });

    lastMode = currentMode;
  }

  updateImages(true); // initial run

  // Observe body class change
  const themeObserver = new MutationObserver(() => updateImages());
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });

  // Observe lightbox DOM changes
  const lightboxObserver = new MutationObserver(() => updateImages(true));
  lightboxObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
});
