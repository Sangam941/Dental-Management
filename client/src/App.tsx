
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import DailyOPDManagement from './pages/DailyOPDManagement';
import DailyOPDEntry from './pages/DailyOPDEntry';
import AddDoctor from './pages/AddDoctor';
import ManageDoctors from './pages/ManageDoctors';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import AdminDashboard from './pages/AdminDashboard';
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import Departments from './pages/Departments';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "doctors", element: <Doctors /> },
      { path: "services", element: <Services /> },
      { path: "appointment", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "appointment", element: <Appointments /> },
      { path: "appointment/add-appointment", element: <AddAppointment /> },
      { path: "manage-doctors/add-doctor", element: <AddDoctor /> },
      { path: "manage-doctors", element: <ManageDoctors /> },
      { path: "patients", element: <Patients /> },
      { path: "patients/new-patient", element: <AddPatient /> },
      { path: "inventory", element: <Inventory /> },
      { path: "inventory/add-item", element: <AddItem /> },
      { path: "departments", element: <Departments /> },
      { path: "doctors", element: <Doctors /> }, // Public list
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;