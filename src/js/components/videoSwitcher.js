import VideoDesc from './videoDesc';

export default class VideoSwitcher {
    constructor(goToVideo) {
        this.videosList = document.querySelector('.js-player-slider');
        this.goToVideo = goToVideo;
    }

    init() {
        if(!this.videosList) return;

        this.videos = this.videosList.querySelectorAll('.js-player-slider-item');
        this.videosWrapper = this.videosList.querySelector('.js-player-slider-wrapper');

        this.videoDesc = new VideoDesc();
        this.videoDesc.init();

        this.playerButtons = document.querySelectorAll('.js-player-button');
        this.activeIndex = 0;

        this.manageAutoPlay();

        //EVENTS
        [].forEach.call(this.playerButtons, (btn, i) => {
            btn.addEventListener('click', () => {
                if(window.innerWidth >= 768) this.goToVideo(i);
                this.setActive(i);
                this.manageAutoPlay('isClicked');
            });
        });

        window.addEventListener('resize', () => {
            this.setSlidePosition(this.activeIndex, 'resized');
            this.manageAutoPlay();
        });
    }

    setActive(i) {
        this.activeIndex = i;
        this.setActiveVideo(i);
        this.setActiveButton(i);
        this.videoDesc.setActiveDescription(i);
    }

    setActiveVideo(index) {
        this.setSlidePosition(index);

        [].forEach.call(this.videos, (video, i) => {
            video.classList.remove('_active');
        });

        this.videos[index].classList.add('_active');
    }

    setSlidePosition(index, isResized) {
        if(window.innerWidth >= 768) {
            if(this.isVideosWrapperTransformed) {
                this.videosWrapper.style.transform = "translateX(0%)";

                this.isVideosWrapperTransformed = false;
            } else {
                return;
            }
        } else {

            if(this.isVideosWrapperTransformed && isResized) {
                return;
            } else {
                this.videosWrapper.style.transform = `translateX(-${(index / this.videos.length) * 100}%)`;

                this.isVideosWrapperTransformed = true;
            }
        }
    }

    setActiveButton(index) {
        [].forEach.call(this.playerButtons, (btn, i) => {
            btn.classList.remove('_active');
        });

        this.playerButtons[index].classList.add('_active');
    }

    getActiveIndex() {
        return this.activeIndex;
    }

    manageAutoPlay(isClicked) {
        if(window.innerWidth >= 768) {

            if(this.isAutoPlayStopped) {
                return;
            } else {
                this.autoPlay(-1);
            }
        } else {

            if(this.isAutoPlayStopped || this.isAutoPlayStopped === undefined || isClicked) {
                this.autoPlay();
            } else {
                return;
            }
        }

    }

    autoPlay(state) {
        clearTimeout(this.autoPlayTimer);
        if(state === -1) {
            this.isAutoPlayStopped = true;
        } else {
            this.isAutoPlayStopped = false;
            this.autoPlayTimer = setTimeout(
                () => {
                    if(this.isAutoPlayStopped) return;
                    this.activeIndex = (this.activeIndex + 1) % this.videos.length;
                    this.setActive(this.activeIndex);
                    this.autoPlay(this.activeIndex);
                },
                4000
            )
        }
    }
}