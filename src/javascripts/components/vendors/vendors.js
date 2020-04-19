import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';
import vendorsData from '../../helpers/data/vendorsData';


// ---  EVENT FUNCTIONS  --- //

const deleteVendorEvent = (e) => {
  const vendorId = e.target.closest('.card').id;

  vendorsData.deleteVendor(vendorId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printVendorsDashboard();
    })
    .catch((err) => console.error('problem with delete vendor event', err));
};

const newVendorEvent = (e) => {
  e.preventDefault();
  const newVendorName = $('#new-vendor-name').val();
  const newVendorDescription = $('#new-vendor-description').val();
  const myUid = firebase.auth().currentUser.uid;


  const newVendor = {
    name: newVendorName,
    description: newVendorDescription,
    isOpen: true,
    uid: myUid,
  };

  vendorsData.addVendor(newVendor)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printVendorsDashboard();
    })
    .catch((err) => console.error('problem with add vendor in new vendor event', err));
};

const updateVendorEvent = (e) => {
  e.preventDefault();
  const updatedVendorId = e.target.closest('.update-vendor-form-tag').id;
  const updatedVendorName = $('#edit-vendor-name').val();
  const updatedVendorDescription = $('#edit-vendor-description').val();
  const isOpenCheckBox = $('#vendor-open-checkbox').is(':checked');
  const myUid = firebase.auth().currentUser.uid;

  const updatedVendor = {
    name: updatedVendorName,
    description: updatedVendorDescription,
    isOpen: isOpenCheckBox,
    uid: myUid,
  };

  vendorsData.updateVendor(updatedVendorId, updatedVendor)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printVendorsDashboard();
    })
    .catch((err) => console.error('problem with update vendor in update vendor event', err));
};

const newVendorFormEvent = () => {
  $('#new-vendor-form-containter').removeClass('hide');
  $('#update-vendor-form-containter').addClass('hide');

  // eslint-disable-next-line no-use-before-define
  newVendorForm();
};

const updateVendorFormEvent = (e) => {
  $('#new-vendor-form-containter').addClass('hide');
  $('#update-vendor-form-containter').removeClass('hide');

  const vendorId = e.target.closest('.card').id;

  // eslint-disable-next-line no-use-before-define
  updateVendorForm(vendorId);
};

// ---  DOMSTRING FUNCTIONS  --- //

const newVendorForm = () => {
  let domString = '';

  domString += '<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4 new-vendor-form-tag">';
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="new-vendor-name">Vendor Name</label>';
  domString += '    <input type="text" class="form-control mb-3" id="new-vendor-name" placeholder="Enter your vendor name">';
  domString += '    <label class="font-weight-bold" for="new-vendor-description">Vendor Description</label>';
  domString += '    <textarea type="text" class="form-control mb-3" id="new-vendor-description" placeholder="Enter your vendor description"></textarea>';
  domString += '    <button type="submit" class="btn btn-danger float-right" id="vendor-creator-btn">Add Vendor</button>';
  domString += '  </div>';
  domString += '</form>';

  utils.printToDom('new-vendor-form-containter', domString);
};

const updateVendorForm = (vendorId) => {
  vendorsData.getSingleVendorByVendorId(vendorId)
    .then((vendor) => {
      let domString = '';

      domString += `<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4 update-vendor-form-tag" id=${vendorId}>`;
      domString += '  <div class="form-group">';
      domString += '    <label class="font-weight-bold" for="edit-vendor-name">Edit Vendor Name</label>';
      domString += `    <input type="text" class="form-control mb-3" id="edit-vendor-name" placeholder="Edit  your vendor name" value="${vendor.name}">`;
      domString += '    <label class="font-weight-bold" for="edit-vendor-description">Edit Vendor Description</label>';
      domString += `    <textarea type="text" class="form-control mb-3" id="edit-vendor-description" placeholder="Edit your vendor description">${vendor.description}</textarea>`;
      domString += '<div class="custom-control custom-checkbox">';
      domString += '<input type="checkbox" class="custom-control-input" id="vendor-open-checkbox">';
      domString += '<label class="custom-control-label" for="vendor-open-checkbox">Vendor is open</label>';
      domString += '</div>';
      domString += '    <button type="submit" class="btn btn-danger float-right" id="vendor-modifier-btn">Update Vendor</button>';
      domString += '  </div>';
      domString += '</form>';

      utils.printToDom('update-vendor-form-containter', domString);
    })
    .catch((err) => console.error('problem with get single vendor by vendor id in update vendor form', err));
};

const printVendorsDashboard = () => {
  vendorsData.getVendors()
    .then((vendors) => {
      let domString = '';

      domString += '<h2 class="text-light text-center">Vendors</h2>';
      domString += '<div class="d-flex justify-content-center mb-4" id="add-pin-container">';
      domString += '<button class="btn dashboard-btn" id="new-vendor-btn" type="button"><i class="fas fa-plus dashboard-icon"></i></button>';
      domString += '</div>';
      domString += '<div id="new-vendor-form-containter"></div>';
      domString += '<div id="update-vendor-form-containter"></div>';
      domString += '<div id="edit-form-container"></div>';
      domString += '<div class="d-flex flex-wrap ml-2">';

      vendors.forEach((vendor) => {
        domString += `<div class="card col-md-3 m-2 ${vendor.isOpen ? '' : 'bg-danger'}" id="${vendor.id}">`;
        domString += '  <div class="card-body text-center">';
        domString += `    <h5 class="card-title">${vendor.name}</h5>`;
        if (vendor.isOpen === false) {
          domString += '<p class="text-light">Closed</p>';
        }
        domString += `    <p class="card-text">${vendor.description}</p>`;
        domString += '    <button class="btn btn-danger delete-vendor-btn">Delete</button>';
        domString += '    <button class="btn btn-danger update-vendor-btn" type="button" data-toggle="collapse" data-target="#update-vendor-form" aria-expanded="false" aria-controls="updateVendorForm">Edit</button>';
        domString += '  </div>';
        domString += '</div>';
      });

      domString += '</div>';

      utils.printToDom('vendors-dashboard', domString);
    })
    .catch((err) => console.error('problem with get vendors in print vendors', err));
};

export default {
  printVendorsDashboard,
  deleteVendorEvent,
  newVendorEvent,
  updateVendorEvent,
  newVendorFormEvent,
  updateVendorFormEvent,
};
