import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import ridesData from '../../helpers/data/ridesData';
import smash from '../../helpers/data/smash';

const showNewRideForm = () => {
  $('#new-ride-form-container').removeClass('hide');
  $('#update-ride-form-container').addClass('hide');
};

const closeRideCreatorForm = () => {
  $('#new-ride-form-container').addClass('hide');
};

const closeRideModifierForm = () => {
  $('#update-ride-form-container').addClass('hide');
};

const showSingleRideView = () => {
  $('#update-ride-form-container').addClass('hide');
  $('#new-ride-form-container').addClass('hide');
  $('#single-ride-form-container').removeClass('hide');
};

const buildSingleRide = (rideId) => {
  showSingleRideView();
  smash.getAllWeeklyShiftsForRidesByRideId(rideId)
    .then((ride) => {
      console.log('build rides calendar', ride);
    })
    .catch((err) => console.error('Could not build the rides schedule.', err));
};

const newRideEvent = (e) => {
  e.preventDefault();
  const newRide = {
    description: $('#new-ride-description').val(),
    isBroken: false,
    name: $('#new-ride-name').val(),
    uid: firebase.auth().currentUser.uid,
  };
  ridesData.addRide(newRide)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printRidesDashboard();
      $('#new-ride-form').trigger('reset');
      $('#new-ride-form-container').addClass('hide');
    })
    .catch((err) => console.error('could not add ride', err));
};

const showUpdateRideForm = (rideId) => {
  $('#new-ride-form-container').addClass('hide');
  $('#update-ride-form-container').removeClass('hide');
  ridesData.getSingleRide(rideId)
    .then((selectedRideId) => {
      // eslint-disable-next-line no-use-before-define
      updateRideFormBuilder(rideId, selectedRideId);
    })
    .catch((err) => console.error('could not get single ride', err));
};

const submitModifiedRideEvent = (e) => {
  e.preventDefault();
  const selectedRideId = e.target.closest('.card').dataset.rideId;
  const modifiedRide = {
    description: $('#update-ride-description').val(),
    isBroken: $('#ride-broken-status').is(':checked'),
    name: $('#update-ride-name').val(),
    uid: firebase.auth().currentUser.uid,
  };
  ridesData.updateRide(selectedRideId, modifiedRide)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printRidesDashboard();
      $('#new-ride-form').trigger('reset');
      $('#new-ride-form-container').addClass('hide');
    })
    .catch((err) => console.error('could not update ride', err));
};

const editRideEvent = (e) => {
  const rideId = e.target.closest('.card').id;
  showUpdateRideForm(rideId);
};

const deleteRideEvent = (e) => {
  const rideId = e.target.closest('.card').id;
  ridesData.deleteRide(rideId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printRidesDashboard();
    })
    .catch((err) => console.error('could not delete ride', err));
};

const singleRideCalendarView = (e) => {
  const rideId = e.target.closest('.card').id;
  buildSingleRide(rideId);
};

const rideEvents = () => {
  $('body').on('click', '#new-ride-btn', showNewRideForm);
  $('body').on('click', '#ride-creator-btn', newRideEvent);
  $('body').on('click', '.delete-ride-btn', deleteRideEvent);
  $('body').on('click', '.update-ride-btn', editRideEvent);
  $('body').on('click', '#ride-modifier-btn', submitModifiedRideEvent);
  $('body').on('click', '#ride-creator-close', closeRideCreatorForm);
  $('body').on('click', '#ride-modifier-close', closeRideModifierForm);
  $('body').on('click', '.calendar-ride-btn', singleRideCalendarView);
};

