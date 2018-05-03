export default class VideoDesc {
    constructor() {
        this.descriptionsContainer = document.querySelector('.js-video-descriptions');
    }

    init() {
        if(!this.descriptionsContainer) return;

        this.descriptions = this.descriptionsContainer.querySelectorAll('.js-video-descriptions-item');
    }

    setActiveDescription(index) {
        [].forEach.call(this.descriptions, (description, i) => {
            description.classList.remove('_show');
        });

        this.descriptions[index].classList.add('_show');
    }
}