import utils from '../../helpers/utils';

const printOverviewDashboard = () => {
  let domString = '';
  domString += '<div class="container-fluid mt-5">';
  domString += '  <div class="row my-4">';
  domString += '    <div class="col-md-8 my-2">';
  domString += '      <div class="dash-box"><h2>Dinos Overview</h2></div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="dash-box"><h2>Staff Overview</h2></div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '  <div class="row my-4">';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="dash-box"><h2>Rides Overview</h2></div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="dash-box"><h2>Equipment Overview</h2></div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="dash-box"><h2>Vendors Overview</h2></div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '</div>';
  utils.printToDom('overview-dashboard', domString);
};

export default { printOverviewDashboard };
