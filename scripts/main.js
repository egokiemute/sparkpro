/*!
  * Template Name: Upside Real Estate Html Template
  * Author: Notionhive
  * Description: Upside is a sleek and modern HTML template designed exclusively for the real estate industry. 
  * Whether you're a real estate agency, property developer, or a realtor looking to showcase your listings online,
  * Upside is the perfect solution. This beautifully crafted template combines stunning visuals with powerful
  * functionality to create a remarkable online presence for your real estate business.
  * Version: 1.0.0
  * 
  **/
(() => {
  // global object
  const UPSIDE = {};

  // app loader
  UPSIDE.appLoader = () => {
    document.getElementById("appLoader")?.classList.add("hide");
  };

  // WOW animation
  UPSIDE.initWOW = () => {
    new WOW().init();
  };

  // toggle dropdown
  UPSIDE.toggleDropdown = () => {
    const dropdownTogglers = Array.from(
      document.getElementsByClassName("dropdown-toggle")
    );

    const toggleDropdown = function () {
      const dropdown = this.closest(".dropdown");

      dropdown.classList.toggle("active");
    };

    dropdownTogglers.forEach((toggler) => {
      toggler.addEventListener("click", toggleDropdown);
    });

    window.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown")) {
        dropdownTogglers.forEach((toggler) =>
          toggler.closest(".dropdown").classList.remove("active")
        );
      }
    });
  };

  // toggle modal
  UPSIDE.toggleModal = () => {
    const modalTriggers = Array.from(
      document.querySelectorAll('[data-toggle="modal"]')
    );
    const modals = Array.from(document.getElementsByClassName("modal"));

    const toggleModal = function (event) {
      event.preventDefault();
      const id = this.dataset.target || this.getAttribute("data-target");
      const modal = document.querySelector(id);

      if (!modal.classList.contains("show")) {
        modals.forEach((modal) => modal.classList.remove("show"));
        modal.classList.add("show");
        return;
      }

      modal.classList.remove("show");
    };

    const hideModal = function (event) {
      if (
        event.target !== this &&
        event.target !== this.querySelector(".modal-dialog")
      )
        return;

      this.classList.remove("show");
    };

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", toggleModal);
    });
    modals.forEach((modal) => {
      modal.addEventListener("click", hideModal);
    });
  };

  // toggle offcanvas
  UPSIDE.toggleOffcanvas = () => {
    // offcanvas
    const offcanvasToggles = Array.from(
      document.querySelectorAll('[data-toggle="offcanvas"]')
    );

    const createElement = (tag, attribute, attributeValues) => {
      const element = document.createElement(tag);
      element.setAttribute(attribute, attributeValues);

      return element;
    };

    const toggleOffcanvas = function (event) {
      event.preventDefault();
      const id = this.dataset.target || this.getAttribute("data-target");
      const offcanvas = document.querySelector(id);
      const offcanvases = Array.from(
        document.getElementsByClassName("offcanvas")
      );
      const backdrops = Array.from(
        document.querySelectorAll(".offcanvas-backdrop")
      );
      let backdropPrevOffcanvas = offcanvas;

      if (offcanvas.closest(".navbar")) {
        backdropPrevOffcanvas = offcanvas.closest(".navbar");
      }

      const hasBackdrop = backdropPrevOffcanvas.nextElementSibling
        ? backdropPrevOffcanvas.nextElementSibling.className.indexOf("backdrop")
        : -1;

      if (hasBackdrop < 0) {
        const backdrop = createElement(
          "div",
          "class",
          "offcanvas-backdrop show"
        );

        // hide all the prev backdrops and offcanvas
        backdrops.forEach((backdrop) => backdrop.classList.remove("show"));
        offcanvases.forEach((offcanvas) => offcanvas.classList.remove("show"));
        offcanvasToggles.forEach((toggler) =>
          toggler.classList.remove("active")
        );

        // show new offcanvas and its backdrop
        this.classList.add("active");
        offcanvas.classList.add("show");
        document.body.style.overflow = "hidden";
        backdropPrevOffcanvas.insertAdjacentElement("afterend", backdrop);

        backdrop.addEventListener("click", () => {
          backdrop.classList.remove("show");
          offcanvases.forEach((offcanvas) =>
            offcanvas.classList.remove("show")
          );
          offcanvasToggles.forEach((toggler) =>
            toggler.classList.remove("active")
          );
          document.body.style.overflow = "auto";
        });
        return;
      }

      // hide all the prev backdrops and offcanvas
      backdrops.forEach((backdrop) => backdrop.classList.remove("show"));

      if (!offcanvas.classList.contains("show")) {
        offcanvases.forEach((offcanvas) => offcanvas.classList.remove("show"));
        offcanvasToggles.forEach((toggler) =>
          toggler.classList.remove("active")
        );
        document.body.style.overflow = "hidden";
        this.classList.add("active");
        offcanvas.classList.add("show");
        backdropPrevOffcanvas.nextElementSibling.classList.add("show");
        return;
      }

      offcanvases.forEach((offcanvas) => offcanvas.classList.remove("show"));
      offcanvasToggles.forEach((toggler) => toggler.classList.remove("active"));
      document.body.style.overflow = "auto";
    };

    offcanvasToggles.forEach((toggle) => {
      toggle.addEventListener("click", toggleOffcanvas);
    });
  };

  // navigate tabs
  UPSIDE.navigateTabs = () => {
    const togglers = Array.from(
      document.querySelectorAll('[data-toggle="tab"]')
    );
    const tabpanes = Array.from(document.querySelectorAll(".tabpane"));

    const toggleTabpane = function () {
      const id = this.dataset.nhTarget || this.getAttribute("data-target");
      const tabpane = document.querySelector(id);

      togglers.forEach((toggler) => toggler.classList.remove("active"));
      tabpanes.forEach((tabpane) => tabpane.classList.remove("show"));

      this.classList.add("active");
      tabpane.classList.add("show");
    };

    togglers.forEach((toggler) => {
      toggler.addEventListener("click", toggleTabpane);
    });
  };

  // toggle navbar
  UPSIDE.toggleNavbar = () => {
    const toggler = document.querySelector('[data-toggle="navbar"]');

    const toggleNavbar = function () {
      const id = this.dataset.target || this.getAttribute("data-target");
      const menu = document.querySelector(id);

      if (
        !this.classList.contains("active") &&
        !menu.classList.contains("show")
      ) {
        this.classList.add("active");
        menu.classList.add("show");
        document.body.style.overflow = "hidden";
        return;
      }

      this.classList.remove("active");
      menu.classList.remove("show");
      document.body.style.overflow = "auto";
    };

    toggler.addEventListener("click", toggleNavbar);
  };

  UPSIDE.resetNavbar = () => {
    const toggler = document.querySelector('[data-toggle="navbar"]');
    const screenSize = window.innerWidth;
    const id = toggler.dataset.target || toggler.getAttribute("data-target");
    const menu = document.querySelector(id);

    if (screenSize > 992) {
      toggler.classList.remove("active");
      menu.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  };

  // init swiper slider
  UPSIDE.initSwiper = (selector = ".swiper", options = {}) => {
    const swipterContainer = document.querySelector(selector);

    if (!swipterContainer) return;

    const swiper = new Swiper(selector, options);

    return swiper;
  };

  UPSIDE.swiperSliders = () => {
    // explore popular area slider
    (() => {
      const swiper = UPSIDE.initSwiper(".explore-popular-area-swiper", {
        slidesPerView: 1.25,
        autoplay: true,
        // rewind: true,
        navigation: {
          nextEl: ".explore-popular-area-swiper .swiper-arrow-next",
          prevEl: ".explore-popular-area-swiper .swiper-arrow-prev",
        },
        breakpoints: {
          // when window width is >= 0px
          0: {
            spaceBetween: 10,
          },
          // when window width is >= 430px
          430: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          // when window width is >= 576px
          576: {
            slidesPerView: 1.75,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2.25,
            spaceBetween: 20,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
        },
      });
    })();

    // our facilities slider
    (() => {
      const generateSliderFractionAndTitle = (slide) => {
        slideTitle = document.querySelector(
          ".our-facilities-swiper-pagination .title"
        );
        paginationFraction = document.querySelector(
          ".our-facilities-swiper-pagination .h2"
        );

        slideTitle.innerHTML = slide.querySelector("img").alt;
        paginationFraction.innerHTML = slide.ariaLabel;
      };

      const swiper = UPSIDE.initSwiper(".our-facilities-swiper", {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".our-facilities-swiper .swiper-arrow-next",
          prevEl: ".our-facilities-swiper .swiper-arrow-prev",
        },
        on: {
          init: function (swiper) {
            const { activeIndex, slides } = swiper;
            generateSliderFractionAndTitle(slides[activeIndex]);
          },
          slideChange: function (swiper) {
            const { activeIndex, slides } = swiper;
            generateSliderFractionAndTitle(slides[activeIndex]);
          },
        },
      });
    })();

    // clients testimonial slider
    (() => {
      const swiper = UPSIDE.initSwiper(".clients-testimonial-swiper", {
        autoplay: true,
        effect: "fade",
        navigation: {
          nextEl: ".clients-testimonial-swiper .swiper-arrow-next",
          prevEl: ".clients-testimonial-swiper .swiper-arrow-prev",
        },
      });
    })();

    // blog articles slider
    (() => {
      const swiper = UPSIDE.initSwiper(".blog-articles-swiper", {
        slidesPerView: 1.25,
        spaceBetween: 20,
        autoplay: true,
        breakpoints: {
          // when window width is >= 430px
          430: {
            slidesPerView: 1.5,
          },
          // when window width is >= 576px
          576: {
            slidesPerView: 1.75,
            spaceBetween: 30,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2.25,
            spaceBetween: 30,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 2.75,
            spaceBetween: 40,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 3.25,
            spaceBetween: 40,
          },
          // when window width is >= 1400px
          1400: {
            slidesPerView: 3.5,
            spaceBetween: 40,
          },
        },
      });
    })();

    // explore popular properties slider
    (() => {
      const swiper = UPSIDE.initSwiper(".explore-popular-properties-swiper", {
        slidesPerView: 1,
        autoplay: true,
        navigation: {
          nextEl: ".explore-popular-properties .swiper-arrow-next",
          prevEl: ".explore-popular-properties .swiper-arrow-prev",
        },
        breakpoints: {
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 3,
            spaceBetween: 36,
          },
        },
      });
    })();

    // explore similar area slider
    (() => {
      const swiper = UPSIDE.initSwiper(".explore-similar-properties-swiper", {
        slidesPerView: 1,
        autoplay: true,
        navigation: {
          nextEl: ".explore-similar-properties .swiper-arrow-next",
          prevEl: ".explore-similar-properties .swiper-arrow-prev",
        },
        breakpoints: {
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 3,
            spaceBetween: 36,
          },
        },
      });
    })();

    // property details slider
    (() => {
      const thumbnails = Array.from(
        document.getElementsByClassName("property-details-thumbnail")
      );

      const swiper = UPSIDE.initSwiper(".property-details-swiper", {
        pagination: {
          el: ".property-details-swiper .swiper-pagination",
        },
        on: {
          init: ({ activeIndex }) => {
            thumbnails.forEach((elem) => elem.classList.remove("active"));
            thumbnails[activeIndex].classList.add("active");
          },
          slideChange: ({ activeIndex }) => {
            thumbnails.forEach((elem) => elem.classList.remove("active"));
            thumbnails[activeIndex].classList.add("active");
          },
        },
      });

      thumbnails.forEach((elem, index, arr) => {
        elem.addEventListener("click", () => {
          swiper.slideTo(index);
          arr.forEach((elem) => elem.classList.remove("active"));
          elem.classList.add("active");
        });
      });
    })();
  };

  // on DOMContentLoaded
  window.addEventListener("DOMContentLoaded", () => {
    UPSIDE.appLoader();
    UPSIDE.initWOW();
    UPSIDE.toggleDropdown();
    UPSIDE.toggleModal();
    UPSIDE.toggleOffcanvas();
    UPSIDE.navigateTabs();
    UPSIDE.toggleNavbar();
    UPSIDE.swiperSliders();
  });

  // on resize
  window.addEventListener("resize", () => {
    UPSIDE.resetNavbar();
  });

  // on scroll
  window.addEventListener("scroll", () => {});
})();
