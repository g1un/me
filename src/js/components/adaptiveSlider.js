import $ from 'jquery';
import 'slick-carousel';

export default class AdaptiveSlider {
    constructor(container, options, breakpoint) {
        this.sliderContainer = document.querySelector(container);
        this.options = options;
        this.breakpoint = breakpoint
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-adaptive-slider');
        this.$arrows = this.$sliderContainer.find('.js-adaptive-slider-arrows');
        this.$dots = this.$sliderContainer.find('.js-adaptive-slider-dots');

        this.options = {
            responsive: [
                {
                    breakpoint: 99999,
                    settings: 'unslick'
                },
                {
                    breakpoint: this.breakpoint,
                    settings: Object.assign(
                        {
                            adaptiveHeight: true,
                            dots: true,
                            appendDots: this.$dots,
                            appendArrows: this.$arrows,
                            prevArrow: this.getArrow('prev'),
                            nextArrow: this.getArrow('next')
                        },
                        this.options
                    )
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