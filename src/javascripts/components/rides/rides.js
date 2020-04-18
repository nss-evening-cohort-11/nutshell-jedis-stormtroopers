import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import ridesData from '../../helpers/data/ridesData';

const showNewRideForm = () => {
  $('#new-ride-form-container').removeClass('hide');
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
    .catch((err) => console.error('could not add dino', err));
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

const rideEvents = () => {
  $('body').on('click', '#new-ride-btn', showNewRideForm);
  $('body').on('click', '.delete-ride-btn', deleteRideEvent);
  $('body').on('click', '#ride-creator-btn', newRideEvent);
};

const newRideFormBuilder = () => {
  let domString = '';
  domString += '<div id="new-ride-form-container" class="col-12 my-3 hide">';
  domString += '<div class="card col-6 offset-3">';
  domString += '<div class="card-header">';
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
  domString += '<button type="submit" id="ride-creator-btn" class="btn btn-primary">Add Ride</button>';
  domString += '</form>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

const rideCardBuilder = (ride) => {
  let domString = '';
  domString += '   <div class="col-lg-4 col-md-6">';
  domString += `     <div id="${ride.id}" class="card text-center my-2 ride-card ${ride.isBroken ? 'bg-danger' : ''}">`;
  domString += '       <div class="card-body">';
  domString += `         <h2>${ride.name}</h2>`;
  domString += `         <p>${ride.description}</p>`;
  domString += `         <p>${ride.isBroken ? 'Ride Status: Closed for Maintenance' : 'Ride Status: Open'}</p>`;
  domString += `         <button class="btn card-btn delete-ride-btn ${ride.isBroken ? 'btn-outline-light' : 'btn-outline-danger'}"><i class="fas fa-trash"></i></button>`;
  domString += '       </div>';
  domString += '     </div>';
  domString += '   </div>';
  return domString;
};

const printRidesDashboard = () => {
  ridesData.getRides()
    .then((rides) => {
      let domString = '';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      domString += '<div class="col-12 text-white text-center"><h2>Rides</h2></div>';
      domString += '<div class="col-12 text-center"><button id="new-ride-btn" class="btn dashboard-btn"><i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += newRideFormBuilder();
      rides.forEach((ride) => {
        domString += rideCardBuilder(ride);
      });
      domString += '</div>';
      utils.printToDom('rides-dashboard', domString);
    })
    .catch((err) => console.error('could not get rides', err));
};

export default { printRidesDashboard, rideEvents };
