import { useState, useRef, useEffect } from "react";
import { UserCircle, LogOut, Settings, ChevronRight, User, Lock } from "lucide-react";
import { useNavigate  } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [ showManageOptions, setShowManageOptions]= useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  
  

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowManageOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white fixed top-0 left-0 w-full h-20 flex items-center px-6 bg-opacity-50 backdrop-blur-md shadow-md z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-black p-2 rounded-full fixed top-2 right-4 cursor-pointer hover:bg-purple-300"
            onClick={() => {
              setIsOpen(!isOpen);
              navigate("/profile");
            }}
          >
            <UserCircle className="text-purple-500" size={30} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className=" fixed right-8 top-20 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className=" flex items-center p-4">
                <img
                  src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                  alt="Profile"
                  className="rounded-full w-12 h-15 object-cover mr-4"/>
              <div>
                <h3 className="font-semibold text-gray-800 text-base">Kalkidan Yeshitla</h3>
                <p className="text-sm text-gray-600">kalyeshi1@gmail.com</p>
              </div>
            </div>
              <div className="p-2 border-t border-gray-100">
                <button 
                  className="flex w-full items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100"
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
                             setIsOpen(false);
                             navigate("/profile/edit-profile");
                            }}
                         className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                         <User size={16} className="mr-2"/> Edit Profile
                    </button>
                    <button 
                         onClick={()=> {
                            setIsOpen(false);
                            navigate("/profile/change-password")}}
                         className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                         <Lock size={16} className="mr-2"/> Change Password
                    </button>
                  </div>
                )}
                <button className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
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
