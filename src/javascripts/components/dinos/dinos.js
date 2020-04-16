import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';


const printHungryDino = (dinoName, bool) => {
  let domString = '';
  domString += bool ? `${dinoName} is hungry!` : `${dinoName} is fine.`;
  return domString;
};

const printDinos = (dino) => {
  let domString = '';
  domString += '<div class="card" style="width: 18rem;">';
  domString += `<h3>${dino.name}</h3>`;
  domString += `<img class="card-img-top" src="${dino.photoUrl}" alt="Card image cap">`;
  domString += '<div class="card-body">';
  domString += printHungryDino(`${dino.name}`, dino.isHungry);
  domString += '</div>';
  domString += '</div>';

  utils.printToDom('dino-dashboard', domString);
};

const printDinosDashboard = () => {
  dinoData.getDinos()
    .then((dinos) => dinos.forEach((dino) => printDinos(dino)))
    .catch((err) => console.error('printDinosDashboard broke', err));
};

export default { printDinosDashboard };
