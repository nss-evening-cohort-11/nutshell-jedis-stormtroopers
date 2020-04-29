import utils from '../../helpers/utils';
import ridesData from '../../helpers/data/ridesData';

const getBrokenRidesList = () => {
  ridesData.getRides()
    .then((ridesArray) => {
      let domString = '';
      ridesArray.forEach((rideItem) => {
        if (rideItem.isBroken === true) {
          domString += `<p>${rideItem.name}</p>`;
          utils.printToDom('rides-overview-container', domString);
        }
      });
    })
    .catch((err) => console.error('problem with getBrokenRidesList', err));
};

export default { getBrokenRidesList };
