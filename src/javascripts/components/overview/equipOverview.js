import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';

const getBrokenEquipList = () => {
  equipData.getEquips()
    .then((equipArray) => {
      let domString = '';
      equipArray.forEach((equipItem) => {
        if (equipItem.isBroken === true) {
          domString += `<p>${equipItem.name}</p>`;
          utils.printToDom('equip-overview-container', domString);
        }
      });
    })
    .catch((err) => console.error('problem with getBrokenEquipList', err));
};

export default { getBrokenEquipList };
