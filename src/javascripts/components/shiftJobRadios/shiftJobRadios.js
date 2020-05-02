import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';

const buildShiftJobRadios = (shiftId, staffId) => {
  smash.findOutWhichJobsOnShiftAreNotAssigned(shiftId).then((shiftJobs) => {
    let domString = '';
    domString += '<div>';
    domString += '  <div class="d-flex flex-row justify-content-between align-items-center card-header text-center">';
    domString += '  <h2>Schedule Staff Member</h2>';
    domString += '</div>';
    domString += '<div class="card-body">';
    domString += `  <form class="m-2 pick-job-form" data-shift-id=${shiftId}>`;
    shiftJobs.forEach((job, i) => {
      if (job.jobIsAssigned === false) {
        if (Object.prototype.hasOwnProperty.call(job, 'isWorkable')) {
          if (job.isWorkable === true) {
            domString += '  <div class="custom-control custom-radio">';
            domString += `    <input type="radio" id="jobRadio-${i + 1}" name="jobRadio" class="custom-control-input" value="${job.id}">`;
            domString += `    <label class="custom-control-label" for="jobRadio-${i + 1}">${job.name}: ${job.jobDuty.name}</label>`;
            domString += '  </div>';
          }
        } else {
          domString += '  <div class="custom-control custom-radio">';
          domString += `    <input type="radio" id="jobRadio-${i + 1}" name="jobRadio" class="custom-control-input" value="${job.id}">`;
          domString += `    <label class="custom-control-label" for="jobRadio-${i + 1}">${job.name}: ${job.jobDuty.name}</label>`;
          domString += '  </div>';
        }
      }
    });
    domString += '  </form>';
    domString += '</div>';
    domString += '<div class="m-2 card-footer text-center">';
    domString += `  <button data-staff-id="${staffId}" type="button" class="btn btn-outline-success" id="submit-staff-job">Schedule Job</button>`;
    domString += '</div>';
    utils.printToDom('job-modal-body', domString);
    $('#schedule-staff-modal').modal('show');
  })
    .catch((err) => console.error('There is a problem getting jobs by shiftId for the radio buttons:', err));
};

export default { buildShiftJobRadios };
