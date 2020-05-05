import moment from 'moment';
import './assetTimeTableBuilder.scss';

const timeTableBuilder = (schedule) => {
  const amShifts = schedule.filter((x) => x.workHours === 'AM').sort((a, b) => moment().day(a.dayName) - moment().day(b.dayName));
  const pmShifts = schedule.filter((x) => x.workHours === 'PM').sort((a, b) => moment().day(a.dayName) - moment().day(b.dayName));
  schedule.sort((a, b) => a.dayName - b.dayName);
  let domString = '';
  domString += '<table class="col-12 table table-bordered table-hover table-sm">';
  domString += '    <thead class="thead-light text-center">';
  domString += '        <tr>';
  domString += '            <th scope="col">Shift</th>';
  domString += '            <th scope="col">Sunday</th>';
  domString += '            <th scope="col">Monday</th>';
  domString += '            <th scope="col">Tuesday</th>';
  domString += '            <th scope="col">Wednesday</th>';
  domString += '            <th scope="col">Thursday</th>';
  domString += '            <th scope="col">Friday</th>';
  domString += '            <th scope="col">Saturday</th>';
  domString += '        <tr>';
  domString += '    <thead>';
  domString += '    <tbody class="text-center">';
  domString += '        <tr>';
  domString += '            <th scope="row">AM</th>';
  amShifts.forEach((shift) => {
    domString += `<td id="${shift.id}" class="vendor-shift-cell">`;
    if (shift.thisAssetJobs[0].assignment === undefined) {
      domString += '';
    } else {
      shift.thisAssetJobs.forEach((job) => {
        const thisJob = { ...job };
        domString += `<p class="m-0">${thisJob.assignment.staffMember.name}</p>`;
      });
    }
    domString += '</td>';
  });
  domString += '        </tr>';
  domString += '        <tr>';
  domString += '            <th scope="row">PM</th>';
  pmShifts.forEach((shift) => {
    domString += `          <td id="${shift.id}" class="vendor-shift-cell">`;
    if (shift.thisAssetJobs[0].assignment === undefined) {
      domString += '';
    } else {
      shift.thisAssetJobs.forEach((job) => {
        const thisJob = { ...job };
        domString += `<p class="m-0">${thisJob.assignment.staffMember.name}</p>`;
      });
    }
    domString += '</td>';
  });
  domString += '</tr>';
  domString += '</tbody>';
  domString += '</table>';
  return domString;
};

export default { timeTableBuilder };
