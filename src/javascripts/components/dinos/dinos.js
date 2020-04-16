import utils from '../../helpers/utils';

const printHungryDino = (dinoName, bool) => {
  let domString = '';
  domString += bool ? 'dinoName'

const printDinos = (dino) => {
  let domString = '';
  domString += '<div class="card" style="width: 18rem;">';
  domString += `<h3>${dino.name}</h3>`;
  domString += `<img class="card-img-top" src="${dino.photoUrl}" alt="Card image cap">`;
  domString += '<div class="card-body">';
  domString += '<p class="card-text"></p>';
  domString += '</div>';
  domString += '</div>';
}; 
