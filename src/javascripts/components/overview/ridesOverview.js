import utils from '../../helpers/utils';
import ridesData from '../../helpers/data/ridesData';

const getBrokenRidesList = () => {
  ridesData.getRides()
    .then((ridesArray) => {
      let domString = '<ul class="overview-list">';
      ridesArray.forEach((rideItem) => {
        if (rideItem.isBroken === true) {
          domString += `<li>${rideItem.name}</li>`;
        }
      });
      domString += '</ul>';
      utils.printToDom('rides-overview-container', domString);
    })
    .catch((err) => console.error('problem with getBrokenRidesList', err));
};

export default { getBrokenRidesList };
