import utils from '../../helpers/utils';

const buildEquipment = (equipments) => {
  let domString = '';
  domString += '    <div class="my-2 col-4 text-center">';
  domString += `      <div id="${equipments.id}" class="text-center card ${equipments.isBroken ? ' bg-danger' : 'bg-info'}">`;
  domString += '          <div class="card-header">';
  domString += `           <h2 class="card-title">${equipments.name}</h2>`;
  domString += '          </div>';
  domString += '          <div class="card-body">';
  domString += '           <div>';
  domString += `             <img class="card-img-top cards-image" src="${equipments.imageUrl}" alt="Card image cap"></img>`;
  domString += '           </div>';
  domString += `           <p class="card-text mt-3">${equipments.description}</p>`;
  domString += '           </div>';
  domString += '          <div class="card-footer">';
  domString += '            <button class="btn card-btn mx-1 btn-outline-danger delete-equipment"><i class="fas fa-trash card-icon"></i></button>';
  domString += '            <button class="btn card-btn mx-1 btn-outline-success edit-equipment"><i class="fas fa-pencil-alt card-icon"></i></button>';
  domString += '          </div>';
  domString += '        </div>';
  domString += '     </div>';
  return domString;
};

const buildEquipmentForm = () => {
  let domString = '';
  domString += '<div class="card form-card col-6 offset-3 my-3 justify-content-center">';
  domString += '<form id="new-equipment-form">';
  domString += '<div class="card-header text-center">';
  domString += '<h3>Add Equipment</h3>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<div class="form-group">';
  domString += '<label for="equipment-name">Name</label>';
  domString += '<input type="text" class="form-control" id="equipment-name" aria-describedby="emailHelp" placeholder="Enter equipment name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="equipment-description">Description</label>';
  domString += '<input type="text" class="form-control" id="equipment-description" placeholder="Enter equipment description">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="equipment-image">Image-Url</label>';
  domString += '<input type="text" class="form-control" id="equipment-image" placeholder="Enter equipment imgae Url">';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" id="add-equipment" class="btn btn-outline-success">Add</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  utils.printToDom('equipment-form', domString);
};

const updateEquipmentForm = (equipmentId, selectedEquipmentId) => {
  let domString = '';
  domString += '<div class="card form-card col-6 offset-3 my-3 justify-content-center">';
  domString += `<form id=${equipmentId}>`;
  domString += '<div class="card-header text-center">';
  domString += '<h3>Edit Equipment</h3>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<div class="form-group">';
  domString += '<label for="update-equipment-name">Name</label>';
  domString += `<input type="text" class="form-control" id="update-equipment-name" aria-describedby="emailHelp" value="${selectedEquipmentId.data.name}">`;
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="update-equipment-description">Description</label>';
  domString += `<input type="text" class="form-control" id="update-equipment-description" value="${selectedEquipmentId.data.description}">`;
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="update-equipment-image">Image-Url</label>';
  domString += `<input type="text" class="form-control" id="update-equipment-image" value="${selectedEquipmentId.data.imageUrl}">`;
  domString += '</div>';
  domString += '<div class="form-check mb-2">';
  domString += `  <input type="checkbox" class="form-check-input" ${selectedEquipmentId.data.isBroken ? 'checked' : ''} id="equipment-broken-status">`;
  domString += '  <label class="form-check-label" for="equipment-broken-status">Equipment out of service</label>';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" id="update-equipment" class="btn btn-outline-success">Update</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  utils.printToDom('equipment-update-form', domString);
};
export default {
  buildEquipment,
  buildEquipmentForm,
  updateEquipmentForm,
};
