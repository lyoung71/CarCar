import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
