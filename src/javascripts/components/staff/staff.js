import utils from '../../helpers/utils';

const printStaffDashboard = () => {
  let domString = '';
  domString += '<div class="d-flex flex-wrap justify-content-center">';
  domString += '  <div class="col-12 text-center">';
  domString += '    <div class="col-lg-3 col-md-6">';
  domString += '      <div class="card text-center">';
  domString += '        <div class="card-body">';
  domString += '          <h2>Staff</h2>';
  domString += '        </div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '</div>';
  utils.printToDom('staff-dashboard', domString);
};

export default { printStaffDashboard };
