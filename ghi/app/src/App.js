import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListSalespeople from './ListSalespeople';
import SalespersonForm from './SalespersonForm';
import ListCustomers from './ListCustomers';
import CustomerForm from './CustomerForm';
import ListSales from './ListSales';
import SaleForm from './SaleForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople" element={<ListSalespeople />} />
          <Route path="salespeople/new" element={<SalespersonForm />} />
          <Route path="customers" element={<ListCustomers />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="sales" element={<ListSales />} />
          <Route path="sales/new" element={<SaleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
