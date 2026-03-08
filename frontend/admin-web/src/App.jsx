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
import { ChooseLab } from './pages/computer_labs/ChooseLab';
import { ViewLab } from './pages/computer_labs/ViewLab';

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
              <Route path="/choose_lab" element={<ChooseLab />} />
              <Route path="/view_lab/:lab_id" element={<ViewLab />}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
  )
}

export default App
