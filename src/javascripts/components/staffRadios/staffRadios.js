import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';

const buildStaffRadios = (shiftId, vendorId) => {
  smash.getAllStaffWithJobs().then((staffMembers) => {
    let domString = '';
    domString += '<div>';
    domString += '  <div class="d-flex flex-row justify-content-between align-items-center card-header text-center">';
    domString += '  <h2>Vendor Schedule</h2>';
    domString += '</div>';
    domString += '<div class="card-body">';
    domString += `  <form class="m-2 pick-job-form" data-shift-id=${shiftId}>`;
    staffMembers.forEach((oneMember, i) => {
      const isMemberBusy = oneMember.jobs.some((x) => x.shiftId === shiftId);
      if (!isMemberBusy) {
        domString += '  <div class="custom-control custom-radio">';
        domString += `    <input type="radio" id="staffRadio-${i + 1}" name="staffRadio" class="custom-control-input" value="${oneMember.id}">`;
        domString += `    <label class="custom-control-label" for="staffRadio-${i + 1}">${oneMember.name}</label>`;
        domString += '  </div>';
      }
    });
    domString += '  </form>';
    domString += '</div>';
    domString += '<div class="m-2 card-footer text-center">';
    domString += `  <button data-asset-id="${vendorId}" data-shift-id="${shiftId}" type="button" class="btn btn-outline-success" id="submit-asset-job">Schedule Job</button>`;
    domString += '</div>';
    utils.printToDom('asset-modal-body', domString);
    $('#schedule-asset-modal').modal('show');
  })
    .catch((err) => console.error('There is a problem getting jobs by shiftId for the radio buttons:', err));
};


const buildRideStaffRadios = (shiftId, rideId) => {
  smash.getAllStaffWithJobs().then((staffMembers) => {
    let domString = '';
    domString += '<div>';
    domString += '  <div class="d-flex flex-row justify-content-between align-items-center card-header text-center">';
    domString += '  <h2>Ride Schedule</h2>';
    domString += '</div>';
    domString += '<div class="card-body">';
    domString += `  <form class="m-2 pick-job-form" data-shift-id=${shiftId}>`;
    staffMembers.forEach((oneMember, i) => {
      const isMemberBusy = oneMember.jobs.some((x) => x.shiftId === shiftId);
      if (!isMemberBusy) {
        domString += '  <div class="custom-control custom-radio">';
        domString += `    <input type="radio" id="staffRadio-${i + 1}" name="staffRadio" class="custom-control-input" value="${oneMember.id}">`;
        domString += `    <label class="custom-control-label" for="staffRadio-${i + 1}">${oneMember.name}</label>`;
        domString += '  </div>';
      }
    });
    domString += '  </form>';
    domString += '</div>';
    domString += '<div class="m-2 card-footer text-center">';
    domString += `  <button data-asset-id="${rideId}" data-shift-id="${shiftId}" type="button" class="btn btn-outline-success" id="submit-ride-asset-job">Schedule Job</button>`;
    domString += '</div>';
    utils.printToDom('asset-modal-body', domString);
    $('#schedule-asset-modal').modal('show');
  })
    .catch((err) => console.error('There is a problem getting jobs by shiftId for the radio buttons:', err));
};

export default { buildStaffRadios, buildRideStaffRadios };
