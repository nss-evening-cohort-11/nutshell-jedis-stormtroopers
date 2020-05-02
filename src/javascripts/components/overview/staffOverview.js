import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';

const getKidnappedStaffList = () => {
  staffData.getStaffs()
    .then((staffArray) => {
      let domString = '<ul class="overview-list">';
      staffArray.forEach((staffMember) => {
        if (staffMember.isKidnapped) {
          domString += `<li>${staffMember.name}</li>`;
        }
      });
      domString += '</ul>';
      utils.printToDom('staff-overview-container', domString);
    })
    .catch((err) => console.error('problem with getKidnappedStaffList', err));
};

export default { getKidnappedStaffList };
