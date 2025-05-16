import {  AnimatePresence, motion } from "framer-motion";
import { ClipboardList, Columns3, Home, SquareDashedKanban, UsersRound, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

import {  useLocation , Link} from "react-router-dom";

type SidebarProps ={
  isOpen:boolean;
  onClose?:()=> void;
  darkMode:boolean;
}
  


const SIDEBAR_ITEMS=[
    {name: "Home", icon:Home ,href:"/home"},   
    {name: "Projects", icon:SquareDashedKanban, href:"/projects"},
    {name: "Tasks", icon:Columns3, href:"/tasks"},    
    {name: "Team", icon:UsersRound, href:"/team"},
    {name: "Reports", icon:ClipboardList, href:"/report"},
    {name: "All Work", icon:Wallet, href:"/all-work"},
    
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
          exit={{opacity:   0}}
          className={`fixed inset-0 z-40 md:hidden ${ darkMode ? 'bg-zinc-600 bg-opacity-70' : 'bg-gray-300 bg-opacity-50'}`}
          onClick={onClose}/>
      )}
     </AnimatePresence>
        
    
     <motion.aside className={`fixed md:relative z-50 h-screen overflow-hidden ${darkMode ? 'bg-zinc-800 bg-opacity-90 border-r border-gray-700' 
            : 'bg-white bg-opacity-50 border-r border-gray-100'} ${isMobile ? (isOpen ? "w-64" : "w-0") : ""}`}
        animate={{width: isMobile ? (isOpen ? 150:0) : isOpen ? 150:75,}}
        transition={{ duration: 0.2}}
        >
          

        <div className={`h-full mt-24 p-4 flex flex-col bg-opacity-50 backdrop-blur-md ${darkMode ? '' : 'border-gray-100'}`}>
          <nav className="mt-14 flex-col space-y-2">

            <div className={`flex items-center fixed top-3 left-1 border-b-8 ${darkMode ? "border-gray-700": "border-gray-300"} `}> 
              <h2 className={`text-lg font-semibold  whitespace-nowrap origin-left ${darkMode ? "text-gray-200": "text-gray-800"}`}>PM-Tool</h2>
            </div>
              {SIDEBAR_ITEMS.map((item)=>{
                const isActive= location.pathname === item.href;
                const Icon=item.icon
                return(
                 <>
                  
                  <Link key={item.href} to={item.href} onClick={() => isMobile && onClose?.()}  className="block">
                    <motion.div className={`flex items-center mt-4 p-3 text-sm font-medium rounded-lg transition-colors mb-2  ${ isActive 
                        ? 'bg-purple-900 text-white'
                        : darkMode ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-purple-200 text-gray-700'}`}> 
                      <Icon size={20} className={isActive  ? "text-white": darkMode ?  "text-gray-300": "text-gray-700"} />
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
                 </>
                );
              })}
            </nav>
        </div>   
    </motion.aside> 
  </>

  );
};

export default Sidebar;