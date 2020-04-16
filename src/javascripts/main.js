import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import navbarComponent from './components/navbar/navbar';
import authData from './helpers/data/authData';
import 'bootstrap';
import '../styles/main.scss';
import auth from './components/auth/auth';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
  auth.loginButton();
};

init();
