import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

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
  $('body').on('click', '.edit-dino', dinosComponent.editDinoEvent);
  $('body').on('click', '#submit-dino-changes', dinosComponent.modifyDino);
  $('body').on('click', '.delete-dino', dinosComponent.removeDino);
  $('body').on('click', '#new-dino-btn', dinosComponent.newDinoForm);
  $('body').on('click', '#submit-new-dino', dinosComponent.makeNewDino);
  overviewComponent.printOverviewDashboard();
  dinosComponent.printDinosDashboard();
  staffComponent.printStaffDashboard();
  ridesComponent.printRidesDashboard();
  equipmentComponent.printEquipmentDashboard();
  vendorsComponent.printVendorsDashboard();
};

init();
