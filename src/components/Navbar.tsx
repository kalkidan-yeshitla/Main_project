import { useState, useRef, useEffect } from "react";
import {  LogOut, Settings, ChevronRight, User, Lock, UserRound, Bell, Menu, Search, Sun, Moon } from "lucide-react";
import { useNavigate  } from "react-router-dom";
import { motion } from "framer-motion";


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
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  
  

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
             className={`p-2 rounded-full fixed top-2.5 right-28 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-purple-200"} `} 
             onClick={()=> setDarkMode(!darkMode)}>
              {darkMode ?(
                <Sun  size={20}/>
              ) : (
                <Moon className="text-purple-900" size={20}/>
              )}
              
          </button>

          {/* Notification button*/}
          <div>
           <button 
             className={`p-2 rounded-full fixed top-2.5 right-16 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-purple-200"} `}
             onClick={()=>{
              setNotificationOpen(!notificationOpen);
              navigate("/notification");
             }}>
              <Bell className={darkMode ? "text-gray-300":"text-purple-900"} size={20}/>

           </button>
           {notificationOpen && (
            <div className={`fixed right-20 top-16 mt-2 w-72 shadow-lg rounded-lg overflow-hidden border 
                 ${darkMode ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className= {`flex items-center p-4 border-b ${darkMode ? "border-gray-700": "border-gray-200"}`} >
                <Bell size={18} className="mr-2"/>
                <h4 className={`text-sm font-semibold ${darkMode ? "text-gray-200": "text-gray-800"}`}> Notifications</h4>

              </div>
              <div className="p-2 space-y-2 max-h-60 overflow-y-auto">
                
                <p className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}> No new notifications</p>
              </div>

            </div>
           )}
          </div>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            className= {`p-2 rounded-full fixed top-2.5 right-4 cursor-pointer ${darkMode ? "bg-zinc-700 hover:bg-zinc-600" : "bg-purple-900 hover:bg-purple-800"}`}
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              navigate("/profile");
            }}
          >
            <UserRound className="text-white" size={22} />
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
