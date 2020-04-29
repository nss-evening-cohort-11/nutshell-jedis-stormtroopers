import utils from '../../helpers/utils';
import chaosMonkeyData from '../../helpers/data/chaosMonkeyData';
import staffData from '../../helpers/data/staffData';

const getChaosHistory = () => {
  chaosMonkeyData.getAllChaosEvents()
    .then((eventsArray) => {
      let domString = '';
      eventsArray.forEach((eventItem) => {
        console.log('for each event Item');
        if (eventItem.eventType === 'kidnap') {
          domString += `<p>${eventItem.timestamp} - `;
          const staffId = eventItem.affectedEntityId;
          staffData.getSingleStaffMember(staffId)
            .then((response) => {
              const staffMember = response.data;
              console.log('staff name', staffMember.name);
              domString += `${staffMember.name} was kidnapped</p>`;
            });
        }
        utils.printToDom('chaos-overview-container', domString);
      });
      utils.printToDom('chaos-overview-container', domString);
    })
    .catch((err) => console.error('problem with getBrokenEquipList', err));
};

export default { getChaosHistory };
