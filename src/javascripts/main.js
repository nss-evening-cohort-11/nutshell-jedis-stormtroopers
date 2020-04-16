import navbarComponent from './components/navbar/navbar';
import dinosComponent from './components/dinos/dinos';
import staffComponent from './components/staff/staff';
import ridesComponent from './components/rides/rides';
import equipmentComponent from './components/equipment/equipment';
import vendorsComponent from './components/vendors/vendors';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  $('body').on('click', '.nav-icon', navbarComponent.navbarEvents);
  dinosComponent.printDinosDashboard();
  staffComponent.printStaffDashboard();
  ridesComponent.printRidesDashboard();
  equipmentComponent.printEquipmentDashboard();
  vendorsComponent.printVendorsDashboard();
};

init();
