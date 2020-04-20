import firebase from 'firebase/app';
import 'firebase/auth';

import equipmentStorageContainer from '../../components/equipmentStorageContainer/equipmentStorageContainer';
import dinosComponent from '../../components/dinos/dinos';
import staffComponent from '../../components/staff/staff';
import ridesComponent from '../../components/rides/rides';
import vendorsComponent from '../../components/vendors/vendors';

const loginButton = $('#auth');
const logoutButton = $('#logout-btn');

const events = () => {
  ridesComponent.rideEvents();
  vendorsComponent.vendorsEvents();
  dinosComponent.dinoEvents();
  staffComponent.staffEvents();
  equipmentStorageContainer.equipmentEvents();
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      events();
    } else {
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
