import Slider from './videoSlider';
import Player from '@vimeo/player';

export default class MeVimeo {
    constructor() {
        this.videos = document.querySelectorAll('.js-player-video');
    }

    init() {
        if(!this.videos.length) return;

        this.slider = new Slider(i => { this.setSliderState(i) });
        this.slider.init();

        this.playerSlider = document.querySelector('.js-player-slider');
        this.vimeos = [];

        [].forEach.call(this.videos, (video, i) => {
            let vimeoItem = {
                elem: video,
                player: new Player(video, {
                    id: video.dataset.url,
                    // autoplay: true,
                    muted: true,
                    autopause: false
                })
            };
            this.vimeos.push(vimeoItem);

            Promise.all([this.vimeos[i].player.getVideoWidth(), this.vimeos[i].player.getVideoHeight()]).then(dimensions => {
                let _iframe = this.vimeos[i].elem.querySelector('iframe');
                let iframeWidth = _iframe.width;
                let iframeHeight = _iframe.height;
                let width = dimensions[0];
                let height = dimensions[1];
                this.vimeos[i].ratio = width / height;
                this.vimeos[i].iframeRatio = iframeWidth / iframeHeight;
                this.setStretchType(this.vimeos[i]);
                this.vimeos[i].dimensionsIsLoaded = true;

                if(i === 0) this.vimeos[i].player.play();
            });
        });

        //EVENTS
        //resize
        window.addEventListener('resize', () => {
            this.vimeos.forEach((vimeo, i) => {
                if(!vimeo.dimensionsIsLoaded) return;

                this.setStretchType(vimeo);
            })
        });
        //video ended
        this.vimeos.forEach(({player}, i) => {
            player.on('ended', data => {
                this.slider.sliderGoTo((i + 1) % this.vimeos.length);
            });
        });
    }

    setStretchType(vimeo) {
        let sliderWidth = this.playerSlider.offsetWidth;
        let sliderHeight = this.playerSlider.offsetHeight;
        let sliderRatio = sliderWidth / sliderHeight;

        if(vimeo.ratio >= sliderRatio) {
            // vimeo.elem.classList.add('_stretch-height');
            vimeo.elem.style.height = Math.round(sliderHeight * vimeo.iframeRatio/vimeo.ratio) + 'px';
            vimeo.elem.style.width = Math.round(sliderHeight * vimeo.iframeRatio) + 'px';
        } else {
            // vimeo.elem.classList.add('_stretch-width');
            vimeo.elem.style.width = Math.round(sliderWidth * vimeo.iframeRatio/vimeo.ratio) + 'px';
            vimeo.elem.style.height = Math.round(sliderWidth * vimeo.iframeRatio) + 'px';
        }

        vimeo.elem.style.display = '';
    }

    setSliderState(index) {
        this.vimeos.forEach(({player}, i) => {
            if(i === index) {
                player.play();
            } else {
                player.pause();
            }
        })
    }
}