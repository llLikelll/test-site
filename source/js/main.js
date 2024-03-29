document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        start: "top",
        end: "bottom",
        toggleClass: {targets: '.js-header', className: 'header-collapsed'},
    });

    let offersSlider = new Swiper(".offers-slider .swiper", {
        freeMode: true,
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 72,
            },
            1400: {
                slidesPerView: 5,
                spaceBetween: 72,
            },
        },
    });
});