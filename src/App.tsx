

import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import EditProfilePage from './pages/profilePages/EditProfilePage'
import ChangePasswordPage from './pages/profilePages/ChangePasswordPage'
import DocumentTitle from './components/DocumentTitle'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import Home from './pages/sidebarPages/Home'
import Projects from './pages/sidebarPages/Projects'
import Tasks from './pages/sidebarPages/Tasks'
import Team from './pages/sidebarPages/Team'
import Report from './pages/sidebarPages/Report'
import AllWork from './pages/sidebarPages/AllWork'
import { NotificationProvider } from './components/NotificationContext'





const App = () => {
  const [sidebarOpen, setSidebarOpen]= useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  
  return (
  <NotificationProvider>
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark bg-zinc-800' : 'bg-white'}`}>
      <Sidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)} darkMode={darkMode} />
      <div className='flex-1 flex flex-col overflow-hidden pt-16'>
       <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
               darkMode={darkMode}
               setDarkMode={setDarkMode}/>
       
         <DocumentTitle  />
   
         <Routes>
            <Route path='/home' element={<Home darkMode={darkMode} />} />            
            <Route path='/projects' element={<Projects darkMode={darkMode} />} />
            <Route path='/tasks' element={<Tasks  darkMode={darkMode}/>} />            
            <Route path='/team' element={<Team darkMode={darkMode}/>} /> 
            <Route path='/all-work' element={<AllWork darkMode={darkMode}/>} />
            <Route path='/report' element={<Report darkMode={darkMode}/>} />          
            <Route path='/profile/edit-profile' element={<EditProfilePage darkMode={darkMode}/>} />
            <Route path='/profile/change-password' element={<ChangePasswordPage darkMode={darkMode}/>} />
           
         </Routes>
      </div>  
    </div>
  </NotificationProvider>
  )
}

export default App;