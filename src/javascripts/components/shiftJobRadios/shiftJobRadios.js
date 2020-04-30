import utils from '../../helpers/utils';
import jobTypeData from '../../helpers/data/jobTypeData';

const buildShiftJobRadios = (shiftId) => {
  jobTypeData.getJobTypesByShiftId(shiftId)
    .then((jobTypes) => {
      console.error(jobTypes);
      let domString = '';
      domString += '<div>';
      domString += '<div class="d-flex flex-row justify-content-between align-items-center card-header text-center">';
      domString += '<h2>Schedule Staff Member</h2>';
      domString += '</div>';
      domString += '<div class="card-body">';
      domString += `<form class="pick-job-form" data-staff-id=${shiftId}>`;
      jobTypes.forEach((job, i) => {
        domString += '<div class="custom-control custom-radio">';
        domString += `  <input type="radio" id="jobRadio-${i + 1}" name="jobRadio" class="custom-control-input" value="${job.id}">`;
        domString += `  <label class="custom-control-label" for="jobRadio-${i + 1}">${job.name}</label>`;
        domString += '</div>';
      });
      domString += '<div class="card-footer text-center">';
      domString += '<button type="button" class="btn btn-outline-success" id="submit-staff-job">Schedule Job</button>';
      domString += '</div>';
      domString += '</form>';
      domString += '</div>';
      utils.printToDom('job-modal-body', domString);
      $('#schedule-staff-modal').modal('show');
    })
    .catch((err) => console.error('There is a problem getting jobs by shiftId for the radio buttons:', err));
};

export default { buildShiftJobRadios };
