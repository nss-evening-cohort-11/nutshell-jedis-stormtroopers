/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/auth';

import staffData from '../../helpers/data/staffData';
import assignmentsData from '../../helpers/data/assignmentsData';
import overview from '../overview/overview';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';
import timeTableBuilder from '../timeTableBuilder/timeTableBuilder';
import shiftJobRadios from '../shiftJobRadios/shiftJobRadios';

const closeModalButtonEvent = (e) => {
  e.preventDefault();
  $('#schedule-staff-modal').modal('hide');
  utils.printToDom('job-modal-body', '');
};

const closeJobDetailModalButtonEvent = (e) => {
  e.preventDefault();
  $('#job-detail-modal').modal('hide');
  utils.printToDom('job-detail-modal-body', '');
};

const closeFormButton = () => {
  const domString = '<button id="close-form-button" class="btn btn-outline-light"><i class="text-white fas fa-times"></i></button>';
  return domString;
};

const showEditForm = () => {
  $('#edit-staff-form-container').removeClass('hide');
  $('#new-staff-form-container').addClass('hide');
  $('#schedule-staff-form-container').addClass('hide');
};

const showSingleStaffView = () => {
  $('#edit-staff-form-container').addClass('hide');
  $('#new-staff-form-container').addClass('hide');
  $('#single-staff-form-container').removeClass('hide');
};

const buildSingleStaffMember = (staffId) => {
  showSingleStaffView();
  smash.getAllWeeklyShiftsWithSingleStaffMemberJobAssignments(staffId)
    .then((staffMember) => {
      let domString = '';
      domString += `<div data-staff-id="${staffMember.id}" class="card form-card col-12">`;
      domString += '  <div class="d-flex flex-row justify-content-between align-items-center card-header text-center">';
      domString += `    <h2>Staff Member Schedule: ${staffMember.name}</h2>`;
      domString += closeFormButton();
      domString += '  </div>';
      domString += '<div class="text-light">';
      domString += timeTableBuilder.timeTableBuilder(staffMember.schedule);
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('single-staff-form-container', domString);
    })
    .catch((err) => console.error('This is not working!', err));
};

const newStaffForm = () => {
  let domString = '';
  domString += '<div class="card form-card col-6 offset-3">';
  domString += '<div class="d-flex justify-content-between align-items-center card-header text-center">';
  domString += '<h2>New Staff Member</h2>';
  domString += closeFormButton();
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<form class="new-staff-form">';
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
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" class="btn btn-outline-success" id="submit-new-staff">Add staff</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';

  utils.printToDom('new-staff-form-container', domString);
};

const showStaffForm = () => {
  $('#new-staff-form-container').removeClass('hide');
  $('#edit-staff-form-container').addClass('hide');
  $('#single-staff-form-container').addClass('hide');

  newStaffForm();
};

