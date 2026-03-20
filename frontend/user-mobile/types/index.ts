export interface Reservation {
  id: number
  user_id: number
  lab_id: number
  email: string
  full_name: string
  reservation_description: string
  status: string
  start_date: string
  end_date: string
}

export interface ReservationWithComputerLab {
  id: number
  user_id: number
  lab_id: number
  email: string
  full_name: string
  department: string
  reservation_description: string
  status: string
  start_date: string
  end_date: string
  reject_reason: string
  computer_labs: {
    id: number
    lab_name: string
    location: string
    capacity: string
  }
  user: User
  qr_codes: QRCode
}

export interface QRCode {
  id: number
  reservation_id: number
  qr_value: string
  image_url: string
  issue_date: string
  expiry_date: string
  status: string
}

export interface User {
  id: number
  email: string
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
  users_information: UsersInformation
}

export interface UsersInformation {
  department: string, 
  first_name: string, 
  id: 10, 
  last_name: string, 
  user_id: number
}

export interface ComputerLab {
  id: number
  lab_name: string
  location: string
  capacity: string
  reservations: Reservation[]
  todayReservation?: Reservation | null
}

export interface LabClass {
    id: number
    section: string
    teacher: string
    subject: string
    department: string
    day: string
    start_time: string
    end_time: string
    computer_labs: {
        id: number
        lab_name: string
        capacity: string
        location: string
    }
}