
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
import AdminDashboard from './pages/AdminDashboard';

const router = createBrowserRouter([
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
      { path: "opd-management", element: <DailyOPDManagement /> },
      { path: "opd-management/opd-entry", element: <DailyOPDEntry /> },
      { path: "manage-doctors/add-doctor", element: <AddDoctor /> },
      { path: "manage-doctors", element: <ManageDoctors /> },
      { path: "doctors", element: <Doctors /> }, // Public list
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;