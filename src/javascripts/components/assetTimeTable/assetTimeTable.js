import moment from 'moment';
import './assetTimeTable.scss';

const assetTimeTableBuilder = (finalSchedule) => {
  const amShifts = [];
  const pmShifts = [];
  finalSchedule.forEach((schedule) => {
    schedule.jobShift.forEach((shift) => {
      shift.forEach((thisShift) => {
        console.log(thisShift);
        if (thisShift.workHours === 'AM') {
          amShifts.push(thisShift);
        } else if (thisShift.workHours === 'PM') {
          pmShifts.push(thisShift);
        }
      });
    });
  });
  const sortedamShifts = amShifts.sort((a, b) => moment().day(a.dayName) - moment().day(b.dayName));
  const sortedpmShifts = pmShifts.sort((a, b) => moment().day(a.dayName) - moment().day(b.dayName));
  finalSchedule.sort((a, b) => a.dayName - b.dayName);
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
  sortedamShifts.forEach((shift) => {
    domString += `<td id="${shift.id}" class="shift-cell">`;
    if (finalSchedule.assignedStaff.length === 0) {
      domString += '';
    } else {
      finalSchedule.assignedStaff.forEach((staff) => {
        const thisStaff = { ...staff };
        domString += `<p class="m-0">${thisStaff.name}:</p>`;
      });
    }
    domString += '</td>';
  });
  domString += '        </tr>';
  domString += '        <tr>';
  domString += '            <th scope="row">PM</th>';
  sortedpmShifts.forEach((shift) => {
    domString += `          <td id="${shift.id}" class="shift-cell">`;
    if (finalSchedule.assignedStaff === undefined) {
      domString += '';
    } else {
      domString += `<p class="m-0">${finalSchedule.assignedStaff.name}:</p>`;
    }
    domString += '</td>';
  });
  domString += '</tr>';
  domString += '</tbody>';
  domString += '</table>';
  return domString;
};


export default { assetTimeTableBuilder };
