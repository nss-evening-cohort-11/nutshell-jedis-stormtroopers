import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';

const getBrokenEquipList = () => {
  equipData.getEquips()
    .then((equipArray) => {
      let domString = '<ul class="overview-list">';
      equipArray.forEach((equipItem) => {
        if (equipItem.isBroken === true) {
          domString += `<li>${equipItem.name}</li>`;
        }
      });
      domString += '</ul>';
      utils.printToDom('equip-overview-container', domString);
    })
    .catch((err) => console.error('problem with getBrokenEquipList', err));
};

export default { getBrokenEquipList };
