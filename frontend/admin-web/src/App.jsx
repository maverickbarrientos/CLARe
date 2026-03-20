import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Reservations } from './pages/reservations/Reservations';
import { ComputerLab } from './pages/ComputerLab';
import { Sidebar } from './components/Sidebar';
import './App.css'
import { Users } from './pages/users/Users';
import { ViewUser } from './pages/users/ViewUser';
import { NewUser } from './pages/users/NewUser';
import {UpdateUser} from './pages/users/UpdateUser';
import { ViewReservation } from './pages/reservations/ViewReservation';
import { NewReservation } from './pages/reservations/NewReservation';
import { CreateLab } from './pages/computer_labs/CreateLab';
import { ChooseLab } from './pages/computer_labs/ChooseLab';
import { ViewLab } from './pages/computer_labs/ViewLab';
import { UpdateLab } from './pages/computer_labs/UpdateLab';
import { LabClass } from './pages/lab_class/LabClass';
import { CreateClass } from './pages/lab_class/CreateClass';
import { UpdateClass } from './pages/lab_class/UpdateClass';
import { ViewClass } from './pages/lab_class/ViewClass';
import { UpdateReservation } from './pages/reservations/UpdateReservation';
import { Login } from './pages/Login';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      { element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/reservations", element: <Reservations /> },
          { path: "/computer_lab", element: <ComputerLab /> },
          { path: "/users", element: <Users /> },
          { path: "/user/:id", element: <ViewUser /> },
          { path: "/new_user", element: <NewUser /> },
          { path: "/update_user/:id", element: <UpdateUser /> },
          { path: "/reservation/:reservation_id", element: <ViewReservation /> },
          { path: "/new_reservation/:lab_id", element: <NewReservation /> },
          { path: "/update_reservation/:reservation_id", element: <UpdateReservation /> },
          { path: "/choose_lab", element: <ChooseLab /> },
          { path: "/view_lab/:lab_id", element: <ViewLab /> },
          { path: "/update_lab/:lab_id", element: <UpdateLab /> },
          { path: "/view_class/:class_id", element: <ViewClass /> },
          { path: "/lab_class", element: <LabClass /> },
          { path: "/update_class/:class_id", element: <UpdateClass /> },
          { path: "/create_class/:lab_id", element: <CreateClass /> },
          { path: "/create_lab", element: <CreateLab /> },
        ]
      }
    ]
  }
])
function App() {
    return <RouterProvider router={router} />
}

export default App
