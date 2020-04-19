import firebase from 'firebase/app';
import 'firebase/auth';

import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';
import equipment from '../equipment/equipment';

const removeEquipment = (e) => {
  const equipmentId = e.target.closest('.card').id;
  equipData.deleteEquipment(equipmentId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printEquipmentDashboard();
    })
    .catch((err) => console.error('remove equipment did not work', err));
};

const addEquipmentToContainer = (e) => {
  e.preventDefault();
  // 1. make a new object
  const newEquipment = {
    name: $('#equipment-name').val(),
    description: $('#equipment-description').val(),
    imageUrl: $('#equipment-image').val(),
    isBroken: false,
    uid: firebase.auth().currentUser.uid,
  };
  // 2. save to firebase
  equipData.addEquipment(newEquipment)
    .then(() => {
      // 3. reprint the page
      // eslint-disable-next-line no-use-before-define
      printEquipmentDashboard();
    })
    .catch((err) => console.error('could not add new equipment', err));
};

const openEquipmentForm = () => {
  $('#equipment-form').removeClass('hide');
  $('#equipment-update-form').addClass('hide');

  equipment.buildEquipmentForm();
};


const showUpdateEquipmentForm = (equipmentId) => {
  $('#equipment-update-form').removeClass('hide');
  $('#equipment-form').addClass('hide');

  equipData.getSingleEquipment(equipmentId)
    .then((selectedEquipmentId) => {
      // eslint-disable-next-line no-use-before-define
      equipment.updateEquipmentForm(equipmentId, selectedEquipmentId);
    })
    .catch((err) => console.error('could not get single equipment', err));
};

const editEquipmentEvent = (e) => {
  const equipmentId = e.target.closest('.card').id;
  console.error(equipmentId);
  showUpdateEquipmentForm(equipmentId);
};

const submitEditEquipmentEvent = (e) => {
  e.preventDefault();
  const selectedEquipmentId = e.target.closest('form').id;
  const modifiedEquipment = {
    description: $('#update-equipment-description').val(),
    isBroken: $('#equipment-broken-status').is(':checked'),
    name: $('#update-equipment-name').val(),
    imageUrl: $('#update-equipment-image').val(),
    uid: firebase.auth().currentUser.uid,
  };
  equipData.updateEquipment(selectedEquipmentId, modifiedEquipment)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printEquipmentDashboard();
    })
    .catch((err) => console.error('could not update equipment', err));
};

const printEquipmentDashboard = () => {
  equipData.getEquips()
    .then((equipmentArr) => {
      let domString = '';
      domString += '<h2 class="text-center text-light my-3">Equipment</h2>';
      domString += '<div class="col-12 text-center my-2 mx-2"><button id="new-equipment-btn" class="btn dashboard-btn text-light"><i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += '<div id="equipment-form" class="container hide">';
      domString += '</div>';
      domString += '<div id="equipment-update-form" class="container hide">';
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      equipmentArr.forEach((equipments) => {
        domString += equipment.buildEquipment(equipments);
      });
      domString += '  </div>';
      domString += '</div>';
      utils.printToDom('equipment-dashboard', domString);
    })
    .catch((error) => {
      console.error(error);
    });
};

const equipmentEvents = () => {
  $('body').on('click', '.delete-equipment', removeEquipment);
  $('body').on('click', '#new-equipment-btn', openEquipmentForm);
  $('body').on('click', '#add-equipment', addEquipmentToContainer);
  $('body').on('click', '.edit-equipment', editEquipmentEvent);
  $('body').on('click', '#update-equipment', submitEditEquipmentEvent);
};

export default {
  printEquipmentDashboard,
  equipmentEvents,
};
