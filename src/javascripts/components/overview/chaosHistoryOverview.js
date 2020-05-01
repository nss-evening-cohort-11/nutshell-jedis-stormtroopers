import utils from '../../helpers/utils';
// eslint-disable-next-line import/no-cycle
import chaosMonkeyData from '../../helpers/data/chaosMonkeyData';
import staffData from '../../helpers/data/staffData';
import ridesData from '../../helpers/data/ridesData';
import equipData from '../../helpers/data/equipData';

const getChaosHistory = () => {
  Promise.all([chaosMonkeyData.getAllChaosEvents(), staffData.getStaffs(), ridesData.getRides(), equipData.getEquips()])
  // will wait to resolve array of arrays: [ chaosMonkeyEvents[], allStaffMembers[], allRides[], allEquipment[] ]
    .then((allPromisesArray) => {
      let domString = '<ul class="overview-list">';
      allPromisesArray[0].forEach((chaosEvent) => {
        if (chaosEvent.eventType === 'kidnap') {
          domString += `<li>${chaosEvent.timestamp} - `;
          allPromisesArray[1].forEach((staffObject) => {
            if (chaosEvent.affectedEntityId === staffObject.id) {
              domString += `[MISSING STAFF] ${staffObject.name}</li>`;
            }
          });
        } else if (chaosEvent.eventType === 'broken') {
          domString += `<li>${chaosEvent.timestamp} - `;
          allPromisesArray[2].forEach((rideObject) => {
            if (chaosEvent.affectedEntityId === rideObject.id) {
              domString += `[BROKEN RIDE] ${rideObject.name}</li>`;
            }
          });
        } else {
          domString += `<li>${chaosEvent.timestamp} - `;
          allPromisesArray[3].forEach((equipObject) => {
            if (chaosEvent.affectedEntityId === equipObject.id) {
              domString += `[STOLEN EQUIPMENT] ${equipObject.name}</li>`;
            }
          });
        }
      });
      domString += '</ul>';
      utils.printToDom('chaos-overview-container', domString);
    });
};

export default { getChaosHistory };
