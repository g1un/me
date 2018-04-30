export default class VideoSwitcher {
    constructor(goToVideo) {
        this.videos = document.querySelectorAll('.js-player-slider-item');
        this.goToVideo = goToVideo;
    }

    init() {
        if(!this.videos.length) return;

        this.playerButtons = document.querySelectorAll('.js-player-button');

        [].forEach.call(this.playerButtons, (btn, i) => {
            btn.addEventListener('click', () => {
                this.goToVideo(i);
                this.setActive(i);
            });
        });
    }

    setActive(i) {
        this.setActiveVideo(i);
        this.setActiveButton(i);
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
}