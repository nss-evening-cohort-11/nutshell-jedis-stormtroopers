import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';

const getKidnappedStaffList = () => {
  staffData.getStaffs()
    .then((staffArray) => {
      let domString = '';
      staffArray.forEach((staffMember) => {
        if (staffMember.isKidnapped) {
          domString += `<p>${staffMember.name}</p>`;
          utils.printToDom('staff-overview-container', domString);
        }
      });
    })
    .catch((err) => console.error('problem with getKidnappedStaffList', err));
};

export default { getKidnappedStaffList };
