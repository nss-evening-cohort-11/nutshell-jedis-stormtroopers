import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

const printDinos = (dino) => {
  let domString = '';
  domString += '<div class="card col-4" style="width: 18rem;">';
  domString += `<h3>${dino.name}</h3>`;
  domString += `<img class="card-img-top" src="${dino.photoUrl}" alt="Card image cap">`;
  domString += '<div class="card-body">';
  domString += dino.isHungry ? `${dino.name} is hungry!` : `${dino.name} is fine.`;
  domString += '</div>';
  domString += '</div>';

  return domString;
};

const printDinosDashboard = () => {
  dinoData.getDinos()
    .then((dinos) => {
      let domString = '';
      dinos.forEach((dino) => {
        if (dino) domString += printDinos(dino);
      });
      utils.printToDom('dino-dashboard', domString);
    })
    .catch((err) => console.error('printDinosDashboard broke', err));
};

export default { printDinosDashboard };
