import { useState, useRef, useEffect } from "react";
import {  LogOut, Settings, ChevronRight, User, Lock, UserRound, Bell, Menu, Search, Sun, Moon, Check } from "lucide-react";
import { useNavigate  } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotifications } from "./NotificationContext";


type NavbarProps={
  onToggleSidebar: () => void;
  darkMode:boolean;
  setDarkMode:(mode: boolean) => void;
};



const Navbar = ({onToggleSidebar,darkMode, setDarkMode}: NavbarProps) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [ showManageOptions, setShowManageOptions]= useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSearchFocused, setIsSearchFocused]= useState(false);
  const [searchQuery, setSearchQuery]= useState("");
  
  const {
    notifications,
    unreadCount,
    markAsRead,
    clearAll
  } = useNotifications();
  const [notificationOpen, setNotificationOpen]= useState(false)

  const handleSearch=(e: React.FormEvent)=>{
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setShowManageOptions(false);
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  

  return (
    
    <nav className={`absolute top-0 left-0 w-full h-16 flex items-center px-6 bg-opacity-50 backdrop-blur-md 
             shadow-md z-50 border-b ${darkMode ? "bg-zink-800 border-gray-700" : "bg-white border-gray-100"}`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center ">
        {/*menu button */}
        <motion.button
           whileHover={{scale:1.1}}
           whileTap={{scale:0.9}}
           onClick={onToggleSidebar}
           className={`fixed left-3 p-2 rounded-full transition-colors ${darkMode ? "hover:bg-zinc-700" : "hover:bg-purple-200"}`}>
           <Menu size={24} className={darkMode ? "text-gray-200" : "text-purple-900"}  />
        </motion.button>

        <img 
           src="cbelogo.png"
           className="fixed left-16 hidden sm:block "
           style={{
             width: '170px',
             height: '60px'
           }}  
           />

        <div className="fixed right-40 md:right-40 flex items-center">
          <form onSubmit={handleSearch} className="relative">
            
              <Search size={18} className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none
                    ${darkMode? "text-gray-300" : "text-purple-900"} ${isSearchFocused ? "right-3" : ""}`}/>
              <input
                type="text"
                placeholder="search..."
                className={`w-40 pl-4 pr-10 py-1  rounded-full border border-transparent focus:shadow-sm focus:outline-none transition-all duration-200 md:right-40 
                 ${darkMode ? "bg-zinc-700 text-white focus:border-gray-500 focus:bg-zinc-700" : "bg-gray-100 focus:border-purple-900 focus:bg-white"} 
                 ${isSearchFocused ? "md:w-56 scale-105": ""}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}/>
           
          </form>
        </div>   
        {/* Dark mode Toggle*/}
        <button 
             className={`p-2 rounded-full fixed  right-28 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-purple-200"} `} 
             onClick={()=> setDarkMode(!darkMode)}>
              {darkMode ?(
                <Sun  size={20}/>
              ) : (
                <Moon className="text-purple-900" size={20}/>
              )}
              
          </button>

          {/* Notification button*/}
          <div className="relative" ref={dropdownRef}>
           <button 
             className={`p-2 rounded-full fixed top-2.5 mt-1 right-16 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-purple-200"} `}
             onClick={()=>setNotificationOpen(!notificationOpen)}>
              <Bell className={darkMode ? "text-gray-300":"text-purple-900"} size={20}/>
               {unreadCount > 0 && (
                <span className={`absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-xs
                  ${darkMode ? "bg-red-500 text-white" : "bg-red-500 text-white"}`}>
                    {unreadCount}
                  </span>
               )}

           </button>
           {notificationOpen && (
            <div className={`fixed right-20 top-16 mt-2 w-72 shadow-lg rounded-lg overflow-hidden border 
                 ${darkMode ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className= {`flex items-center justify-between p-4 border-b ${darkMode ? "border-gray-700": "border-gray-200"}`} >
                <div className="flex items-center">
                  <Bell size={18} className="mr-2"/>
                  <h4 className={`text-sm font-semibold ${darkMode ? "text-gray-200": "text-gray-800"}`}> 
                    Notifications
                  </h4>
                </div>
                <button 
                   onClick={clearAll}
                   className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                    Clear All
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className={`p-4 text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}> 
                    No notifications
                  </p>
                ):(
                  notifications.map(notification => (
                    <div key={notification.id}
                         className={`p-3 border-b flex justify-between items-start ${!notification.read ? darkMode ? "bg-zinc-700" : "bg-blue-50" : ""} 
                         ${darkMode ? "border-gray-700 hover:bg-zinc-700" : "border-gray-200 hover:bg-gray-50"}`}>
                        <div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className={`h-2 w-2 rounded-full ${darkMode ? "bg-blue-400" : "bg-blue-500"}`}/>
                            )}
                            <p className="font-medium">{notification.title}</p>
                          </div>
                          <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <button onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                              aria-label="Mark as read">
                                <Check className="h-4 w-4 text-green dark:text-green-400"/>
                              </button>
                        )}
                       </div>
                  ))

                )}               
              </div>
            </div>
           )}
          </div>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            className= {`p-2 rounded-full fixed top-2.5 mt-1 right-4 cursor-pointer ${darkMode ? "bg-zinc-700 hover:bg-zinc-600" : "bg-purple-900 hover:bg-purple-800"}`}
            onClick={() =>setIsProfileOpen(!isProfileOpen)} >
            <UserRound className="text-white" size={18} />
          </button>


          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className={`fixed right-8 top-20 mt-2 w-72 shadow-lg rounded-lg overflow-hidden border ${
              darkMode ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <div className=" flex items-center p-4">
                <img
                  src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                  alt="Profile"
                  className="rounded-full w-12 h-15 object-cover mr-4"/>
              <div>
                <h3 className={`font-semibold text-base ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}>Kalkidan Yeshitla</h3>
                <p className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>kalyeshi1@gmail.com</p>
              </div>
            </div>
              <div className={`p-2 border-t ${
                darkMode ? "border-gray-700" : "border-gray-100"
              }`}>
                <button 
                  className={`flex w-full items-center justify-between px-4 py-2 rounded ${
                    darkMode ? "text-gray-200 hover:bg-zinc-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setShowManageOptions(!showManageOptions)}
                >
                  <div className="flex items-center">
                   <Settings size={18} className="mr-2" /> Manage Account      
                   </div>
                  <ChevronRight size={18} className={`transition-all duration-200 ease-in-out ${showManageOptions ? 'rotate-90': 'rotate-0'}`} />
                </button>
                {showManageOptions && (
                  <div className="ml-8 mt-1 mb-2 space-y-1">
                    <button 
                         onClick={()=> {
                             setIsProfileOpen(false);
                             navigate("/profile/edit-profile");
                            }}
                            className={`flex w-full items-center px-4 py-2 text-sm rounded ${
                              darkMode ? "text-gray-200 hover:bg-zinc-700" : "text-gray-700 hover:bg-gray-100"
                            }`}>
                         <User size={16} className="mr-2"/> Edit Profile
                    </button>
                    <button 
                         onClick={()=> {
                            setIsProfileOpen(false);
                            navigate("/profile/change-password")}}
                         className={`flex w-full items-center px-4 py-2 text-sm rounded ${
                          darkMode ? "text-gray-200 hover:bg-zinc-700" : "text-gray-700 hover:bg-gray-100"
                        }`}>
                         <Lock size={16} className="mr-2"/> Change Password
                    </button>
                  </div>
                )}
                <button className={`flex w-full items-center px-4 py-2 rounded ${
                    darkMode ? "text-gray-200 hover:bg-zinc-700" : "text-gray-700 hover:bg-gray-100"
                  }`}>
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
