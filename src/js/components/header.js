export default class Header {
    constructor() {
        this.header = document.querySelector('.js-header');
    }

    init() {
        if(!this.header) return;

        this.isScrolled = false;

        this.checkScroll();

        window.addEventListener('scroll', () => this.checkScroll());
    }

    checkScroll() {
        if(this.isScrolled && window.pageYOffset > 0) return;

        this.isScrolled = window.pageYOffset > 0;

        this.setHeaderState();
    }

    setHeaderState() {
        this.header.classList[this.isScrolled ? 'add' : 'remove']('_scrolled');
    }
}