const editStaffForm = (staffId) => {
  showEditForm();
  staffData.getSingleStaffMemeber(staffId)
    .then((response) => {
      const staff = response.data;
      let domString = '';
      domString += '<div class="card form-card col-6 offset-3">';
      domString += '<div class="d-flex flex-row justify-content-between align-items-center card-header text-center">';
      domString += '<h2>Edit staff</h2>';
      domString += closeFormButton();
      domString += '</div>';
      domString += '<div class="card-body">';
      domString += `<form class="edit-staff-form" id=${staffId}>`;
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
      domString += '</div>';
      domString += '<div class="card-footer text-center">';
      domString += '<button type="submit" class="btn btn-outline-success" id="submit-staff-changes">Update</button>';
      domString += '</div>';
      domString += '</form>';
      domString += '</div>';

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
  domString += '<div class="col-lg-4 col-md-6">';
  domString += `<div id="${staff.id}" class="card text-center my-2 ${staff.isKidnapped ? 'bg-danger' : 'bg-info'}">`;
  domString += '<div class="card-header">';
  domString += `<h3 class="card-title">${staff.name}</h3>`;
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<div>';
  domString += `<img class="card-img-top img-fluid cards-image" src="${staff.photoUrl}" alt="Card image cap">`;
  domString += '</div>';
  domString += '<p class="card-text mt-3">';
  domString += staff.isKidnapped ? `${staff.name} is missing!` : `${staff.name} is accounted for.`;
  domString += '</p>';
  domString += '<p class="card-text mt-3">';
  domString += staff.jobs.length === 0 ? `${staff.name} has no assigned shifts!` : '';
  domString += '</p>';
  domString += '</div>';
  domString += '<div class="card-footer">';
  domString += '<button class="btn card-btn mx-1 btn-outline-danger delete-staff"><i class="fas fa-trash card-icon"></i></button>';
  domString += `${staff.isKidnapped ? '' : '<button class="btn card-btn mx-1 btn-outline-success edit-staff"><i class="fas fa-pencil-alt card-icon"></i></button>'}`;
  domString += `${staff.isKidnapped ? '' : '<button class="btn card-btn mx-1 btn-outline-info staff-single-view"><i class="mt-1 far fa-calendar-alt"></i></button>'}`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

const printStaffDashboard = () => {
  smash.getAllStaffWithJobs()
    .then((finalStaffMembersWithJobs) => {
      let domString = '';
      domString += '<div class="d-flex flex-wrap">';
      domString += '<div class="col-12 text-center"><h1 class="my-3">[ Staff ]</h1></div>';
      domString += '<div class="col-12 text-center"><button id="new-staff-btn" class="btn dashboard-btn mb-2">';
      domString += '<i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += '<div id="edit-staff-form-container" class="form-container col-12 my-3 hide">';
      domString += '</div>';
      domString += '<div id="new-staff-form-container" class="form-container col-12 my-3 hide">';
      domString += '</div>';
      domString += '<div id="single-staff-form-container" class="form-container container-fluid my-3 hide">';
      domString += '</div>';
      domString += '<div id="unassigned-staff-member" class="form-container container-fluid my-3 hide">';
      domString += '</div>';
      finalStaffMembersWithJobs.forEach((staffMember) => {
        if (staffMember) domString += printStaff(staffMember);
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
  const newStaff = {
    name: $('#new-staff-name').val(),
    photoUrl: $('#new-staff-image').val(),
    job: $('#new-staff-job').val(),
    isKidnapped: JSON.parse(isKidnappedBool),
    uid: myUid,
  };
  staffData.addStaff(newStaff).then(() => printStaffDashboard())
    .catch((err) => console.error('makeNewstaff broke', err));
};

const modifyStaff = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isKidnappedBool = $("input[name='editStaffRadiosKidnapped']:checked").val();
  const staffId = $('.edit-staff-form').attr('id');
  const modifiedStaff = {
    name: $('#edit-staff-name').val(),
    photoUrl: $('#edit-staff-image').val(),
    job: $('#edit-staff-job').val(),
    isKidnapped: JSON.parse(isKidnappedBool),
    uid: myUid,
  };
  utils.printToDom('edit-form-container', '');
  staffData.updateStaff(staffId, modifiedStaff)
    .then(() => printStaffDashboard())
    .catch((err) => console.error('Modify Pin Broke', err));
};

const closeStaffForm = (e) => {
  const containerId = e.target.closest('.form-container').id;
  $(`#${containerId}`).addClass('hide');
  utils.printToDom(`${containerId}`, '');
};

const removeStaff = (e) => {
  const staffId = e.target.closest('.card').id;
  staffData.deleteStaff(staffId).then(() => printStaffDashboard())
    .catch((err) => console.error('could not delete staff', err));
};

const singleStaffMemberEvent = (e) => {
  const staffId = e.target.closest('.card').id;
  buildSingleStaffMember(staffId);
};

const showJobsEvent = (e) => {
  const shiftId = e.target.id;
  const isOpenShift = $(`#${shiftId}`).html() === '';
  const { staffId } = e.target.closest('.form-card').dataset;
  if (isOpenShift) {
    shiftJobRadios.buildShiftJobRadios(shiftId, staffId);
  }
};

const makeNewAssignment = (e) => {
  e.preventDefault();
  const jobId = $("input[name='jobRadio']:checked").val();
  const { staffId } = e.target.dataset;
  const newAssignment = {
    jobId,
    staffId,
  };
  assignmentsData.setAssignment(newAssignment)
    .then(() => {
      utils.printToDom('job-modal-body', '');
      $('#schedule-staff-modal').modal('hide');
      buildSingleStaffMember(staffId);
      overview.printOverviewDashboard();
      printStaffDashboard();
    })
    .catch((err) => console.error('There is a problem with assigning this staff member:', err));
};

const deleteAssignment = (e) => {
  console.error(e.target);
};

const staffEvents = () => {
  $('body').on('click', '.edit-staff', editStaffEvent);
  $('body').on('click', '#submit-staff-changes', modifyStaff);
  $('body').on('click', '.delete-staff', removeStaff);
  $('body').on('click', '#new-staff-btn', showStaffForm);
  $('body').on('click', '#submit-new-staff', makeNewStaff);
  $('body').on('click', '#close-form-button', closeStaffForm);
  $('body').on('click', '.staff-single-view', singleStaffMemberEvent);
  $('body').on('click', '.shift-cell', showJobsEvent);
  $('body').on('click', '#close-modal-button', closeModalButtonEvent);
  $('body').on('click', '#close-job-modal-button', closeJobDetailModalButtonEvent);
  $('body').on('click', '#submit-staff-job', makeNewAssignment);
  $('body').on('click', '.delete-assignment', deleteAssignment);
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
