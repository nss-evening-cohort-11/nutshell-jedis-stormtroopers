import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';


const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn"><i class="fab fa-google text-danger"></i></button>';
  utils.printToDom('login-btns', domString);
  $('#google-auth').click(signMeIn);
};

const logoutEvent = () => {
  $('#logout-btn').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};


export default {
  loginButton,
  logoutEvent,
};
