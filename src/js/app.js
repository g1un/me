import './../scss/style.scss';

import MeVimeo from './components/meVimeo';
import Header from './components/header';
import Sandwich from './components/sandwich';
import SlickSlider from './components/slickSlider';
import { Portfolio, PortfolioSelect } from './components/portfolio';
import BemaSlider from './components/bemaSlider';
import BemaVideo from './components/bemaVideo';
import ShowAll from './components/showAll';
import SlickSliderFirst from './components/slickSliderFirst';
import AdaptiveSlider from './components/adaptiveSlider';
import Select from './components/select';
import GallerySlider from './components/gallerySlider';
import GalleryPopup from './components/galleryPopup';

new MeVimeo().init();
new Header().init();
new Sandwich().init();
new SlickSlider().init();
new Portfolio().init();
new BemaSlider().init();
new BemaVideo().init();
new ShowAll().init();

new SlickSliderFirst(
    '.js-reviews',
    {
        dots: false,
    }
).init();

new AdaptiveSlider(
    '.js-teammates',
    {
        dots: true,
    },
    1200
).init();

new GallerySlider().init();

new Select('.js-select').init();
new PortfolioSelect().init();
new GalleryPopup().init();