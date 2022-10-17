"use strict";

/////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// const allSections = document.querySelectorAll('.section');

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function () {
  // const s1coords = document.getBoundingCLientRect();
  //   window.scrollTo({
  //     left: s1coords.left = window.pageXOffset,
  //     top: s1coords.top = window.pageYOffset,
  //     behaviour: 'smooth'
  //   });
  //  });

  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // e.stopPropagation();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////
//Tabbed Component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //Activeta tab
  clicked.classList.add("operations__tab--active");

  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

////////////////////////////////////////////////////////////////////////
//Menu fade

const nav = document.querySelector(".nav");

const handleHover = function (e) {
  // console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//Sticky navigation

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', (e)=>{

//   if(window.scrollY > initialCoords.top){
//     nav.classList.add("sticky");
//   }else{
//     nav.classList.remove("sticky");
//   }
// });

// IntersectionObserver API

// const obsCallback = function(entries, observer) {
//   entries.forEach(entry=> {
//     console.log(entry);
//   });
// }

// const  obsOptions = {
//   root: null,
//   threshold: [0, 0.2, ]

// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//intersectionObserver
const header = document.querySelector("header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////////////////////////
//Reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Loading images

const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets)

const loadImage = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //listen to the load event and remove the blured image
  entry.target.addEventListener('load', () =>{
    entry.target.classList.remove('lazy-img');
  });

  //stop observing 
  observer.unobserve(entry.target);

};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
});

imgTargets.forEach(img=>{
  imageObserver.observe(img);
})

//Slider

const slides = document.querySelectorAll('.slide');

slides.forEach((s, i)=>{
  s.style.transform = `translateX()`
})