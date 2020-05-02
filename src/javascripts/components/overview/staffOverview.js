import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';

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
    .catch((err) => console.error('could not get missing staff', err));
};

export default { getUnassignedStaff };
