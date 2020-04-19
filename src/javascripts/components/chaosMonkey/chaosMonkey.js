import utils from '../../helpers/utils';

const moment = require('moment');

const randomChaosMonkeyStrike = () => {
  const time = moment().format('MMMM Do YYYY, h:mm:ss a');
  let domString = '';

  domString += '<div class="alert bg-danger alert-dismissible fade show" role="alert">';
  domString += '<strong>Chaos Monkey</strong> at is again!';
  domString += `<span class="float-right">${time}</span>`;
  domString += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
  domString += '  <span aria-hidden="true">&times</span>';
  domString += '</button>';
  domString += '</div>';

  utils.printToDom('chaos-monkey-alert', domString);
};

const unleashChaosMonkey = () => {
  setInterval(randomChaosMonkeyStrike, 10000);
};

export default { unleashChaosMonkey };
