"use strict";

/* On Load
 **************************************************************/
window.addEventListener("load", function () {
  swiperMode();
});

/* On Resize
 **************************************************************/
window.addEventListener("resize", function () {
  swiperMode();
});

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Catalog toggle
 */
const catalogBtn = document.querySelector("[data-catalog-btn]");
const catalogMenu = document.querySelector("[data-catalog-menu]");
const catalogBtnIcon = document.querySelector("[data-btn-dropdown] > img");

const toggleCatalog = function () {
  catalogMenu.classList.toggle("active");
  if (catalogMenu.classList.contains("active")) {
    catalogBtnIcon.src = "images/icons/exit.svg";
  } else {
    catalogBtnIcon.src = "images/icons/list.svg";
  }
};

addEventOnElem(catalogBtn, "click", toggleCatalog);

/**
 * Count inputs
 */
const countInputs = document.querySelectorAll("[data-count]");
const countInputsBtnMinus = document.querySelector("[data-count-btn-minus]");
const countInputsBtnPlus = document.querySelector("[data-count-btn-plus]");

const changeInputNumber = (e) => {
  let countInputsNumber = document.querySelector("[data-count-number]");

  if (e.target.getAttribute("data-count-btn-minus")) {
    if (parseInt(countInputsNumber.textContent) > 1) {
      countInputsNumber.textContent = parseInt(countInputsNumber.textContent) - 1;
    }
  } else if (e.target.getAttribute("data-count-btn-plus")) {
    if (parseInt(countInputsNumber.textContent) < 10) {
      countInputsNumber.textContent = parseInt(countInputsNumber.textContent) + 1;
    }
  }
};

/**
 * Range slider
 */
const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");
let priceGap = 1000;
const minPrice = document.querySelector(".range-price__min");
const maxPrice = document.querySelector(".range-price__max");

// range data
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      minPrice.textContent = minVal + " ₽";
      maxPrice.textContent = maxVal + " ₽";
    }
  });
});

// input field data
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= priceGap && maxVal <= 10000) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxVal;
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }

      minPrice.textContent = minVal + " ₽";
      maxPrice.textContent = maxVal + " ₽";
    }
  });
});

/**
 * Accordion
 */
const accordions = document.querySelectorAll("[data-accordion-control]");
const title = document.querySelectorAll("[data-accordion-title]");

accordions.forEach((el) => {
  el.addEventListener("click", (e) => {
    const self = e.currentTarget;
    const content = self.querySelector("[data-accordion-content]");

    // if open
    if (self.classList.contains("open")) {
      content.setAttribute("aria-hidden", false);
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.setAttribute("aria-hidden", true);
      content.style.maxHeight = null;
    }
  });
});

if (title) {
  title.forEach((el) => {
    el.addEventListener("click", (e) => {
      const self = e.currentTarget;
      const control = self.closest("[data-accordion-control]");
      control.classList.toggle("open");

      if (!self.classList.contains("open")) {
        self.classList.add("open");
      } else {
        self.classList.remove("open");
      }
    });
  });
}

/**
 * Select input script
 */
const selects = document.querySelectorAll("[data-select]");

selects.forEach((select) => {
  select.addEventListener("click", (e) => {
    e.preventDefault();
    const list = select.querySelector(".select-list");
    const icon = select.querySelector("[data-select-icon]");

    list.classList.toggle("show");
    icon.style.transform = "rotate(180deg)";

    if (list.classList.contains("show")) {
      icon.style.transform = "rotate(180deg)";
    } else {
      icon.style.transform = "rotate(0deg)";
    }

    if (e.target.classList.contains("select-item")) {
      select.querySelector(".select-text span").textContent = e.target.textContent;
      list.classList.remove("show");
      icon.style.transform = "rotate(0deg)";
    }
  });
});

/**
 * Main slider
 */
new Swiper(".swiper-slider", {
  slidesPerView: 9,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  breakpoints: {
    1400: {
      slidesPerView: 10,
      spaceBetween: 10,
    },
    1300: {
      slidesPerView: 9,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 7,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
});

new Swiper(".section-categories__slider", {
  // slidesPerView: 4,
  // spaceBetween: 30,
  scrollbar: {
    el: ".swiper-scrollbar-category",
    draggable: true,
    hide: false,
    dragSize: "60px",
  },
  loop: false,
  breakpoints: {
    1400: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1300: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    560: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },
});

new Swiper(".section-promotional__slider", {
  slidesPerView: 1,
  loop: false,
  pagination: {
    el: ".section-promotional__pagination",
    clickable: true,
    type: "bullets",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let init = false;
let newsSlider = Swiper;

function swiperMode() {
  let mobile = window.matchMedia("(max-width: 768px)");
  let tablet = window.matchMedia("(min-width: 769px)");

  if (tablet.matches) {
    if (!init) {
      init = true;
      newsSlider = new Swiper(".section-news__slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        scrollbar: {
          el: ".swiper-scrollbar-news",
          draggable: true,
          hide: false,
          dragSize: "60px",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          630: {
            slidesPerView: 2,
            spaceBetween: 30,
            isLocked: true,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        },
      });
    }
  } else if (mobile.matches) {
    newsSlider.destroy();
    init = false;
  }
}

new Swiper(".section-slider__main", {
  slidesPerView: 1,
  loop: false,
  navigation: {
    nextEl: ".btn-next-1",
    prevEl: ".btn-prev-1",
  },
});

new Swiper(".section-catalog__slider", {
  slidesPerView: 4,
  loop: false,
  spaceBetween: 30,
  pagination: {
    el: ".section-catalog__pagination",
    clickable: true,
    type: "bullets",
  },
  navigation: {
    nextEl: '[data-btn="catalog-next"]',
    prevEl: '[data-btn="catalog-prev"]',
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
      isLocked: true,
    },
    560: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

// Modal

const cabinetTable = document.querySelectorAll("[data-cabinet-order]");
const backdrop = document.querySelector(".backdrop");
const close = document.querySelector("[data-orders-close]");

if (cabinetTable) {
  cabinetTable.forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = e.target.closest("[data-cabinet-order]");
      backdrop.classList.add("is--active");
    });
  });
}

backdrop.addEventListener("click", (e) => {
  if (!e.target.classList.contains("backdrop")) return false;
  backdrop.classList.remove("is--active");
});

close.addEventListener("click", () => {
  backdrop.classList.remove("is--active");
});

// Filter sitebar
const dataCatalog = document.querySelectorAll("[data-catalog-filter]");
const dataCatalogContent = document.querySelector("[data-catalog-filter-content]");
const dataCatalogClose = document.querySelector("[data-catalog-filter-close]");

if (dataCatalog) {
  dataCatalog.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();

      dataCatalogContent.classList.toggle("is--active");
    })
  );
}

if (dataCatalogClose) {
  dataCatalogClose.addEventListener("click", (e) => {
    e.preventDefault();

    dataCatalogContent.classList.toggle("is--active");
  });
}
