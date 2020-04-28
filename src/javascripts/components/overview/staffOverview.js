import utils from '../../helpers/utils';
import chaosMonkeyData from '../../helpers/data/chaosMonkeyData';
import staffData from '../../helpers/data/staffData';

const getMissingStaffList = () => {
  chaosMonkeyData.getChaosEventsByType('kidnap')
    .then((eventsArray) => {
      let domString = '';
      eventsArray.forEach((event) => {
        domString += '<p>';
        const staffId = event.affectedEntityId;
        console.log('get event/ person id:', event.affectedEntityId);
        staffData.getSingleStaffMemeber(staffId)
          .then((response) => {
            const staffMember = response.data;
            console.log('got staffMember:', staffMember.name);
            domString += `${staffMember.name}`;
            domString += `(presumed dead) - kidnapped/missing ${event.timestamp}</p>`;
            console.log('inside then domstring:', domString);
          });
        console.log('domstring::', domString);
        utils.printToDom('staff-overview-container', domString);
      });
      // console.log('domstring::', domString);
      // utils.printToDom('staff-overview-container', domString);
    })
    .catch((err) => console.error('problem with getMissingStaffList', err));
};

const buildStaffOverview = () => {
  let domString = '';
  domString += '<div id="staff-overview-container" class="text-center">';
  domString += getMissingStaffList();
  domString += '</div>';
  return domString;
};

export default { buildStaffOverview };
