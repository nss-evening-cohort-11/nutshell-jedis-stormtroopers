import utils from '../../helpers/utils';
import vendorsData from '../../helpers/data/vendorsData';

const getClosedVendorsList = () => {
  vendorsData.getVendors()
    .then((vendorsArray) => {
      let domString = '<ul class="overview-list">';
      vendorsArray.forEach((vendorItem) => {
        if (vendorItem.isOpen === false) {
          domString += `<li>${vendorItem.name}</li>`;
        }
      });
      domString += '</ul>';
      utils.printToDom('vendors-overview-container', domString);
    })
    .catch((err) => console.error('problem with getClosedVendorsList', err));
};

export default { getClosedVendorsList };
