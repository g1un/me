import $ from 'jquery';
import 'slick-carousel';

export default class BemaSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.js-bema-slider-container')
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-bema-slider');
        this.$arrows = this.$sliderContainer.find('.js-bema-slider-arrows');
        this.$dots = this.$sliderContainer.find('.js-bema-slider-dots');

        this.options = {
            adaptiveHeight: true,
            dots: true,
            appendDots: this.$dots,
            appendArrows: this.$arrows,
            prevArrow: this.getArrow('prev'),
            nextArrow: this.getArrow('next')
        };

        this.$slider.slick(this.options);
    }

    getArrow(val) {
        return `<button type="button" class="slick-slider-arrow _${val} js-bema-slider-${val}">${val}</button>`;
    }
}