import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {

  return (
      <BrowserRouter>
        <div className='flex h-screen'>
          <Sidebar />

          <main className='flex-1 overflow-auto p-8'>
            
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/reservations" element={<Reservations />}/>
              <Route path="/computer_lab" element={<ComputerLab />}/>
              <Route path="/users" element={<Users />}/>
              <Route path="/user/:id" element={<ViewUser />}/>
              <Route path="/new_user" element={<NewUser />} />
              <Route path="/update_user/:id" element={<UpdateUser />}/>
              <Route path="reservation/:reservation_id" element={<ViewReservation />}/>
              <Route path="/new_reservation/:lab_id" element={<NewReservation />} />
              <Route path="/update_reservation/:reservation_id" element={<UpdateReservation />} />
              <Route path="/choose_lab" element={<ChooseLab />} />
              <Route path="/view_lab/:lab_id" element={<ViewLab />}/>
              <Route path="/update_lab/:lab_id" element={<UpdateLab />}/>
              <Route path="/view_class/:class_id" element={<ViewClass />} />
              <Route path="/lab_class" element={<LabClass />} />
              <Route path="/update_class/:class_id" element={<UpdateClass />} />
              <Route path="/create_class/:lab_id" element={<CreateClass />} />
              <Route path="/create_lab" element={<CreateLab />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
  )
}

export default App
