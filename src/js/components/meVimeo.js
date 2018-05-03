import VideoSwitcher from './videoSwitcher';
import Player from '@vimeo/player';

export default class MeVimeo {
    constructor() {
        this.videos = document.querySelectorAll('.js-player-video');
    }

    init() {
        if(!this.videos.length) return;

        this.initSwitcher();

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
            //плееры не инициализированы
            if(!this.isMeVideosInitialized) {
                //инициализируем плееры
                this.initMeVideos(this.videoSwitcher.getActiveIndex());
                //запоминаем что плееры были иницииализированы
                this.isMeVideosInitialized = true;
            }
            //плееры были инициализированы
            else {
                //инициализированные плееры стоят на паузе
                if(this.isMeVideosStopped) {
                    //запускаем инициализрованные стоящие на паузе плееры с активного слайда
                    this.setSliderState(this.videoSwitcher.getActiveIndex());
                    //запоминаем что плееры запущены
                    this.isMeVideosStopped = false;
                }
                //инициалиализированные плееры работают
                else {
                    //ничего не делаем
                    return;
                }
            }
        }
        //ширина экрана < 768
        else {
            //если плееры не были инициализрованы
            if(!this.isMeVideosInitialized) {
                //ничего не делаем
                return;
            }
            //если плееры были инициализированы
            else {
                //если инициализированные плееры стоят на паузе
                if(this.isMeVideosStopped) {
                    //ничего не делаем
                    return;
                }
                //если инициализированные плееры работают
                else {
                    //ставим инициализированные работающие плееры на паузу
                     this.setSliderState(-1);
                     //запоминаем что поставили плееры на паузу
                    this.isMeVideosStopped = true;
                }
            }
        }
    }

    initMeVideos(activeIndex) {
        this.playerSlider = document.querySelector('.js-player-slider');
        this.vimeos = [];

        [].forEach.call(this.videos, (video, i) => {
            let vimeoItem = {
                elem: video,
                player: new Player(video, {
                    id: video.dataset.url,
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

                if(i === activeIndex) this.vimeos[i].player.play();
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
                let index = (i + 1) % this.vimeos.length;
                this.videoSwitcher.setActive(index);
                this.setSliderState(index);
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
            player.pause();
        });
        if(index < 0) return;
        this.vimeos[index].player.play();
    }
}