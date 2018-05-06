import $ from 'jquery';
import 'slick-carousel';

export default class Indicators {
    constructor() {
        this.sliderContainer = document.querySelector('.js-slick-slider-container')
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-slick-slider');
        this.$arrows = this.$sliderContainer.find('.js-slick-slider-arrows');
        this.$dots = this.$sliderContainer.find('.js-slick-slider-dots');

        this.options = {
            responsive: [
                {
                    breakpoint: 99999,
                    settings: 'unslick'
                },
                {
                    breakpoint: 1200,
                    settings: {
                        adaptiveHeight: true,
                        dots: true,
                        appendDots: this.$dots,
                        appendArrows: this.$arrows,
                        prevArrow: this.getArrow('prev'),
                        nextArrow: this.getArrow('next')
                    }
                }
            ]
        };

        this.checkWindowSize();

        window.addEventListener('resize', () => this.checkWindowSize());
    }

    getArrow(val) {
        return `<button type="button" class="slick-slider-arrow _${val} js-slick-slider-${val}">${val}</button>`;
    }

    checkWindowSize() {
        if(window.innerWidth < 1200) {
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