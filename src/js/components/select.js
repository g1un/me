export default class Select {
    constructor(select) {
        this.selects = document.querySelectorAll('.js-select');
    }

    init() {
        if(!this.selects.length) return;

        [].forEach.call(this.selects, (select) => {
            this.initSelect(select);
        });

        window.addEventListener('click', e => this.onClickOutOfSelect(e));
    }

    initSelect(select) {
        let active = select.querySelector('.js-select-active');
        let items = select.querySelectorAll('.js-select-item');

        active.addEventListener('click', () => this.toggleSelect(select));

        [].forEach.call(items, (item, i, items) => {
            item.addEventListener('click', e => this.chooseItem(e, items, active, select, i));
        });
    }

    toggleSelect(select) {
        if(select.classList.contains('_opened')) {
            select.classList.remove('_opened');
        } else {
            this.closeSelects();
            select.classList.add('_opened');
        }
    }

    onClickOutOfSelect({target}) {
        let $target = $(target);

        if(!$target.closest('.js-select').length) {
            [].forEach.call(this.selects, (select) => {
                select.classList.remove('_opened');
            });
        }
    }

    chooseItem({target}, items, active, select, i) {
        [].forEach.call(items, item => {
            item.classList.remove('_active');
        });
        target.classList.add('_active');

        active.innerHTML = target.innerHTML;

        select.classList.remove('_opened');

        this.setNativeSelect(select, i);
    }

    closeSelects() {
        [].forEach.call(this.selects, select => {
            select.classList.remove('_opened');
        })
    }

    setNativeSelect(select, i) {
        let $nativeSelect = $(select).find('.js-select-native');
        $nativeSelect.val(i).trigger('change');
    }
}