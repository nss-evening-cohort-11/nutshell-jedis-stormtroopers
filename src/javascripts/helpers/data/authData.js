import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentStorageContainer from '../../components/equipmentStorageContainer/equipmentStorageContainer';

const loginButton = $('#auth');
const logoutButton = $('#logout-btn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      equipmentStorageContainer.equipmentEvents();
    } else {
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
