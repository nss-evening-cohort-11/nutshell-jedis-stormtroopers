import vendorsData from '../../helpers/data/vendorsData';

const buildVendorOverview = () => {
  vendorsData.getVendors().then((vendors) => {
    vendors.forEach((vendor) => {
      let domString = '';
      if (vendor.isOpen !== true) {
        // vendor closed
        domString += '<div id="closed-vendor-container">';
        domString += `<p id="${vendor.id}">${vendor.name} is closed!</p>`;
        domString += '</div>';
        console.log('vendor overview', vendor.name);
      }
      return domString;
    });
  });
};

export default { buildVendorOverview };
