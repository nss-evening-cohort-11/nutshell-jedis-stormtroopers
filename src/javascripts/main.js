import firebase from 'firebase/app';
import apiKeys from './helpers/data/apiKeys.json';

import overviewComponent from './components/overview/overview';
import navbarComponent from './components/navbar/navbar';
import dinosComponent from './components/dinos/dinos';
import staffComponent from './components/staff/staff';
import ridesComponent from './components/rides/rides';
import equipmentComponent from './components/equipment/equipment';
import vendorsComponent from './components/vendors/vendors';
import 'bootstrap';
import '../styles/main.scss';

import authData from './helpers/data/authData';
import auth from './components/auth/auth';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  auth.logoutEvent();
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
  // $('body').on('click', '.nav-dino-btn', navbarComponent.navbarEvents);
  overviewComponent.printOverviewDashboard();
  dinosComponent.printDinosDashboard();
  staffComponent.printStaffDashboard();
  ridesComponent.printRidesDashboard();
  equipmentComponent.printEquipmentDashboard();
  vendorsComponent.printVendorsDashboard();
};

init();
