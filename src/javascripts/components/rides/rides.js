import utils from '../../helpers/utils';
import ridesData from '../../helpers/data/ridesData';

const showNewRideForm = () => {
  console.error('add button works');
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
      rides.forEach((ride) => {
        domString += rideCardBuilder(ride);
      });
      domString += '</div>';
      utils.printToDom('rides-dashboard', domString);
    })
    .catch((err) => console.error('could not get rides', err));
};

export default { printRidesDashboard, rideEvents };
