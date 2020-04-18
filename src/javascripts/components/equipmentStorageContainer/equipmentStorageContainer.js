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
  equipment.buildEquipmentForm();
};

const printEquipmentDashboard = () => {
  equipData.getEquips()
    .then((equipmentArr) => {
      let domString = '';
      domString += '<h2 class="text-center text-light my-3">Equipment</h2>';
      domString += '<div class="col-12 text-center my-2 mx-2"><button id="new-equipment-btn" class="btn dashboard-btn text-light"><i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += '<div id="equipment-form" class="container hide">';
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
};

export default {
  printEquipmentDashboard,
  equipmentEvents,
};
