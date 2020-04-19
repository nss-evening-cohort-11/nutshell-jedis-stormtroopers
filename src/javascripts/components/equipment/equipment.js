import utils from '../../helpers/utils';

const buildEquipment = (equipments) => {
  let domString = '';
  domString += '    <div class="my-2 col-4 text-center">';
  domString += `      <div id="${equipments.id}" class="text-center card ${equipments.isBroken ? ' bg-danger' : ' '}">`;
  domString += `         <img class="card-img-top" src="${equipments.imageUrl}" alt="Card image cap"></img>`;
  domString += '          <div class="card-body">';
  domString += `           <h5 class="card-title">${equipments.name}</h5>`;
  domString += `           <p class="card-text">${equipments.description}</p>`;
  domString += '           <button class="card-text btn btn-danger delete-equipment">Delete</button>';
  domString += '           <button class="card-text btn btn-primary edit-equipment">Edit</button>';
  domString += '           </div>';
  domString += '        </div>';
  domString += '     </div>';
  return domString;
};

const buildEquipmentForm = () => {
  let domString = '';
  domString += '<form class="px-2 py-2 bg-light mb-3 col-12 text-center justify-content-center">';
  domString += '<div class="form-group">';
  domString += '<label for="equipment-name">Name</label>';
  domString += '<input type="text" class="form-control" id="equipment-name" aria-describedby="emailHelp" placeholder="Jeep">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="equipment-description">Description</label>';
  domString += '<input type="text" class="form-control" id="equipment-description" placeholder="A Jeep painted in cool colors">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="equipment-image">Image-Url</label>';
  domString += '<input type="text" class="form-control" id="equipment-image" placeholder="image-Url">';
  domString += '</div>';
  domString += '<button type="submit" id="add-equipment" class="btn btn-primary">Submit</button>';
  domString += '</form>';
  utils.printToDom('equipment-form', domString);
};

const updateEquipmentForm = (equipmentId, selectedEquipmentId) => {
  let domString = '';
  domString += `<form id=${equipmentId} class="px-2 py-2 bg-light mb-3 col-12 text-center justify-content-center">`;
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
  domString += '<button type="submit" id="update-equipment" class="btn btn-primary">Submit</button>';
  domString += '</form>';
  utils.printToDom('equipment-update-form', domString);
};
export default {
  buildEquipment,
  buildEquipmentForm,
  updateEquipmentForm,
};
