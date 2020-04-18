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

const addEquipment = (e) => {
  e.preventDefault();
  $('#equipment-form').removeClass('hide');
  console.error('I worked');
  // // 1. make a new cow object
  // const newEquipment = {
  //   name: $('#equipment-name').val(),
  //   breed: $('#cow-breed').val(),
  //   location: $('#cow-location').val(),
  //   weight: $('#cow-weight').val() * 1,
  // };
  // // 2. save to firebase
  // cowData.addCow(newCow)
  //   .then(() => {
  //     // 3. reprint cows
  //     // eslint-disable-next-line no-use-before-define
  //     buildCows();
  //     utils.printToDom('new-cow', '');
  //   })
  //   .catch((err) => console.error('could not add cow', err));
};

const printEquipmentDashboard = () => {
  equipData.getEquips()
    .then((equipmentArr) => {
      let domString = '';
      domString += '<h2 class="text-center">Equipment</h2>';
      domString += '<div class="col-12 text-center"><button id="new-equipment-btn" class="btn dashboard-btn"><i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += '<div id="equipment-form" class="hide">';
      equipment.buildEquipmentForm();
      domString += '</div>';
      domString += '  <div class="d-flex flex-wrap justify-content-center">';
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
  $('body').on('click', '#new-equipment-btn', addEquipment);
};

export default {
  printEquipmentDashboard,
  equipmentEvents,
};
