import $ from 'jquery';
import 'magnific-popup';

export default class GalleryPopup {
    constructor() {
        this.$gallery = $('.js-gallery');
    }

    init() {
        if(!this.$gallery.length) return;

        this.$gallery.magnificPopup({
            delegate: '.js-gallery-item img',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
                // titleSrc: function(item) {
                //     return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                // }
            },
            gallery: {
                enabled: true
            },
            // zoom: {
            //     enabled: true,
            //     duration: 300, // don't foget to change the duration also in CSS
            //     opener: function(element) {
            //         return element.find('img');
            //     }
            // },
            callbacks: {
                elementParse: item => { console.log(item.el[0].src); item.src = item.el[0].src }
            }
        });
    }
}