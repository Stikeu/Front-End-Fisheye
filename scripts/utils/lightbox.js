function displayLightbox(imageURL, imageAlt) {
    const lightbox = document.getElementById("lightbox");
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    const imgExtension = imageURL.split(".").pop();
    
    header.setAttribute("aria-hidden", true);
    main.setAttribute("aria-hidden", true);
    lightbox.setAttribute("aria-hidden", false);
    imageContainer = document.querySelector(".image-container");

    if (imgExtension === "mp4") {
      imageContainer.innerHTML = `<video id="image" src="${imageURL}" alt="${imageAlt} " class="image-lightbox" controls/>`;
    } else {
      imageContainer.innerHTML = `<img id="image" src="${imageURL}" alt="${imageAlt}" class="image-lightbox" />`;
    }
    const imageLightboxTitle = document.createElement("p");
    imageLightboxTitle.classList.add("image-lightbox-title");
    imageLightboxTitle.innerText = `${imageAlt}`;
    imageContainer.appendChild(imageLightboxTitle);
    header.style.opacity = "0.1";
    main.style.opacity = "0.1";
    lightbox.style.display = "block";
  }
  
  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.setAttribute("aria-hidden", false);
    header.style.opacity = "1";
    main.setAttribute("aria-hidden", false);
    main.style.opacity = "1";
    lightbox.setAttribute("aria-hidden", true);
    lightbox.style.display = "none";
    document.getElementById("contact").focus();
  }
  
  function nextImage() {
    const images = Array.from(document.querySelectorAll(".video_image"));
    const gallery = images.map((image) => image.getAttribute("src"));
    const currentImage = document.getElementById("image");
  
    let imgIndex = gallery.findIndex(
      (img) => img === currentImage.getAttribute("src")
    );
    if (imgIndex === gallery.length - 1) {
      imgIndex = -1;
    }
  
    const nextImageAlt = images[imgIndex + 1]
      .getAttribute("alt")
      .split(",")
      .slice(0, 1);
  
    displayLightbox(gallery[imgIndex + 1], nextImageAlt);
  }
  
  function prevImage() {
    const images = Array.from(document.querySelectorAll(".video_image"));
    const gallery = images.map((image) => image.getAttribute("src"));
    const currentImage = document.getElementById("image");
  
    let imgIndex = gallery.findIndex(
      (img) => img === currentImage.getAttribute("src")
    );
  
    if (imgIndex === 0) {
      const prevImageAlt = images[images.length - 1]
        .getAttribute("alt")
        .split(",")
        .slice(0, 1);
      displayLightbox(gallery[gallery.length - 1], prevImageAlt);
    } else {
      const prevImageAlt = images[imgIndex - 1]
        .getAttribute("alt")
        .split(",")
        .slice(0, 1);
      displayLightbox(gallery[imgIndex - 1], prevImageAlt);
    }
  }
  
function globalLightboxListeners() {
    const images = Array.from(document.querySelectorAll(".video_image"));
    const imgLink = Array.from(document.querySelectorAll(".mediaLightbox"));
  
    images.forEach((image) =>
      image.addEventListener("click", (e) => {
        e.preventDefault();
  
        const imageURL = image.getAttribute("src");
        const imageAlt = image.getAttribute("alt").split(",").slice(0, 1);
  
        displayLightbox(imageURL, imageAlt);
      })
    );

    imgLink.forEach((element) => {
      element.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          const imageURL = element.firstChild.getAttribute("src");
          const imageAlt = element.firstChild
            .getAttribute("alt")
            .split(",")
            .slice(0, 1);
          displayLightbox(imageURL, imageAlt);
        }
      });
    });
  

  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");
  
  
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    nextImage();
  });
  
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    prevImage();
  });
  
  window.addEventListener("keydown", (e) => {
    if (
      document.getElementById("lightbox").getAttribute("aria-hidden") == "false"
    ) {
      e.preventDefault();
      switch (e.key) {
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "Escape":
          closeLightbox();
          break;
  
        default:
          return;
      }
    }
  });
}