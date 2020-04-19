import firebase from 'firebase/app';
import 'firebase/auth';
import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';

const showEditForm = () => {
  $('div#edit-staff-form-container').removeClass('hide');
  $('div#new-staff-form-container').addClass('hide');
};

const newStaffForm = () => {
  let domString = '';
  domString += '<form class="col-12 text-center new-staff-form">';
  domString += '<h2 class="text-center">New Staff Member</h2>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-name">Name</label>';
  domString += '<input type="text" class="form-control" id="new-staff-name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-image">Image Url</label>';
  domString += '<input type="text" class="form-control" id="new-staff-image">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-type">Job</label>';
  domString += '<input type="text" class="form-control" id="new-staff-job">';
  domString += '</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosKidnapped" id="newStaffRadiosKidnapped" value="true">';
  domString += '<label class="form-check-label" for="newStaffRadiosKidnapped">Kidnapped!</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosKidnapped" id="newStaffRadiosKidnapped" value="false">';
  domString += '<label class="form-check-label" for="newStaffRadiosKidnapped">NOT Kidnapped</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosEmployee" id="newStaffRadiosEmployee" value="true">';
  domString += '<label class="form-check-label" for="newStaffRadiosEmployee">Employee of the Month!</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosEmployee" id="newStaffRadiosEmployee" value="false">';
  domString += '<label class="form-check-label" for="newStaffRadiosEmployee">NOT Employee of the Month</div>';
  domString += '<button type="submit" class="btn btn-dark" id="submit-new-staff">Add staff</button>';
  domString += '</form>';

  utils.printToDom('new-staff-form-container', domString);
};

const showStaffForm = () => {
  $('#new-staff-form-container').removeClass('hide');
  $('#edit-staff-form-container').addClass('hide');

  newStaffForm();
};

const editStaffForm = (staffId) => {
  showEditForm();
  staffData.getSingleStaffMemeber(staffId)
    .then((response) => {
      const staff = response.data;
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
      domString += '<label for="edit-staff-type">Job</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-job" value=${staff.job}>`;
      domString += '</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosKidnapped" id="editStaffRadiosKidnapped" value="true">';
      domString += '<label class="form-check-label" for="editStaffRadiosKidnapped">Kidnapped!</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosKidnapped" id="editStaffRadiosKidnapped" value="false">';
      domString += '<label class="form-check-label" for="editStaffRadiosKidnapped">NOT Kidnapped</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosEmployee" id="editStaffRadiosEmployee" value="true">';
      domString += '<label class="form-check-label" for="editStaffRadiosEmployee">Employee of the Month!</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosEmployee" id="editStaffRadiosEmployee" value="false">';
      domString += '<label class="form-check-label" for="editStaffRadiosEmployee">NOT Employee of the Month</div>';
      domString += '<button type="submit" class="btn btn-dark" id="submit-staff-changes">Submit Changes</button>';
      domString += '</form>';

      utils.printToDom('edit-staff-form-container', domString);
    });
};

const editStaffEvent = (e) => {
  e.preventDefault();
  const staffId = e.target.closest('.card').id;
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
  domString += '<button class="btn btn-danger delete-staff d-flex justify-content-center">X</button>';
  domString += '<button class="btn btn-success edit-staff">';
  domString += 'Edit Staff';
  domString += '</button>';
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
      domString += '<button id="new-staff-btn" class="btn dashboard-btn">';
      domString += '<i class="fas fa-plus dashboard-icon"></i></button>';
      domString += '<div id="edit-staff-form-container" class="container hide">';
      domString += '</div>';
      domString += '<div id="new-staff-form-container" class="container hide">';
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap justify-content-around">';
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
  const isKidnappedBool = $("input[name='newStaffRadiosKidnapped']:checked").val();
  const isEotmBool = $("input[name='newStaffRadiosEmployee']:checked").val();
  const newStaff = {
    name: $('#new-staff-name').val(),
    photoUrl: $('#new-staff-image').val(),
    job: $('#new-staff-job').val(),
    isKidnapped: JSON.parse(isKidnappedBool),
    isEOTM: JSON.parse(isEotmBool),
    uid: myUid,
  };
  staffData.addStaff(newStaff).then(() => printStaffDashboard())
    .catch((err) => console.error('makeNewstaff broke', err));
};

const modifyStaff = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isKidnappedBool = $("input[name='editStaffRadiosKidnapped']:checked").val();
  const isEotmBool = $("input[name='editStaffRadiosEmployee']:checked").val();
  const staffId = e.target.closest('.edit-staff-form').id;
  const modifiedStaff = {
    name: $('#edit-staff-name').val(),
    photoUrl: $('#edit-staff-image').val(),
    job: $('#edit-staff-job').val(),
    isKidnapped: JSON.parse(isKidnappedBool),
    isEOTM: JSON.parse(isEotmBool),
    uid: myUid,
  };
  utils.printToDom('edit-form-container', '');
  staffData.updateStaff(staffId, modifiedStaff)
    .then(() => printStaffDashboard())
    .catch((err) => console.error('Modify Pin Broke', err));
};

const removeStaff = (e) => {
  const staffId = e.target.closest('.card').id;
  staffData.deleteStaff(staffId).then(() => printStaffDashboard())
    .catch((err) => console.error('could not delete staff', err));
};

const staffEvents = () => {
  $('body').on('click', '.edit-staff', editStaffEvent);
  $('body').on('click', '#submit-staff-changes', modifyStaff);
  $('body').on('click', '.delete-staff', removeStaff);
  $('body').on('click', '#new-staff-btn', showStaffForm);
  $('body').on('click', '#submit-new-staff', makeNewStaff);
};

export default {
  printStaffDashboard,
  makeNewStaff,
  newStaffForm,
  editStaffForm,
  editStaffEvent,
  modifyStaff,
  removeStaff,
  staffEvents,
};
