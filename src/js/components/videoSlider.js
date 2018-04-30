import $ from 'jquery';
import 'slick-carousel';
import VideoDescriptions from './videoDesc';

export default class VideoSlider {
    constructor(setPlayersState) {
        this.$slider = $('.js-player-slider');
        this.setPlayersState = setPlayersState;
    }

    init() {
        if(!this.$slider) return;

        this.videoDescriptions = new VideoDescriptions();
        this.videoDescriptions.init();

        this.playerButtons = document.querySelectorAll('.js-player-button');
        this.playerButtonsState = Array.from(new Array(this.playerButtons.length));
        this.playerButtonsState[0] = true;

        this.$slider.slick(
            {
                slide: '.js-player-slider-item',
                arrows: false,
                infinite: false,
                fade: true
            }
        );

        //EVENTS
        //slide change
        this.$slider.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
            this.setActiveButton(nextSlide);
            this.setPlayersState(nextSlide);
            this.videoDescriptions.setActiveDescription(nextSlide);
        });
        //button clicked
        [].forEach.call(this.playerButtons, (btn, i) => {
            btn.addEventListener('click', () => { this.sliderGoTo(i) });
        });
    }

    setActiveButton(index) {
        this.playerButtonsState = this.playerButtonsState.map((item, i) => i === index);

        this.renderButtonsState();
    }

    sliderGoTo(i) {
        this.$slider.slick('slickGoTo', i);
    }

    renderButtonsState() {
        let activeIndex = this.playerButtonsState.indexOf(true);
        this.playerButtons.forEach((button, i) => {
            if(i === activeIndex) {
                button.classList.add('_active');
            } else {
                button.classList.remove('_active');
            }
        });
    }
}