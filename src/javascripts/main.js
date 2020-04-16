import navbarComponent from './components/navbar/navbar';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
};

init();
