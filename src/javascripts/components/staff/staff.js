import firebase from 'firebase/app';
import 'firebase/auth';
import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';


const newStaffForm = () => {
  let domString = '';
  domString += '<h2 class="text-center">New Staff Member</h2>';
  domString += '<form class="col-10 offset-1 new-staff-form">';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-name">Name</label>';
  domString += '<input type="text" class="form-control" id="new-staff-name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-image">Image Url</label>';
  domString += '<input type="text" class="form-control" id="new-staff-image">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-type">Type</label>';
  domString += '<input type="text" class="form-control" id="new-staff-type">';
  domString += '</div>';
  domString += '<div class="form-check">';
  domString += '<h5>Is this staff hungry?</h5>';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadios" id="newStaffRadios" value="true">';
  domString += '<label class="form-check-label" for="newStaffRadios">Is Hungry</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadios" id="newStaffRadios" value="false">';
  domString += '<label class="form-check-label" for="newStaffRadios">Is NOT Hungry</div>';
  domString += '<button type="submit" class="btn btn-dark" id="submit-new-staff">Add staff</button>';
  domString += '</form>';

  utils.printToDom('new-form-container', domString);
};

const editStaffForm = (staffId) => {
  console.error(staffId, 'staffId top of editstaff');
  staffData.getSinglestaff(staffId)
    .then((response) => {
      const staff = response.data;
      console.error(staff, 'staff in editstaffForm');
      let domString = '';
      domString += '<h2 class="text-center">Edit staff</h2>';
      domString += `<form class="col-10 offset-1 edit-staff-form" id=${staffId}>`;
      domString += '<div class="form-group">';
      domString += '<label for="staff-name">Name</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-name" value=${staff.name}>`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-staff-image">Image Url</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-image" value=${staff.photoUrl}>`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-staff-type">Type</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-type" value=${staff.type}>`;
      domString += '</div>';
      domString += '<div class="form-check">';
      domString += '<h5>Is this staff hungry?</h5>';
      domString += '<input class="form-check-input" type="radio" name="editstaffRadios" id="editstaffRadios" value="true">';
      domString += '<label class="form-check-label" for="editstaffRadios">Is Hungry</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editstaffRadios" id="editstaffRadios" value="false">';
      domString += '<label class="form-check-label" for="editstaffRadios">Is NOT Hungry</div>';
      domString += '<button type="submit" class="btn btn-dark" id="submit-staff-changes">Submit Changes</button>';
      domString += '</form>';
      utils.printToDom('edit-form-container', domString);
    });
};

const editStaffEvent = (e) => {
  e.preventDefault();
  const staffId = e.target.closest('.card').id;
  console.error(staffId, 'editEvent staffId');
  editStaffForm(staffId);
};

const printStaff = (staff) => {
  let domString = '';
  domString += `<div id="${staff.id}" class="card col-4 ${staff.isKidnapped ? 'bg-danger' : 'bg-light'}" style="width: 18rem;">`;
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
      domString += '<h2 class="text-light">Staff</h2>';
      domString += '<button id="new-staff-btn" class="btn dashboard-btn" data-toggle="collapse" href="#newFormCollapse" type="button" aria-expanded="false" aria-controls="newFormCollapse">';
      domString += '<i class="fas fa-plus dashboard-icon"></i></button>';
      domString += '<div class="col-12 d-flex flex-wrap justify-content-around">';
      staffs.forEach((staff) => {
        if (staff) domString += printStaff(staff);
      });
      domString += '</div>';
      utils.printToDom('staff-dashboard', domString);
    })
    .catch((err) => console.error('printStaffDashboard broke', err));
};


const makeNewStaff = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isKidnappedBool = $("input[name='newStaffRadios']:checked").val();
  const isEotmBool = $("input[name='newStaffRadios']:checked").val();
  const newStaff = {
    name: $('#new-staff-name').val(),
    photoUrl: $('#new-staff-image').val(),
    type: $('#new-staff-type').val(),
    isKidnapped: isKidnappedBool,
    isEOTM: isEotmBool,
    uid: myUid,
  };
  console.error(newStaff, 'newStaff makeNewstaff');
  $('#newFormCollapse').removeClass('show');
  staffData.addStaff(newStaff).then(() => printStaffDashboard())
    .catch((err) => console.error('makeNewstaff broke', err));
};

const modifyStaff = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isKidnappedBool = $("input[name='editStaffRadios']:checked").val();
  const isEotmBool = $("input[name='editStaffRadios']:checked").val();
  const staffId = e.target.closest('.edit-dino-form').id;
  console.error(staffId, 'dinoId modify dino');
  const modifiedDino = {
    name: $('#edit-staff-name').val(),
    photoUrl: $('#edit-staff-image').val(),
    type: $('#edit-staff-type').val(),
    isKidnapped: isKidnappedBool,
    isEOTM: isEotmBool,
    uid: myUid,
  };
  utils.printToDom('edit-form-container', '');
  $('#editFormCollapse').removeClass('show');
  staffData.updateDino(staffId, modifiedDino)
    .then(() => printStaffDashboard())
    .catch((err) => console.error('Modify Pin Broke', err));
};

export default {
  printStaffDashboard,
  makeNewStaff,
  newStaffForm,
  editStaffForm,
  editStaffEvent,
  modifyStaff,
};
