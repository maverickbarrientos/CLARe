import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard';
import { Reservations } from './pages/Reservations';
import { ComputerLab } from './pages/ComputerLab';
import { Sidebar } from './components/Sidebar';
import './App.css'
import { Users } from './pages/users/Users';
import { ViewUser } from './pages/users/ViewUser';
import { NewUser } from './pages/users/NewUser';
import {UpdateUser} from './pages/users/UpdateUser'

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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
  )
}

export default App
