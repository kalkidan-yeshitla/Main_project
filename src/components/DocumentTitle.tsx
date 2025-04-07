import  { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> ={
    '/': 'Home',
    '/profile': 'Profile',
    '/profile/edit-profile': 'Edit Profile',
    '/profile/change-password': 'Change Password',

};

const DocumentTitle = () => {
  const location= useLocation();

  useEffect(()=> {
    const baseTitle = "";
    const routeTitle = pageTitles[location.pathname] || 'Page';
    document.title = `${routeTitle} | ${baseTitle}`;
  }, [location.pathname]);
  return null;
   
}

export default DocumentTitle