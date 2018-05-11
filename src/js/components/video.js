import VideoSwitcher from './videoSwitcher';

export default class Video {
    constructor() {
        this.videos = document.querySelectorAll('.js-player-video');
    }

    init() {
        if(!this.videos.length) return;

        this.isVideosStopped = true;

        this.initSwitcher();

        this.initVideos();

        this.checkWindowSize();

        window.addEventListener('resize', () => this.checkWindowSize());
    }

    initSwitcher() {
        this.videoSwitcher = new VideoSwitcher((i) => this.setSliderState(i));
        this.videoSwitcher.init();
    }

    checkWindowSize() {
        //ширина экрана >= 768
        if(window.innerWidth >= 768) {
            //плееры стоят на паузе
            if(this.isVideosStopped) {
                //запускаем стоящие на паузе плееры с активного слайда
                this.setSliderState(this.videoSwitcher.getActiveIndex());
                //запоминаем что плееры запущены
                this.isVideosStopped = false;
            }
            //плееры работают
            else {
                //ничего не делаем
                return;
            }
        }
        //ширина экрана < 768
        else {
            //если плееры стоят на паузе
            if(this.isMeVideosStopped) {
                //ничего не делаем
                return;
            }
            //если плееры работают
            else {
                //ставим работающие плееры на паузу
                this.setSliderState(-1);
                //запоминаем что поставили плееры на паузу
                this.isVideosStopped = true;
            }
        }
    }

    initVideos(activeIndex) {
        this.playerSlider = document.querySelector('.js-player-slider');
        this.players = [];

        [].forEach.call(this.videos, (video, i) => {
            let src = video.dataset.src;

            video.addEventListener('loadedmetadata', () => {
                let videoWidth = video.videoWidth;
                let videoHeight = video.videoHeight;

                let ratio = videoWidth / videoHeight;

                this.players.push({
                    video: video,
                    ratio: ratio
                });

                this.setStretchType({video: video, ratio: ratio});

                if(i === activeIndex) video.play();
            });

            video.src = src;

            //video ended
            video.addEventListener('ended', () => {
                let index = (i + 1) % this.videos.length;
                this.videoSwitcher.setActive(index);
                this.setSliderState(index);
            });
        });

        //EVENTS
        //resize
        window.addEventListener('resize', () => {
            this.players.forEach((player) => {
                this.setStretchType(player);
            })
        });
    }

    setStretchType(player) {
        let sliderWidth = this.playerSlider.offsetWidth;
        let sliderHeight = this.playerSlider.offsetHeight;
        let sliderRatio = sliderWidth / sliderHeight;

        if(player.ratio >= sliderRatio) {
            player.video.style.width = Math.ceil(sliderHeight * player.ratio) + 'px';
            player.video.style.height = Math.ceil(sliderHeight) + 'px';
        } else {
            player.video.style.height = Math.ceil(sliderWidth / player.ratio) + 'px';
            player.video.style.width = Math.ceil(sliderWidth) + 'px';
        }

        player.video.style.display = '';
    }

    setSliderState(index) {
        this.videos.forEach((video, i) => {
            video.pause();
        });
        if(index < 0) return;
        this.videos[index].play();
    }
}