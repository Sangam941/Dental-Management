import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import { useAuthStore } from './store/authStore';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Doctors from './pages/public/Doctors';
import Services from './pages/public/Services';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AddDoctor from './pages/admin/doctors/AddDoctor';
import ManageDoctors from './pages/admin/doctors/ManageDoctors';
import Patients from './pages/admin/patients/Patients';
import AddPatient from './pages/admin/patients/AddPatient';
import Inventory from './pages/admin/inventory/Inventory';
import Appointments from './pages/admin/appointments/Appointments';
import AddAppointment from './pages/admin/appointments/AddAppointment';
import AddItem from './pages/admin/inventory/AddItem';
import Login from './pages/auth/Login';
import AdminLayout from './layouts/AdminLayout';
import Departments from './pages/admin/departments/Departments';

const ProtectedAdminRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/admin/login",
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
    element: <ProtectedAdminRoute />,
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
      { path: "doctors", element: <Doctors /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
