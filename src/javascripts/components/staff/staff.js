import 'firebase/auth';
import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';

const printStaff = (staff) => {
  let domString = '';
  domString += staff.isKidnapped ? '<div id="staff-card" class="card col-4 bg-danger" style="width: 18rem;">' : '<div class="card col-4 staff-card" style="width: 18rem;">';
  domString += `<h3>${staff.name}</h3>`;
  domString += `<img class="card-img-top img-fluid" src="${staff.photoUrl}" alt="Card image cap">`;
  domString += '<div class="card-body flex-column">';
  domString += '<div>';
  domString += staff.isKidnapped ? `${staff.name} is missing!` : `${staff.name} is accounted for.`;
  domString += '</div>';
  domString += '<div>';
  domString += staff.isEOTM ? `Congrats ${staff.name} for being our Employee of the Month!` : '';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

const printStaffDashboard = () => {
  staffData.getStaffs()
    .then((staffs) => {
      let domString = '';
      staffs.forEach((staff) => {
        if (staff) domString += printStaff(staff);
      });
      utils.printToDom('staff-dashboard', domString);
    })
    .catch((err) => console.error('printStaffDashboard broke', err));
};

export default { printStaffDashboard };
