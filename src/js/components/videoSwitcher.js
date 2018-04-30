import VideoDesc from './videoDesc';

export default class VideoSwitcher {
    constructor(goToVideo) {
        this.videos = document.querySelectorAll('.js-player-slider-item');
        this.goToVideo = goToVideo;
    }

    init() {
        if(!this.videos.length) return;

        this.videoDesc = new VideoDesc();
        this.videoDesc.init();

        this.playerButtons = document.querySelectorAll('.js-player-button');
        this.activeIndex = 0;

        [].forEach.call(this.playerButtons, (btn, i) => {
            btn.addEventListener('click', () => {
                if(window.innerWidth >= 768) this.goToVideo(i);
                this.setActive(i);
            });
        });
    }

    setActive(i) {
        this.activeIndex = i;
        this.setActiveVideo(i);
        this.setActiveButton(i);
        this.videoDesc.setActiveDescription(i);
    }

    setActiveVideo(index) {
        [].forEach.call(this.videos, (video, i) => {
            if(i === index) {
                video.classList.add('_active');
            } else {
                video.classList.remove('_active');
            }
        });
    }

    setActiveButton(index) {
        [].forEach.call(this.playerButtons, (btn, i) => {
            if(i === index) {
                btn.classList.add('_active');
            } else {
                btn.classList.remove('_active');
            }
        });
    }

    getActiveIndex() {
        return this.activeIndex;
    }
}