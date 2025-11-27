// include html
let includes = $('[data-include]')
jQuery.each(includes, function () {
  let html = '/' + $(this).data('include') + '.html'
  $(this).load(html)
})

// intersection observer
const sections = document.querySelectorAll('.section');
const bannerSection = document.querySelector('.bannerSec');

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const items = entry.target.querySelectorAll('.section-title,.subhead,.roomWrapper');
    if (entry.isIntersecting) {
      items.forEach(item => {
        item.classList.add('visible');
      })
    } else {
      items.forEach(item => {
        item.classList.remove('visible');
      })
    }
  });
}, observerOptions);
const bannerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const bannerTitle = entry.target.querySelectorAll('h1');
    if (entry.isIntersecting) {
      bannerTitle.forEach(banner => {
        banner.classList.add('visible');
      })
    }
    else {
      bannerTitle.forEach(banner => {
        banner.classList.remove('visible');
      })
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});
bannerObserver.observe(bannerSection);


// sliders
new Swiper('.heroBannerSlider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 1,
  pagination: false
});

new Swiper(".testimonialSlider", {
  grabCursor: true,
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
  },
});

// $('#scrollToTop').click(function (e) {
//   e.preventDefault();
//   $('html, body').animate({ scrollTop: 0 }, 600); // 600ms for smooth scroll
//   return false;
// });

$(document).ajaxStop(function () {
  var $btn = $('#scrollTopButton');

  $('.navbar-toggler').click(function () {
    $('.navbar-collapse').toggleClass('show');
  })

  // Show/hide on scroll
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) { // show after 100px
      $btn.fadeIn();
    } else {
      $btn.fadeOut();
    }
  });

  // Scroll to top on click
  $btn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('header').addClass('header-sticky');
    } else {
      $('header').removeClass('header-sticky');
    }
  });

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  /* -----------------------------------
     DESKTOP → hover to open/close
  -----------------------------------*/
  $('.subMenuToggle').hover(
    function () {
      if (isMobile()) return;        // ignore hover on mobile
      $(this).find('.subMenu').stop(true, true).slideDown(200);
    },
    function () {
      if (isMobile()) return;
      $(this).find('.subMenu').stop(true, true).slideUp(200);
    }
  );

  /* -----------------------------------
     MOBILE → click main link to toggle
  -----------------------------------*/
  $('.subMenuToggle > a').on('click', function (e) {
    if (!isMobile()) return;           // only run on mobile
    e.preventDefault();                // stop the dummy link
    e.stopPropagation();               // prevent bubbling

    $(this)
      .siblings('.subMenu')
      .stop(true, true)
      .slideToggle(200);
  });


  /* -----------------------------------
     IMPORTANT: Allow submenu links to work
     WITHOUT triggering parent click
  -----------------------------------*/
  $('.subMenu a').on('click', function (e) {
    // stop bubbling so parent <li> doesn't react
    e.stopPropagation();
  });
});

$(document).ready(function () {

  // Select ALL elements inside body
  var elements = $("body .section, body img:not(.overlayBg), body h1, body h2, body h3, body p:not(.noAnim)");

  // Initial hidden styles
  elements.css({
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.6s ease, transform 0.6s ease"
  });

  function checkVisibility() {
    var windowBottom = $(window).scrollTop() + $(window).height();

    elements.each(function () {
      var $el = $(this);

      // already animated → skip
      if ($el.data("visible")) return;

      // element top position
      var elTop = $el.offset().top;

      if (windowBottom > elTop + 50) {
        $el.css({
          opacity: 1,
          transform: "translateY(0)"
        });

        $el.data("visible", true);
      }
    });
  }

  // Run on scroll + initial
  $(window).on("scroll", checkVisibility);
  checkVisibility();
});