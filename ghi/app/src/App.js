import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListSalespeople from './ListSalespeople';
import SalespersonForm from './SalespersonForm';
import ListCustomers from './ListCustomers';
import CustomerForm from './CustomerForm';
import ListSales from './ListSales';
import SaleForm from './SaleForm';
import ListManufacturers from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';
import SalespersonHistory from './SalespersonHistory';
import ListVehicleModels from './ListVehicleModels';
import VehicleModelForm from './VehicleModelForm';
import ListAutomobiles from './ListAutomobiles';
import AutomobileForm from './AutomobileForm';
import AppointmentForm from './AppointmentsForm';
import AppointmentList from './AppointmentsList';
import TechnicianForm from './TechniciansForm';
import TechnicianList from './TechniciansList';
import ServiceHistory from './ServiceHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople" element={<ListSalespeople />} />
          <Route path="salespeople/new" element={<SalespersonForm />} />
          <Route path="salespeople/history" element={<SalespersonHistory />} />
          <Route path="customers" element={<ListCustomers />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="sales" element={<ListSales />} />
          <Route path="sales/new" element={<SaleForm />} />
          <Route path="manufacturers" element={<ListManufacturers />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
          <Route path="models" element={<ListVehicleModels />} />
          <Route path="models/new" element={<VehicleModelForm />} />
          <Route path="automobiles" element={<ListAutomobiles />} />
          <Route path="automobiles/new" element={<AutomobileForm/>} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/new/" element={<AppointmentForm />} />
          <Route path="appointments/history/" element={<ServiceHistory />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="technicians/new/" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
