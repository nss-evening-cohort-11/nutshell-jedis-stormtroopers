import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';

const getEmployeeOfTheMonth = () => {
  staffData.getStaffs()
    .then((resp) => {
      const EOTM = resp.find((x) => x.isEOTM);
      let domString = '';
      domString += '<p>Congratulations to our Employee of the Month!</p>';
      domString += `<img id="eotm-photo" class="img-fluid cards-image" src="${EOTM.photoUrl}">`;
      utils.printToDom('EOTM', domString);
    })
    .catch((err) => console.error('could not get EOTM', err));
};

const getMissingStaff = () => {
  staffData.getStaffs()
    .then((resp) => {
      const missing = resp.filter((x) => x.isKidnapped);
      let domString = '';
      domString += '<p>Missing Staff Count:</p>';
      domString += `<div id="missing-staff-count" class="text-center mt-5">${missing.length}</div>`;
      utils.printToDom('missing-staff', domString);
    })
    .catch((err) => console.error('could not get missing staff', err));
};

const buildStaffOverview = () => {
  let domString = '';
  domString += '<div id="EOTM" class="text-center">';
  domString += getEmployeeOfTheMonth();
  domString += '</div>';
  domString += '<div id="missing-staff">';
  domString += getMissingStaff();
  domString += '</div>';
  return domString;
};

export default { buildStaffOverview };
