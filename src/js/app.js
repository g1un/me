import './../scss/style.scss';

import MeVimeo from './components/meVimeo';
import Header from './components/header';
import Sandwich from './components/sandwich';
import SlickSlider from './components/slickSlider';
import Portfolio from './components/portfolio';
import BemaSlider from './components/bemaSlider';
import BemaVideo from './components/bemaVideo';
import ShowAll from './components/showAll';
import SlickSliderFirst from './components/slickSliderFirst';
import AdaptiveSlider from './components/adaptiveSlider';

new MeVimeo().init();
new Header().init();
new Sandwich().init();
new SlickSlider().init();
new Portfolio().init();
new BemaSlider().init();
new BemaVideo().init();
new ShowAll().init();

let reviewsSlider = new SlickSliderFirst(
    '.js-reviews',
    {
        dots: false,
    }
);
reviewsSlider.init();

let teammatesSlider = new AdaptiveSlider(
    '.js-teammates',
    {
        dots: true,
    },
    1200
);
teammatesSlider.init();