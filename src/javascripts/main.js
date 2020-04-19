import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import overviewComponent from './components/overview/overview';
import navbarComponent from './components/navbar/navbar';
import dinosComponent from './components/dinos/dinos';
import staffComponent from './components/staff/staff';
import ridesComponent from './components/rides/rides';
import equipmentComponent from './components/equipmentStorageContainer/equipmentStorageContainer';
import vendorsComponent from './components/vendors/vendors';
import 'bootstrap';
import '../styles/main.scss';

import authData from './helpers/data/authData';
import auth from './components/auth/auth';

const events = () => {
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
  ridesComponent.rideEvents();
  vendorsComponent.vendorsEvents();
  dinosComponent.dinoEvents();
  staffComponent.staffEvents();
};

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  auth.logoutEvent();
  events();
  overviewComponent.printOverviewDashboard();
  dinosComponent.printDinosDashboard();
  overviewComponent.printOverviewDashboard();
  staffComponent.printStaffDashboard();
  ridesComponent.printRidesDashboard();
  equipmentComponent.printEquipmentDashboard();
  vendorsComponent.printVendorsDashboard();
};

init();
