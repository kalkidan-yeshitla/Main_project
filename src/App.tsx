

import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import EditProfilePage from './pages/EditProfilePage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import DocumentTitle from './components/DocumentTitle'


const App = () => {
  const location= useLocation();
  const hideNavbarPaths = ["/profile/edit-profile", "/profile/change-password"];
  return (
    <div className='flex h-screen bg-white overflow-hidden'>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar/>}
      <DocumentTitle />
   
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/profile/edit-profile' element={<EditProfilePage />} />
        <Route path='/profile/change-password' element={<ChangePasswordPage />} />
      </Routes>
    </div>
  )
}

export default App;