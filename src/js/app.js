import './../scss/style.scss';

import MeVimeo from './components/meVimeo';
import Header from './components/header';
import Sandwich from './components/sandwich';
import SlickSlider from './components/slickSlider';
import Portfolio from './components/portfolio';
import BemaSlider from './components/bemaSlider';
import BemaVideo from './components/bemaVideo';

new MeVimeo().init();
new Header().init();
new Sandwich().init();
new SlickSlider().init();
new Portfolio().init();
new BemaSlider().init();
new BemaVideo().init();