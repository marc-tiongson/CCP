(function () {
  var TESTIMONIALS = [
    {
      quote:
        "Inspiring, informative, encouraging! I was overwhelmed, looking for guidance through our strategic plan, the information is invaluable to reinvigorating and accomplishing our goals.",
      name: "Dori Parker",
      title: "Board Member",
      image: "/wp-content/uploads/2023/08/dori-parker-v2-1-150x150.webp",
    },
    {
      quote:
        "Cheryl is extremely knowledgeable in her field. She knows what steps are necessary to help your organization move to the next level. She is definitely an asset to an organization looking to succeed.",
      name: "Alicia Robinson",
      title: "Executive Director",
      image: "/wp-content/uploads/2023/08/alicia-robinson-v2-150x150.webp",
    },
    {
      quote:
        "I would recommend working with Cheryl to someone who might be on the fence because she has given us the necessary tools to be effective and works closely with us following her assessment. Three benefits we've experienced as a result of working with Cheryl are: 1) Identifying what we had not done. 2) Identifying what we should be doing. 3) Determining how to go about doing it!",
      name: "Lizzie Thompson",
      title: "Development Officer",
      image: null,
    },
  ];

  function buildCarousel(root) {
    var index = 0;
    var timer = null;

    var card = document.createElement("div");
    card.className = "cp-carousel__card";

    var img = document.createElement("img");
    img.className = "cp-carousel__photo";

    var quote = document.createElement("p");
    quote.className = "cp-carousel__quote";

    var name = document.createElement("p");
    name.className = "cp-carousel__name";
    var nameText = document.createTextNode("");
    var titleSpan = document.createElement("span");
    titleSpan.className = "cp-carousel__title";
    name.appendChild(nameText);
    name.appendChild(titleSpan);

    var cta = document.createElement("a");
    cta.className = "cp-carousel__cta";
    cta.href = "#";
    cta.textContent = "Get Inspired";

    card.appendChild(img);
    card.appendChild(quote);
    card.appendChild(name);
    card.appendChild(cta);

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "cp-carousel__arrow cp-carousel__arrow--prev";
    prevBtn.setAttribute("aria-label", "Previous testimonial");
    prevBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "cp-carousel__arrow cp-carousel__arrow--next";
    nextBtn.setAttribute("aria-label", "Next testimonial");
    nextBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

    var dots = document.createElement("div");
    dots.className = "cp-carousel__dots";
    var dotEls = TESTIMONIALS.map(function (t, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "cp-carousel__dot";
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dots.appendChild(dot);
      return dot;
    });

    root.appendChild(card);
    root.appendChild(prevBtn);
    root.appendChild(nextBtn);
    root.appendChild(dots);

    function render() {
      var t = TESTIMONIALS[index];
      if (t.image) {
        img.src = t.image;
        img.alt = t.name;
        img.style.display = "";
      } else {
        img.style.display = "none";
      }
      quote.textContent = "“" + t.quote + "”";
      name.firstChild.textContent = t.name + " ";
      titleSpan.textContent = t.title;
      dotEls.forEach(function (d, i) {
        d.className = "cp-carousel__dot" + (i === index ? " cp-carousel__dot--active" : "");
      });
    }

    function goTo(i) {
      index = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
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
      timer = setInterval(next, 6000);
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

    render();
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var roots = document.querySelectorAll(".cp-carousel");
    roots.forEach(buildCarousel);
  });
})();
