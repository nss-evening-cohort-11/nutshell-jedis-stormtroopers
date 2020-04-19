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

const dinoEvents = () => {
  $('body').on('click', '.edit-dino', dinosComponent.editDinoEvent);
  $('body').on('click', '#submit-dino-changes', dinosComponent.modifyDino);
  $('body').on('click', '.delete-dino', dinosComponent.removeDino);
  $('body').on('click', '#new-dino-btn', dinosComponent.newDinoForm);
  $('body').on('click', '#submit-new-dino', dinosComponent.makeNewDino);
};

const staffEvents = () => {
  $('body').on('click', '.edit-staff', staffComponent.editStaffEvent);
  $('body').on('click', '#submit-staff-changes', staffComponent.modifyStaff);
  $('body').on('click', '.delete-staff', staffComponent.removeStaff);
  $('body').on('click', '#new-staff-btn', staffComponent.newStaffForm);
  $('body').on('click', '#submit-new-staff', staffComponent.makeNewStaff);

const events = () => {
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
  ridesComponent.rideEvents();
  vendorsComponent.vendorsEvents();
  dinoEvents();
  staffEvents();
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
