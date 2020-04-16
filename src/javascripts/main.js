import navbarComponent from './components/navbar/navbar';
import 'bootstrap';
import '../styles/main.scss';
import auth from './components/auth/auth';

const init = () => {
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
  auth.loginButton();
};

init();
