import utils from '../../helpers/utils';
import vendorsData from '../../helpers/data/vendorsData';

const deleteVendorEvent = (e) => {
  const vendorId = e.target.closest('.card').id;

  vendorsData.deleteVendor(vendorId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printVendorsDashboard();
    })
    .catch((err) => console.error('problem with delete vendor event', err));
};

const printVendorsDashboard = () => {
  vendorsData.getVendors()
    .then((vendors) => {
      let domString = '';

      domString += '<h2 class="text-light text-center">Vendors</h2>';
      domString += '<div class="d-flex flex-wrap">';

      vendors.forEach((vendor) => {
        domString += `<div class="card col-md-3 m-1" id="${vendor.id}">`;
        domString += '  <div class="card-body text-center">';
        domString += `    <h5 class="card-title">${vendor.name}</h5>`;
        if (vendor.isOpen === false) {
          domString += '<p class="text-danger">Closed</p>';
        }
        domString += `    <p class="card-text">${vendor.description}</p>`;
        domString += '    <button href="#" class="btn btn-danger delete-vendor-btn">Delete</button>';
        domString += '  </div>';
        domString += '</div>';
      });

      domString += '    </div>';
      domString += '    </div>';

      utils.printToDom('vendors-dashboard', domString);
    })
    .catch((err) => console.error('problem with get vendors in print vendors', err));
};

export default { printVendorsDashboard, deleteVendorEvent };
