import utils from '../../helpers/utils';
import chaosMonkeyData from '../../helpers/data/chaosMonkeyData';

const getMissingStaffList = () => {
  chaosMonkeyData.getChaosEventsByType('kidnap')
    .then((eventsArray) => {
      let domString = '';
      eventsArray.forEach((event) => {
        domString += `<p>Kidnapping at ${event.timestamp}</p>`;
      });
      utils.printToDom('staff-overview-container', domString);
    })
    .catch((err) => console.error('problem with getMissingStaffList', err));
};

// const getMissingStaffCount = () => {
//   staffData.getStaffs()
//     .then((resp) => {
//       const missing = resp.filter((x) => x.isKidnapped);
//       let domString = '';
//       domString += '<p>Missing Staff Count:</p>';
//       domString += `<div id="missing-staff-count" class="text-center mt-5">${missing.length}</div>`;
//       utils.printToDom('missing-staff', domString);
//     })
//     .catch((err) => console.error('could not get missing staff', err));
// };

const buildStaffOverview = () => {
  let domString = '';
  domString += '<div id="staff-overview-container" class="text-center">';
  domString += getMissingStaffList();
  domString += '</div>';
  // domString += '<div id="missing-staff">';
  // domString += getMissingStaffCount();
  // domString += '</div>';
  return domString;
};

export default { buildStaffOverview };
