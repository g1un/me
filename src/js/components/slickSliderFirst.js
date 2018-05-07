import $ from 'jquery';
import 'slick-carousel';

export default class SlickSliderFirst {
    constructor(container, options) {
        this.sliderContainer = document.querySelector(container);
        this.options = options;
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-slick-slider');
        this.$arrows = this.$sliderContainer.find('.js-slick-arrows');
        this.$dots = this.$sliderContainer.find('.js-slick-dots');

        this.options = Object.assign(
            {
                adaptiveHeight: true,
                appendArrows: this.$arrows,
                appendDots: this.$dots,
                prevArrow: this.getArrow('prev'),
                nextArrow: this.getArrow('next')
            },
            this.options);

        this.$slider.slick(this.options);
    }

    getArrow(val) {
        return `<button type="button" class="slick-slider-arrow _${val} js-slick-slider-${val}">${val}</button>`;
    }
}