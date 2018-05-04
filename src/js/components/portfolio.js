export default class Portfolio {
    constructor() {
        this.portfolio = document.querySelector('.js-portfolio');
    }

    init() {
        if(!this.portfolio) return;

        this.btn = this.portfolio.querySelector('.js-portfolio-btn');

        this.btn.addEventListener('click', () => this.showAll());
    }

    showAll() {
        this.portfolio.classList.add('_show-all');
    }
}