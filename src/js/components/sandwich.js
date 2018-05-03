export default class Sandwich {
    constructor() {
        this.sandwich = document.querySelector('.js-sandwich');
    }

    init() {
        if(!this.sandwich) return;

        this.header = document.querySelector('.js-header');
        this.menu = document.querySelector('.js-sandwich-menu');

        this.sandwich.addEventListener('click', () => this.toggleMenu());
    }

    toggleMenu() {
        this.header.classList.toggle('_opened');
    }
}