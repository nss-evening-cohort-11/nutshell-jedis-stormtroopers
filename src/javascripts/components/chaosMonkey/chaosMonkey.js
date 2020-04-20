import equipmentStorageContainer from '../equipmentStorageContainer/equipmentStorageContainer';
import ridesComponent from '../rides/rides';
import staffComponent from '../staff/staff';

import equipData from '../../helpers/data/equipData';
import ridesData from '../../helpers/data/ridesData';
import staffData from '../../helpers/data/staffData';

import utils from '../../helpers/utils';

const moment = require('moment');

const randomChaosMonkeyStrike = () => {
  const randNum = Math.ceil(Math.random() * 3);
  let randomStrike = '';

  switch (randNum) {
    case 1: // Break Equipment
      equipData.getEquips()
        .then((allEquipment) => {
          const equipRandNum = Math.ceil(Math.random() * allEquipment.length - 1);

          if (allEquipment[equipRandNum].isBroken === false) {
            const randEquipId = allEquipment[equipRandNum].id;

            randomStrike = `broke the ${allEquipment[equipRandNum].name}`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);

            equipData.breakEquipment(randEquipId)
              .then(() => {
                equipmentStorageContainer.printEquipmentDashboard();
              })
              .catch((err) => console.error('problem with break equipment in Chaos Monkey', err));
          } else {
            randomStrike = `fixes the ${allEquipment[equipRandNum].name}, and breaks it again`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);
          }
        })
        .catch((err) => console.error('problem with get equips in Chaos Monkey', err));
      break;
    case 2: // Kidnap Staff Member
      staffData.getStaffs()
        .then((allStaff) => {
          const staffRandNum = Math.ceil(Math.random() * allStaff.length - 1);

          if (allStaff[staffRandNum].isKidnapped === false) {
            const randStaffId = allStaff[staffRandNum].id;

            randomStrike = `kidnapped ${allStaff[staffRandNum].name}`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);

            staffData.kidnapStaff(randStaffId)
              .then(() => {
                staffComponent.printStaffDashboard();
              })
              .catch((err) => console.error('problem with kidnap staff in Chaos Monkey', err));
          } else {
            randomStrike = `has ${allStaff[staffRandNum].name} captive`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);
          }
        })
        .catch((err) => console.error('problem with get staffs in Chaos Monkey', err));

      break;
    case 3: // Break Ride
      ridesData.getRides()
        .then((allRides) => {
          const ridesRandNum = Math.ceil(Math.random() * allRides.length - 1);
          const randRideId = allRides[ridesRandNum].id;

          if (allRides[ridesRandNum].isBroken === false) {
            randomStrike = `broke the ${allRides[ridesRandNum].name}`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);

            ridesData.breakRide(randRideId)
              .then(() => {
                ridesComponent.printRidesDashboard();
              })
              .catch((err) => console.error('problem with break ride in Chaos Monkey', err));
          } else {
            randomStrike = `smashes the ${allRides[ridesRandNum].name} one more time`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);
          }
        })
        .catch((err) => console.error('problem with get rides in Chaos Monkey', err));
      break;
    default:
  }
};

const chaosMonkeyAlert = (randomStrike) => {
  const time = moment().format('MMMM Do YYYY, h:mm:ss a');
  let domString = '';

  domString += '<div class="alert bg-danger alert-dismissible fade show" role="alert">';
  domString += `<strong>Chaos Monkey ${randomStrike}!</strong>`;
  domString += `<span class="float-right">${time}</span>`;
  domString += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
  domString += '  <span aria-hidden="true">&times</span>';
  domString += '</button>';
  domString += '</div>';

  utils.printToDom('chaos-monkey-alert', domString);
};

const unleashChaosMonkey = () => {
  setInterval(randomChaosMonkeyStrike, 3000);
};

export default { unleashChaosMonkey };
