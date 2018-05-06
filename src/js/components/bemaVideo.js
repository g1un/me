import Player from '@vimeo/player';

export default class MeVimeo {
    constructor() {
        this.video = document.querySelector('.js-bema-video');
    }

    init() {
        if(!this.video) return;

        this.playBtn = this.video.querySelector('.js-bema-video-play');

        this.player = new Player(this.video, {
            id: this.video.dataset.url
        });

        this.player.on('loaded', () => {
            this.iframe = this.video.querySelector('iframe');
            let iframeWidth = this.iframe.width;
            let iframeHeight = this.iframe.height;
            let videoPaddingBottom = iframeHeight / iframeWidth;

            this.video.style.paddingBottom = videoPaddingBottom * 100 + '%';
        });

        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let posterUrl = JSON.parse(xhr.responseText).thumbnail_url;
            this.video.style.backgroundImage = `url("${posterUrl}")`;
        };
        xhr.open("get", `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(this.video.dataset.url)}`, true);
        xhr.send();

        this.playBtn.addEventListener('click', () => {
            this.playBtn.style.display = 'none';
            this.iframe.style.opacity = 1;
            this.iframe.style.pointerEvents = 'auto';

            this.player.play();
        })
    }
}