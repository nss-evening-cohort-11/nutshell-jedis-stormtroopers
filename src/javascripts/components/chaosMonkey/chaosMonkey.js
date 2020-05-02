import equipmentStorageContainer from '../equipmentStorageContainer/equipmentStorageContainer';
import ridesComponent from '../rides/rides';
import staffComponent from '../staff/staff';
import vendorsComponent from '../vendors/vendors';

import chaosMonkeyData from '../../helpers/data/chaosMonkeyData';
import equipData from '../../helpers/data/equipData';
import ridesData from '../../helpers/data/ridesData';
import staffData from '../../helpers/data/staffData';
import smash from '../../helpers/data/smash';

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

            randomStrike = ` has stolen the ${allEquipment[equipRandNum].name}`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);

            equipData.breakEquipment(randEquipId)
              .then(() => {
                chaosMonkeyData.addEventToChaosHistory('stolen', randEquipId);// add this event to history of Chaos Monkey
                equipmentStorageContainer.printEquipmentDashboard();
                smash.completelyRemoveTask(randEquipId);
              })
              .catch((err) => console.error('problem with equipment in Chaos Monkey', err));
          } else {
            randomStrike = `was spotted in the park with the stolen ${allEquipment[equipRandNum].name}`;
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

          if (allStaff[staffRandNum].isKidnapped === false) { // check if already kidnapped
            const randStaffId = allStaff[staffRandNum].id; // find a random staff member

            randomStrike = `kidnapped ${allStaff[staffRandNum].name}`; // assign the Alert message
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike); // print the Alert message to dashboard

            staffData.kidnapStaff(randStaffId) // change staff's boolean isKidnapped to 'true'
              .then(() => {
                smash.deleteStaffAssignments(randStaffId); // delete existing assignments for the kidnapped staff member
                chaosMonkeyData.addEventToChaosHistory('kidnap', randStaffId);// add this event to history of Chaos Monkey
                staffComponent.printStaffDashboard(); // update the staff dashboard to current
              })
              .catch((err) => console.error('problem with kidnap staff in Chaos Monkey', err));
          } else {
            randomStrike = `sent a ransom note for captive ${allStaff[staffRandNum].name}!`; // assign the Alert message if already kidnapped
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike); // print the Alert message to dashboard
          }
        })
        .catch((err) => console.error('problem with get staffs in Chaos Monkey', err));

      break;
    case 3: // Break Ride
      ridesData.getRides()
        .then((allRides) => {
          const ridesRandNum = Math.ceil(Math.random() * allRides.length - 1);
          const randRideId = allRides[ridesRandNum].id;
          smash.removeAllJobAssignmentsByAssetId(randRideId)
            .then(() => {
            })
            .catch((err) => console.error('There is a problem with your smash function:', err));
          if (allRides[ridesRandNum].isBroken === false) {
            randomStrike = `broke the ${allRides[ridesRandNum].name} ride`;
            // eslint-disable-next-line no-use-before-define
            chaosMonkeyAlert(randomStrike);

            ridesData.breakRide(randRideId)
              .then(() => {
                chaosMonkeyData.addEventToChaosHistory('broken', randRideId);// add this event to history of Chaos Monkey
                ridesComponent.printRidesDashboard();
              })
              .catch((err) => console.error('problem with break ride in Chaos Monkey', err));
          } else {
            randomStrike = `smashed the ${allRides[ridesRandNum].name} ride again`;
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
  const time = moment().format('MMMM Do YYYY, h:mm a');
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
  setInterval(randomChaosMonkeyStrike, 15 * 1000);
  randomChaosMonkeyStrike();
};

export default { unleashChaosMonkey };
