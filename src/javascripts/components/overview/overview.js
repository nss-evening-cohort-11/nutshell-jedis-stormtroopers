import utils from '../../helpers/utils';
import staffOverview from './staffOverview';
import vendorsData from '../../helpers/data/vendorsData';

const printOverviewDashboard = () => {
  vendorsData.getVendors().then((vendors) => {
    let domString = '';
    domString += '<div class="container-fluid mt-5">';
    domString += '  <div class="row my-4">';
    domString += '    <div class="col-md-8 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Staff Overview</h2></div>';
    domString += '        <div id="print-unassigned-staff-list-container" class="card-body">';
    domString += '          <h2>Unassigned Staff Members:</h2>';
    domString += '          <ul id="print-unassigned-staff-list">';
    domString += staffOverview.getUnassignedStaff();
    domString += '          </ul>';
    domString += '        </div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Dinos Overview</h2></div>';
    domString += '        <div class="card-body dash-card"></div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '  </div>';
    domString += '  <div class="row my-4">';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Rides Overview</h2></div>';
    domString += '        <div class="card-body dash-card"></div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Equipment Overview</h2></div>';
    domString += '        <div class="card-body dash-card"></div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Vendors Overview</h2></div>';
    domString += '        <div class="card-body dash-card">';
    vendors.forEach((vendor) => {
      if (vendor.isOpen === false) {
        domString += '<div id="closed-vendor-container">';
        domString += `<p id="${vendor.id}">${vendor.name} is closed!</p>`;
        domString += '</div>';
      }
    });
    domString += '        </div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
    utils.printToDom('overview-dashboard', domString);
  });
};

export default { printOverviewDashboard };
