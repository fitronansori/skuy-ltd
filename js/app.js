jQuery(document).ready(function ($) {
  'use strict';

  let mainSlider = $('.main-slider');
  let hamburger = $('.hamburger_container');
  let menu = $('.hamburger_menu');
  let menuActive = false;
  let hamburgerClose = $('.hamburger_close');
  let fsOverlay = $('.fs_menu_overlay');

  initMenu();
  initFavorite();
  initIsotopeFiltering();
  initTimer();
  initSlider();
  // 2. Inits Menu
  function initMenu() {
    if (hamburger.length) {
      hamburger.on('click', function () {
        if (!menuActive) {
          openMenu();
        }
      });
    }
    if (fsOverlay.length) {
      fsOverlay.on('click', function () {
        if (menuActive) {
          closeMenu();
        }
      });
    }
    if (hamburgerClose.length) {
      hamburgerClose.on('click', function () {
        if (!menuActive) {
          closeMenu();
        }
      });
    }
    if (($('.menu_item'), length)) {
      var items = document.getElementsByClassName('menu_item');
      var i;

      for (i = 0; i < items.length; i++) {
        if (items[i].classList.contains('has-children')) {
          items[i].onclick = function () {
            this.classList.toggle('active');
            var panel = this.children[1];
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + 'px';
            }
          };
        }
      }
    }
  }

  function openMenu() {
    menu.addClass('active');
    fsOverlay.css('pointer-events', 'auto');
    menuActive = true;
  }
  function closeMenu() {
    menu.removeClass('active');
    fsOverlay.css('pointer-events', 'none');
    menuActive = false;
  }

  // 3. Init Timer

  function initTimer() {
    if ($('.timer').length) {
      // let data = new Date();
      // data.setDate(data.getDate() + 3);
      // let target_date = data.getTime();

      let target_date = new Date('July 10,2022').getTime();

      // variables for time units
      let days, hours, minutes, seconds;
      let d = $('#day');
      let h = $('#hour');
      let m = $('#minute');
      let s = $('#second');

      setInterval(function () {
        // find the amount of "seconds" between now and target
        let current_date = new Date().getTime();
        let seconds_left = (target_date - current_date) / 1000;

        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);

        // format countdown string + set taget date
        d.text(days);
        h.text(hours);
        m.text(minutes);
        s.text(seconds);
      }, 1000);
    }
  }

  // 4. Init Favorite
  function initFavorite() {
    if ($('.favorite').length) {
      let favs = $('.favorite');
      favs.each(function () {
        let fav = $(this);
        let active = false;
        if (fav.hasClass('active')) {
          active = true;
        }
        fav.on('click', function () {
          if (active) {
            fav.removeClass('active');
            active = false;
          } else {
            fav.addClass('active');
            active = true;
          }
        });
      });
    }
  }

  // 5. Init Isotope Filtering
  function initIsotopeFiltering() {
    if ($('.grid_sorting_button').length) {
      $('.grid_sorting_button').click(function () {
        $('.grid_sorting_button').removeClass('active');
        $(this).addClass('active');

        let selector = $(this).attr('data-filter');
        $('.product-grid').isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
          },
        });
        return false;
      });
    }
  }

  // 6. Init Slider
  function initSlider() {
    if ($('.product_slider').length) {
      let slider1 = $('.product_slider');

      slider1.owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        responsive: {
          0: { items: 1 },
          480: { items: 2 },
          768: { items: 3 },
          991: { items: 4 },
          1280: { items: 5 },
          1440: { items: 6 },
        },
      });

      if ($('.product_slider_nav_left').length) {
        $('.product_slider_nav_left').on('click', function () {
          slider1.trigger('prev.owl.carousel');
        });
      }

      if ($('.product_slider_nav_right').length) {
        $('.product_slider_nav_right').on('click', function () {
          slider1.trigger('next.owl.carousel');
        });
      }
    }
  }
});
