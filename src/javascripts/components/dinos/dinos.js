import firebase from 'firebase/app';
import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

const showEditForm = () => {
  $('div#edit-dino-form-container').removeClass('hide');
  $('div#new-dino-form-container').addClass('hide');
};

const newDinoForm = () => {
  let domString = '';
  domString += '<div class="card form-card col-6 offset-3">';
  domString += '<div class="card-header text-center">';
  domString += '<h3>Add a Dino</h3>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<form class="new-dino-form">';
  domString += '<div class="form-group">';
  domString += '<label for="new-dino-name">Name</label>';
  domString += '<input type="text" class="form-control" id="new-dino-name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-dino-image">Image Url</label>';
  domString += '<input type="text" class="form-control" id="new-dino-image">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-dino-type">Type</label>';
  domString += '<input type="text" class="form-control" id="new-dino-type">';
  domString += '</div>';
  domString += '<h5>Is this Dino hungry?</h5>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newDinoRadios" id="newDinoRadios" value="true">';
  domString += '<label class="form-check-label" for="newDinoRadios">Is Hungry</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newDinoRadios" id="newDinoRadios" value="false">';
  domString += '<label class="form-check-label" for="newDinoRadios">Is NOT Hungry</div>';
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" class="btn btn-outline-success" id="submit-new-dino">Add</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';

  utils.printToDom('new-dino-form-container', domString);
};

const showDinoForm = () => {
  $('#new-dino-form-container').removeClass('hide');
  $('#edit-dino-form-container').addClass('hide');

  newDinoForm();
};

const editDinoForm = (dinoId) => {
  showEditForm();
  dinoData.getSingleDino(dinoId)
    .then((response) => {
      const dino = response.data;
      let domString = '';
      domString += '<div class="card form-card col-6 offset-3">';
      domString += '<div class="card-header text-center">';
      domString += '<h2>Edit Dino</h2>';
      domString += '</div>';
      domString += '<div class="card-body">';
      domString += `<form class="edit-dino-form" id=${dinoId}>`;
      domString += '<div class="form-group">';
      domString += '<label for="dino-name">Name</label>';
      domString += `<input type="text" class="form-control" id="edit-dino-name" value=${dino.name}>`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-dino-image">Image Url</label>';
      domString += `<input type="text" class="form-control" id="edit-dino-image" value=${dino.photoUrl}>`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-dino-type">Type</label>';
      domString += `<input type="text" class="form-control" id="edit-dino-type" value=${dino.type}>`;
      domString += '</div>';
      domString += '<h5>Is this Dino hungry?</h5>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editDinoRadios" id="editDinoRadios" value="true">';
      domString += '<label class="form-check-label" for="editDinoRadios">Is Hungry</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editDinoRadios" id="editDinoRadios" value="false">';
      domString += '<label class="form-check-label" for="editDinoRadios">Is NOT Hungry</div>';
      domString += '</div>';
      domString += '<div class="card-footer text-center">';
      domString += '<button type="submit" class="btn btn-outline-success" id="submit-dino-changes">Update</button>';
      domString += '</div>';
      domString += '</form>';
      domString += '</div>';

      utils.printToDom('edit-dino-form-container', domString);
    });
};

const editDinoEvent = (e) => {
  e.preventDefault();
  const dinoId = e.target.closest('.card').id;
  editDinoForm(dinoId);
};

const printDinos = (dino) => {
  let domString = '';
  domString += '<div class="col-lg-4 col-md-6">';
  domString += `<div id="${dino.id}" class="card text-center my-2 bg-info">`;
  domString += '<div class="card-header">';
  domString += `<h2 class="card-title">${dino.name}</h2>`;
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<div>';
  domString += `<img class="card-img-top cards-image" src="${dino.photoUrl}" alt="Card image cap">`;
  domString += '</div>';
  domString += `<p class="card-text mt-3">${dino.isHungry ? `${dino.name} is hungry!` : `${dino.name} is fine.`}</p>`;
  domString += '</div>';
  domString += '<div class="card-footer">';
  domString += '<button class="btn card-btn mx-1 btn-outline-danger delete-dino"><i class="fas fa-trash card-icon"></i></button>';
  domString += '<button class="btn card-btn mx-1 btn-outline-success edit-dino">';
  domString += '<i class="fas fa-pencil-alt card-icon"></i>';
  domString += '</button>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

const printDinosDashboard = () => {
  dinoData.getDinos()
    .then((dinos) => {
      let domString = '';
      domString += '<div class="d-flex flex-wrap">';
      domString += '<div class="col-12 text-center"><h1 class="my-3">[ Dinos ]</h1></div>';
      domString += '<div class="col-12 text-center"><button id="new-dino-btn" class="btn dashboard-btn mb-2">';
      domString += '<i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += '<div id="edit-dino-form-container" class="col-12 my-3 hide">';
      domString += '</div>';
      domString += '<div id="new-dino-form-container" class="col-12 my-3 hide">';
      domString += '</div>';
      dinos.forEach((dino) => {
        if (dino) domString += printDinos(dino);
      });
      domString += '</div>';
      utils.printToDom('dino-dashboard', domString);
    })
    .catch((err) => console.error('printDinosDashboard broke', err));
};

const makeNewDino = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isHungryBool = $("input[name='newDinoRadios']:checked").val();
  const newDino = {
    name: $('#new-dino-name').val(),
    photoUrl: $('#new-dino-image').val(),
    type: $('#new-dino-type').val(),
    isHungry: JSON.parse(isHungryBool),
    uid: myUid,
  };
  dinoData.addDino(newDino).then(() => printDinosDashboard())
    .catch((err) => console.error('makeNewDino broke', err));
};

const modifyDino = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isHungryBool = $("input[name='editDinoRadios']:checked").val();
  const dinoId = $('.edit-dino-form').attr('id');
  const modifiedDino = {
    name: $('#edit-dino-name').val(),
    photoUrl: $('#edit-dino-image').val(),
    type: $('#edit-dino-type').val(),
    isHungry: JSON.parse(isHungryBool),
    uid: myUid,
  };
  utils.printToDom('edit-form-container', '');
  $('#editFormCollapse').removeClass('show');
  dinoData.updateDino(dinoId, modifiedDino)
    .then(() => printDinosDashboard())
    .catch((err) => console.error('Modify Pin Broke', err));
};

const removeDino = (e) => {
  const dinoId = e.target.closest('.card').id;
  dinoData.deleteDino(dinoId).then(() => printDinosDashboard())
    .catch((err) => console.error('could not delete pin', err));
};

const dinoEvents = () => {
  $('body').on('click', '.edit-dino', editDinoEvent);
  $('body').on('click', '#submit-dino-changes', modifyDino);
  $('body').on('click', '.delete-dino', removeDino);
  $('body').on('click', '#new-dino-btn', showDinoForm);
  $('body').on('click', '#submit-new-dino', makeNewDino);
};

export default {
  printDinosDashboard,
  editDinoEvent,
  makeNewDino,
  modifyDino,
  newDinoForm,
  removeDino,
  dinoEvents,
};
