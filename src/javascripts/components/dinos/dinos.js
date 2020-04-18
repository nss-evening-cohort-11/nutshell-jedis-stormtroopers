import firebase from 'firebase/app';
import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

const newDinoForm = () => {
  let domString = '';
  domString += '<h2 class="text-center">New Dino</h2>';
  domString += '<form class="col-10 offset-1 new-dino-form">';
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
  domString += '<div class="form-check">';
  domString += '<h5>Is this Dino hungry?</h5>';
  domString += '<input class="form-check-input" type="radio" name="newDinoRadios" id="newDinoRadios" value="true">';
  domString += '<label class="form-check-label" for="newDinoRadios">Is Hungry</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newDinoRadios" id="newDinoRadios" value="false">';
  domString += '<label class="form-check-label" for="newDinoRadios">Is NOT Hungry</div>';
  domString += '<button type="submit" class="btn btn-dark" id="submit-new-dino">Add Dino</button>';
  domString += '</form>';

  utils.printToDom('new-form-container', domString);
};

const editDinoForm = (dinoId) => {
  console.error(dinoId, 'dinoId top of editDino');
  dinoData.getSingleDino(dinoId)
    .then((response) => {
      const dino = response.data;
      console.error(dino, 'dino in editDinoForm');
      let domString = '';
      domString += '<h2 class="text-center">Edit Dino</h2>';
      domString += `<form class="col-10 offset-1 edit-dino-form" id=${dinoId}>`;
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
      domString += '<div class="form-check">';
      domString += '<h5>Is this Dino hungry?</h5>';
      domString += '<input class="form-check-input" type="radio" name="editDinoRadios" id="editDinoRadios" value="true">';
      domString += '<label class="form-check-label" for="editDinoRadios">Is Hungry</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editDinoRadios" id="editDinoRadios" value="false">';
      domString += '<label class="form-check-label" for="editDinoRadios">Is NOT Hungry</div>';
      domString += '<button type="submit" class="btn btn-dark" id="submit-dino-changes">Submit Changes</button>';
      domString += '</form>';
      utils.printToDom('edit-form-container', domString);
    });
};

const editDinoEvent = (e) => {
  e.preventDefault();
  const dinoId = e.target.closest('.card').id;
  console.error(dinoId, 'editDinoEvent dinoId');
  editDinoForm(dinoId);
};

const printDinos = (dino) => {
  let domString = '';
  domString += `<div id=${dino.id} class="card col-4" style="width: 18rem;">`;
  domString += `<h3>${dino.name}</h3>`;
  domString += `<img class="card-img-top" src="${dino.photoUrl}" alt="Card image cap">`;
  domString += '<div class="card-body">';
  domString += dino.isHungry ? `${dino.name} is hungry!` : `${dino.name} is fine.`;
  domString += '<button class="btn btn-danger delete-dino d-flex justify-content-center">X</button>';
  domString += '<button class="btn btn-success edit-dino" data-toggle="collapse" data-target="#editFormCollapse" type="button" aria-expanded="false" aria-controls="editFormCollapse">';
  domString += 'Edit Dino';
  domString += '</button>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

const printDinosDashboard = () => {
  dinoData.getDinos()
    .then((dinos) => {
      let domString = '';
      domString += '<h2 class="text-light">Dinos</h2>';
      domString += '<button id="new-dino-btn" class="btn dashboard-btn" data-toggle="collapse" href="#newFormCollapse" type="button" aria-expanded="false" aria-controls="newFormCollapse">';
      domString += '<i class="fas fa-plus dashboard-icon"></i></button>';
      domString += '<div class="col-12 d-flex flex-wrap justify-content-around">';
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
    isHungry: isHungryBool,
    uid: myUid,
  };
  console.error(newDino, 'newDino makeNewDino');
  $('#newFormCollapse').removeClass('show');
  dinoData.addDino(newDino).then(() => printDinosDashboard())
    .catch((err) => console.error('makeNewDino broke', err));
};

const modifyDino = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isHungryBool = $("input[name='editDinoRadios']:checked").val();
  const dinoId = e.target.closest('.edit-dino-form').id;
  console.error(dinoId, 'dinoId modify dino');
  const modifiedDino = {
    name: $('#edit-dino-name').val(),
    photoUrl: $('#edit-dino-image').val(),
    type: $('#edit-dino-type').val(),
    isHungry: isHungryBool,
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

export default {
  printDinosDashboard,
  editDinoEvent,
  makeNewDino,
  modifyDino,
  newDinoForm,
  removeDino,
};
