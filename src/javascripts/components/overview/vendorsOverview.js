import utils from '../../helpers/utils';
import vendorsData from '../../helpers/data/vendorsData';

const getClosedVendorsList = () => {
  vendorsData.getVendors()
    .then((vendorsArray) => {
      let domString = '';
      vendorsArray.forEach((vendorItem) => {
        if (vendorItem.isOpen === false) {
          domString += `<p>${vendorItem.name}</p>`;
          utils.printToDom('vendors-overview-container', domString);
        }
      });
    })
    .catch((err) => console.error('problem with getClosedVendorsList', err));
};

export default { getClosedVendorsList };
