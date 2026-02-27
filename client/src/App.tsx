import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import { useAuthStore } from './store/authStore';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Doctors from './pages/public/Doctors';
import Services from './pages/public/Services';
import AddDoctor from './pages/admin/doctors/AddDoctor';
import ManageDoctors from './pages/admin/doctors/ManageDoctors';
import Patients from './pages/admin/patients/Patients';
import AddPatient from './pages/admin/patients/AddPatient';
import Login from './pages/auth/Login';
import AdminLayout from './layouts/AdminLayout';
import Departments from './pages/admin/departments/Departments';
import Billing from './pages/admin/billing/Billing';

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
      { index: true, element: <Navigate to="/admin/patients" /> },
      { path: "manage-doctors", element: <ManageDoctors /> },
      { path: "manage-doctors/add-doctor", element: <AddDoctor /> },
      { path: "patients", element: <Patients /> },
      { path: "patients/new-patient", element: <AddPatient /> },
      { path: "departments", element: <Departments /> },
      { path: "billings", element: <Billing /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
