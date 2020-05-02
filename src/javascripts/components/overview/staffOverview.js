import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';
import staffData from '../../helpers/data/staffData';

const getUnassignedStaff = () => {
  smash.getAllStaffWithJobs()
    .then((finalStaffMembersWithJobs) => {
      const noJobs = finalStaffMembersWithJobs.filter((x) => x.jobs.length === 0);
      let domString = '';
      noJobs.forEach((x) => {
        if (x.isKidnapped === false) {
          domString += `<li>${x.name}</li>`;
        }
      });
      utils.printToDom('print-unassigned-staff-list', domString);
    })
    .catch((err) => console.error(err));
};

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

export default { getUnassignedStaff, getKidnappedStaffList };
