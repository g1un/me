import $ from 'jquery';
import 'slick-carousel';

export default class GallerySlider {
    constructor(breakpoint) {
        this.sliderContainer = document.querySelector('.js-gallery');
        this.breakpoint = 1200
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-adaptive-slider');
        this.$arrows = this.$sliderContainer.find('.js-adaptive-slider-arrows');
        this.$dots = this.$sliderContainer.find('.js-adaptive-slider-dots');

        this.options = {
            adaptiveHeight: true,
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            appendDots: this.$dots,
            appendArrows: this.$arrows,
            prevArrow: this.getArrow('prev'),
            nextArrow: this.getArrow('next'),

            responsive: [
                {
                    breakpoint: 99999,
                    settings: 'unslick'
                },
                {
                    breakpoint: this.breakpoint,
                    settings: {}
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };

        this.checkWindowSize();

        window.addEventListener('resize', () => this.checkWindowSize());
    }

    getArrow(val) {
        return `<button type="button" class="slick-slider-arrow _white _${val} js-slick-slider-${val}">${val}</button>`;
    }

    checkWindowSize() {
        if(window.innerWidth < this.breakpoint) {
            if(this.isSlicked) {
                return
            } else {
                this.$slider.slick(this.options);
                this.isSlicked = true;
            }
        } else {
            this.isSlicked = false;
        }
    }
}