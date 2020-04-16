import navbarComponent from './components/navbar/navbar';

import '../styles/main.scss';
import 'bootstrap';

const init = () => {
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
};

init();
