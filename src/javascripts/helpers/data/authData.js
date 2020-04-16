import firebase from 'firebase/app';
import 'firebase/auth';

const loginButton = '#google-auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.addClass('hide');
    } else {
      loginButton.removeClass('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
