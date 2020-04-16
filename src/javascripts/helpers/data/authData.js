import firebase from 'firebase/app';
import 'firebase/auth';

const loginButton = $('#google-auth');
const logoutButton = $('#logout-btn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
    } else {
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
