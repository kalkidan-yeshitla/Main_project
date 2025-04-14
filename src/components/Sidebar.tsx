import {  AnimatePresence, motion } from "framer-motion";
import { FolderOpen, Home,   Package, Settings, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import {  useLocation , Link} from "react-router-dom";

type SidebarProps ={
  isOpen:boolean;
  onClose?:()=> void;
  darkMode:boolean;
}
  


const SIDEBAR_ITEMS=[
    {name: "Home", icon:Home  ,href:"/home"},
    {name: "Recent", icon:FolderOpen, href:"/recent"},
    {name: "Boards", icon:Package, href:"/boards"},
    {name: "Members", icon:UsersRound, href:"/members"},
    {name: "Settings", icon:Settings, href:"/settings"},
];



const Sidebar = ({isOpen, onClose, darkMode}: SidebarProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile]= useState(false);


  useEffect(()=> {
    const handleResize = () =>{
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize);
  },[]);

    
  return (
    <>
     <AnimatePresence>
      {isMobile && isOpen && (
        <motion.div
          initial={{opacity:0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className={`fixed inset-0 z-40 md:hidden ${ darkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}
          onClick={onClose}/>
      )}
     </AnimatePresence>
    
     <motion.aside className={`fixed md:relative z-50 h-screen overflow-hidden ${darkMode ? 'bg-zinc-800 bg-opacity-90 border-r border-gray-700' 
            : 'bg-white bg-opacity-50 border-r border-gray-100'} ${isMobile ? (isOpen ? "w-64" : "w-0") : ""}`}
        animate={{width: isMobile ? (isOpen ? 180:0) : isOpen ? 180:80,}}
        transition={{ duration: 0.2}}
        >
        <div className={`h-full mt-16 p-4 flex flex-col bg-opacity-50 backdrop-blur-md ${darkMode ? '' : 'border-gray-100'}`}>
            <nav className="mt-8 flex-col space-y-2">
              {SIDEBAR_ITEMS.map((item)=>{
                const isActive= location.pathname === item.href;
                const Icon=item.icon
                return(
                  <Link key={item.href} to={item.href} onClick={() => isMobile && onClose?.()}  className="block">
                    <motion.div className={`flex items-center p-2 text-sm font-medium rounded-lg transition-colors mb-2 ${ isActive 
                        ? darkMode ? 'bg-purple-900 text-white' : 'bg-purple-900 text-white'
                        : darkMode ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-purple-200 text-gray-700'}`}> 
                      <Icon size={20} className={isActive  ? "text-white": darkMode ? "text-gray-300": "text-gray-700"} />
                      <AnimatePresence>
                        {isOpen  && (
                          <motion.span
                            className=" ml-4 whitespace-nowrap origin-left"
                            initial={{opacity:0, x: -10}}
                            animate={{opacity:1, x:0}}
                            exit={{opacity:0, x:-10}}
                            transition={{duration:0.15}}>

                             {item.name}

                          </motion.span>

                        )}
                      </AnimatePresence>
                     
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
        </div>   
    </motion.aside> 
  </>

  );
};

export default Sidebar;