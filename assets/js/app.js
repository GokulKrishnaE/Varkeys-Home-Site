// include html
let includes = $('[data-include]')
jQuery.each(includes, function(){
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
      items.forEach(item=>{
        item.classList.add('visible');
      })
    } else {
      items.forEach(item=>{
        item.classList.remove('visible');
      })
    }
  });
}, observerOptions);
const bannerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const bannerTitle = entry.target.querySelectorAll('h1');
    if (entry.isIntersecting) {
      bannerTitle.forEach(banner=>{
        banner.classList.add('visible');
      })
    } 
    else {
      bannerTitle.forEach(banner=>{
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
new Swiper('.hero-slider', {
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
});