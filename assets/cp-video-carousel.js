(function () {
  var VIDEOS = [
    { thumbnail: "/wp-content/uploads/2023/10/yt-1-300x225.jpg", videoId: "m8_R8TNoxLs", label: "yt-1" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-2-300x225.jpg", videoId: "2EQJ6FCJ6kE", label: "yt-2" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-3-300x225.jpg", videoId: "w3hsDDQRZvg", label: "yt-3" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-4-300x225.jpg", videoId: "vZj1MHeCXo4", label: "yt-4" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-5-300x225.jpg", videoId: "1-QT0QE9s9w", label: "yt-5" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-6-300x225.jpg", videoId: "8D-GpnvKVx4", label: "yt-6" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-7-300x225.jpg", videoId: "n06TpqKBws8", label: "yt-7" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-8-300x225.jpg", videoId: "fDHjEayZYXM", label: "yt-8" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-9-300x225.jpg", videoId: "-GUXyZ3GGU4", label: "yt-9" },
    { thumbnail: "/wp-content/uploads/2023/10/yt-10-300x225.jpg", videoId: "giOh9ryjXg8", label: "yt-10" },
  ];

  function getLightbox() {
    var lightbox = document.querySelector(".cp-video-lightbox");
    if (lightbox) return lightbox;

    lightbox = document.createElement("div");
    lightbox.className = "cp-video-lightbox";
    lightbox.hidden = true;

    var inner = document.createElement("div");
    inner.className = "cp-video-lightbox__inner";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "cp-video-lightbox__close";
    closeBtn.setAttribute("aria-label", "Close video");
    closeBtn.textContent = "×";

    var iframe = document.createElement("iframe");
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    inner.appendChild(closeBtn);
    inner.appendChild(iframe);
    lightbox.appendChild(inner);
    document.body.appendChild(lightbox);

    function close() {
      lightbox.hidden = true;
      iframe.src = "";
    }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    lightbox.open = function (videoId) {
      iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
      lightbox.hidden = false;
    };

    return lightbox;
  }

  function buildCarousel(root) {
    var index = 0;
    var timer = null;
    var perView = window.innerWidth >= 768 ? 3 : 1;
    var lightbox = getLightbox();

    var viewport = document.createElement("div");
    viewport.className = "cp-video-carousel__viewport";
    var track = document.createElement("div");
    track.className = "cp-video-carousel__track";

    var slideEls = VIDEOS.map(function (v) {
      var slide = document.createElement("div");
      slide.className = "cp-video-carousel__slide";
      slide.setAttribute("role", "button");
      slide.setAttribute("aria-label", "Play video " + v.label);

      var inner = document.createElement("div");
      inner.className = "cp-video-carousel__slide-inner";
      inner.style.backgroundImage = "url('" + v.thumbnail + "')";
      slide.appendChild(inner);

      var play = document.createElement("div");
      play.className = "cp-video-carousel__play";
      play.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      inner.appendChild(play);

      slide.addEventListener("click", function () {
        lightbox.open(v.videoId);
      });

      track.appendChild(slide);
      return slide;
    });

    viewport.appendChild(track);

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "cp-video-carousel__arrow cp-video-carousel__arrow--prev";
    prevBtn.setAttribute("aria-label", "Previous videos");
    prevBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "cp-video-carousel__arrow cp-video-carousel__arrow--next";
    nextBtn.setAttribute("aria-label", "Next videos");
    nextBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

    var dots = document.createElement("div");
    dots.className = "cp-video-carousel__dots";
    var dotEls = VIDEOS.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "cp-video-carousel__dot";
      dot.setAttribute("aria-label", "Go to video " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        startAutoplay();
      });
      dots.appendChild(dot);
      return dot;
    });

    root.appendChild(viewport);
    root.appendChild(prevBtn);
    root.appendChild(nextBtn);
    root.appendChild(dots);

    function maxIndex() {
      return Math.max(0, VIDEOS.length - perView);
    }

    function render() {
      var slideWidthPct = 100 / perView;
      track.style.transform = "translateX(-" + index * slideWidthPct + "%)";
      dotEls.forEach(function (d, i) {
        d.className = "cp-video-carousel__dot" + (i === index ? " cp-video-carousel__dot--active" : "");
      });
    }

    function goTo(i) {
      var max = maxIndex();
      if (i < 0) i = max;
      if (i > max) i = 0;
      index = i;
      render();
    }

    function next() {
      goTo(index + 1);
    }
    function prev() {
      goTo(index - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(next, 5000);
    }
    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    prevBtn.addEventListener("click", function () {
      prev();
      startAutoplay();
    });
    nextBtn.addEventListener("click", function () {
      next();
      startAutoplay();
    });
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);

    window.addEventListener("resize", function () {
      var newPerView = window.innerWidth >= 768 ? 3 : 1;
      if (newPerView !== perView) {
        perView = newPerView;
        goTo(0);
      }
    });

    render();
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var roots = document.querySelectorAll(".cp-video-carousel");
    roots.forEach(buildCarousel);
  });
})();
