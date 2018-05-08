export class Portfolio {
    constructor() {
        this.portfolios = document.querySelectorAll('.js-portfolio');
    }

    init() {
        if(!this.portfolios.length) return;

        [].forEach.call(this.portfolios, (portfolio, i) => {
            let btn = portfolio.querySelector('.js-portfolio-btn');

            btn.addEventListener('click', () => this.showAll(portfolio));
        });
    }

    showAll(portfolio) {
        portfolio.classList.add('_show-all');
    }
}

export class PortfolioSelect {
    constructor() {
        this.portfolioSelect = document.querySelector('.js-portfolio-page-select');
    }

    init() {
        if(!this.portfolioSelect) return;

        this.lists = document.querySelectorAll('.js-portfolio-page-list');

        $(this.portfolioSelect).on('change', e => this.onSelectChange(e));
    }

    onSelectChange({target}) {
        [].forEach.call(this.lists, list => {
            list.classList.remove('_show');
        });

        this.lists[target.value].classList.add('_show');
    }
}