document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('slider');
    const slides = Array.from(slider.getElementsByClassName('slider-slide'));
    const slideCount = slides.length;
    let currentSlide = 0;

    function showSlide(index) {
      if (index < 0 || index >= slideCount) {
        return;
      }

      slides.forEach((slide) => {
        slide.classList.remove('active');
      });

      slides[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slideCount;
      showSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentSlide - 1 + slideCount) % slideCount;
      showSlide(prevIndex);
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', function () {
      prevSlide();
    });

    nextBtn.addEventListener('click', function () {
      nextSlide();
    });

    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
      
        for (var i = 0; i < reveals.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = reveals[i].getBoundingClientRect().top;
          var elementVisible = 150;
      
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
          } else {
            reveals[i].classList.remove("active");
          }
        }
      }
      
      window.addEventListener("scroll", reveal);
  });