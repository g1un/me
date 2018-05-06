import $ from 'jquery';
import 'slick-carousel';

export default class ReviewsSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.js-reviews-slider-container')
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-reviews-slider');
        this.$arrows = this.$sliderContainer.find('.js-reviews-slider-arrows');

        this.options = {
            adaptiveHeight: true,
            dots: false,
            appendArrows: this.$arrows,
            prevArrow: this.getArrow('prev'),
            nextArrow: this.getArrow('next')
        };

        this.$slider.slick(this.options);
    }

    getArrow(val) {
        return `<button type="button" class="slick-slider-arrow _${val} js-slick-slider-${val}">${val}</button>`;
    }
}