const newRideFormBuilder = () => {
  let domString = '';
  domString += '<div id="new-ride-form-container" class="col-12 my-3 hide">';
  domString += '<div class="card form-card col-6 offset-3">';
  domString += '<div class="card-header text-center">';
  domString += '<h3>Add a Ride</h3>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<form id="new-ride-form">';
  domString += '<div class="form-group">';
  domString += '  <label for="new-ride-name">Ride Name:</label>';
  domString += '  <input type="text" class="form-control" id="new-ride-name" aria-describedby="emailHelp" placeholder="Enter ride name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '  <label for="new-ride-description">Ride Description:</label>';
  domString += '  <input type="text" class="form-control" id="new-ride-description" placeholder="Enter ride description">';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" id="ride-creator-btn" class="btn btn-outline-success mr-1">Add</button>';
  domString += '<button type="submit" id="ride-creator-close" class="btn btn-outline-danger ml-1">Close</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

const updateRideFormBuilder = (rideId, selectedRideId) => {
  let domString = '';
  domString += `<div class="card form-card col-6 offset-3" data-ride-id=${rideId}>`;
  domString += '<div class="card-header text-center">';
  domString += '<h3>Edit a Ride</h3>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<form id="update-ride-form">';
  domString += '<div class="form-group">';
  domString += '  <label for="update-ride-name">Ride Name:</label>';
  domString += `  <input type="text" class="form-control" id="update-ride-name" aria-describedby="emailHelp" value="${selectedRideId.data.name}">`;
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '  <label for="update-ride-description">Ride Description:</label>';
  domString += `  <input type="text" class="form-control" id="update-ride-description" value="${selectedRideId.data.description}">`;
  domString += '</div>';
  domString += '<div class="form-check mb-2">';
  domString += `  <input type="checkbox" class="form-check-input" ${selectedRideId.data.isBroken ? 'checked' : ''} id="ride-broken-status">`;
  domString += '  <label class="form-check-label" for="ride-broken-status">Closed for Maintenance</label>';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" id="ride-modifier-btn" class="btn btn-outline-success mr-1">Update</button>';
  domString += '<button type="submit" id="ride-modifier-close" class="btn btn-outline-danger ml-1">Close</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  utils.printToDom('update-ride-form-container', domString);
};

const rideCardBuilder = (ride) => {
  let domString = '';
  domString += '   <div class="col-lg-4 col-md-6">';
  domString += `     <div id="${ride.id}" class="card text-center my-2 ride-card ${ride.isBroken ? 'bg-danger' : 'bg-info'}">`;
  domString += '       <div class="card-header">';
  domString += `         <h2 class="card-title">${ride.name}</h2>`;
  domString += '       </div>';
  domString += '       <div class="card-body">';
  domString += `         <p class="card-text">${ride.description}</p>`;
  domString += `         <p class="card-text">${ride.isBroken ? 'Ride Status: <strong>Closed for Maintenance</strong>' : 'Ride Status: <strong>Open</strong>'}</p>`;
  domString += '       </div>';
  domString += '       <div class="card-footer">';
  domString += '         <button class="btn card-btn delete-ride-btn mx-1 btn-outline-danger"><i class="fas fa-trash card-icon"></i></button>';
  domString += '         <button class="btn card-btn update-ride-btn mx-1 btn-outline-success"><i class="fas fa-pencil-alt card-icon"></i></button>';
  domString += '         <button class="btn card-btn calendar-ride-btn mx-1 btn-outline-info"><i class="fas fa-calendar-alt"></i></button>';
  domString += '       </div>';
  domString += '     </div>';
  domString += '   </div>';
  return domString;
};

const printRidesDashboard = () => {
  ridesData.getRides()
    .then((rides) => {
      let domString = '';
      domString += '<div class="d-flex flex-wrap">';
      domString += '<div class="col-12 text-center"><h1 class="my-3">[ Rides ]</h1></div>';
      domString += '<div class="col-12 text-center"><button id="new-ride-btn" class="btn dashboard-btn mb-2"><i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += newRideFormBuilder();
      domString += '<div id="single-ride-form-container" class="form-container container-fluid my-3"></div>';
      domString += '<div id="update-ride-form-container" class="col-12 my-3 hide"></div>';
      rides.forEach((ride) => {
        domString += rideCardBuilder(ride);
      });
      domString += '</div>';
      utils.printToDom('rides-dashboard', domString);
    })
    .catch((err) => console.error('could not get rides', err));
};

export default { printRidesDashboard, rideEvents };
