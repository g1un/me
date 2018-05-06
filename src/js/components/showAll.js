export default class ShowAll {
    constructor() {
        this.lists = document.querySelectorAll('.js-showall');
    }

    init() {
        if(!this.lists.length) return;

        [].forEach.call(this.lists, (list) => {
            let btn = list.parentNode.querySelector('.js-showall-btn');

            btn.addEventListener('click', () => this.showAll(list, btn));
        });
    }

    showAll(list, btn) {
        btn.style.display = 'none';
        list.classList.add('_show');
    }
}