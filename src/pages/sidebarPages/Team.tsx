import { useState } from "react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' ;
  unread?: number;
  isManager?: boolean;
};
 
type Message ={
  id:number;
  sender: string;
  senderId: number;
  text: string;
  timestamp: string;
  isSupervisor?: boolean;

};



const mockConversations = {
  team: [
    {id:1, sender:"Kalkidan", senderId: 70801, text:"Finished the sidebar layout", timestamp: "9:40 AM"},
    {id:2, sender:"Mahlet", senderId: 70858, text:"Need assistant on communication page", timestamp: "9:54 AM"},
    {id:3, sender:"Dehine", senderId: 70749, text:"Finished the login session", timestamp: "10:30 AM"},
    {id:4, sender:"You", senderId: 70802, text:"Great work! keep up, I will review it.", timestamp: "11:00 AM", isSupervisor: true},
  ],
  70801: [
    {id:1, sender:"Kalkidan", senderId: 70801, text:"Hi supervisor, I've completed the sidebar", timestamp: "9:40 AM"},
    {id:2, sender:"You", senderId: 70802, text:"Great job! Any issues?", timestamp: "9:45 AM", isSupervisor: true},
    {id:3, sender:"Kalkidan", senderId: 70801, text:"Just some minor alignment tweaks needed", timestamp: "9:50 AM"},
  ],
  70858: [
    {id:1, sender:"Mahlet", senderId: 70858, text:"Hello, need help with the communication page", timestamp: "9:54 AM"},
    {id:2, sender:"You", senderId: 70802, text:"What specific help do you need?", timestamp: "10:00 AM", isSupervisor: true},
  ],
  70749: [
    {id:1, sender:"Dehine", senderId: 70749, text:"Login session is now secure", timestamp: "10:30 AM"},
    {id:2, sender:"You", senderId: 70802, text:"Excellent! Tested on all browsers?", timestamp: "10:35 AM", isSupervisor: true},
    {id:3, sender:"Dehine", senderId: 70749, text:"Yes, all major browsers supported", timestamp: "10:50 AM"},
  ],
  70701: [
    {id: 1, sender: "Genet", senderId: 70701, text:"How is the project going?", timestamp:"1:15 AM"},
    {id: 2, sender: "You", senderId: 70802, text:"it will be completed in two days", timestamp:"1:18 AM", isSupervisor: true},
  ]
};


const Team = ({darkMode}:{darkMode:boolean}) => {

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {id: 70801, name: "Kalkidan", role:"Frontend Developer", status: "online", unread: 2 },
    {id: 70858, name: "Mahlet", role:"Frontend Developer", status: "online", unread: 1 },
    {id: 70749, name:"Dehine", role:"Backend Developer", status: "offline", },  
    {id: 70701, name:"Genet", role:"Manager", status: "offline", isManager:true},     
  ]);

  const [messages, setMessages] = useState<Message[]> ([
    {id:1, sender:"Kalkidan", senderId: 70801, text:"Finished the sidebar layoout", timestamp: "9:40 AM"},
    {id:2, sender:"Mahlet", senderId: 70858, text:"Need assistant on communication page", timestamp: "9:54 AM"},
    {id:3, sender:"Dehine", senderId: 70749, text:"Finished the login session", timestamp: "10:30 AM"},
    {id:4, sender:"You", senderId: 70802, text:"Great work! keep up, I will review it. ", timestamp: "11:00 AM", isSupervisor: true},
  ]);



  const [newMessage, setNewMessage]= useState('');
  const [activeChat, setActiveChat]= useState<{
    type: 'team' |  'manager'| 'member';
    memberId?: number;
  }>({type: 'team'});

  const getCurrentMessages = () => {
    if (activeChat.type === 'manager') return mockConversations[70701];
    if (activeChat.type === 'member' && activeChat.memberId){
       return  mockConversations[activeChat.memberId as keyof typeof mockConversations] || [] ;
    }
    return mockConversations.team;
   };


  const handleSendMessage = () =>{
    if(!newMessage.trim()) return;
    const newMsg: Message={
      id: messages.length + 1,
      sender: "You",
      senderId: 70802,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour:'2-digit',minute:'2-digit'}),
      isSupervisor: true,
    };

    if (activeChat.type === 'manager') {
      mockConversations[70701].push(newMsg);   
    } 
    else if (activeChat.type === 'member' && activeChat.memberId) {
      mockConversations[activeChat.memberId as keyof typeof mockConversations].push(newMsg);     
    }
    else {
      mockConversations.team.push(newMsg);
    }

    setNewMessage('');

  };

  const handleMemberClick =(memberId: number) => {
    const isManager = memberId === 70701;
    setActiveChat({
      type: isManager ? 'manager' : 'member',
      memberId: isManager ? undefined : memberId
    });
     
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? {...member,unread: 0}: member
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 overflow-y-auto`}>
     <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">

      
      <div className={`w-full md:w-1/3 rounded-lg shadow-md p-4 ${darkMode ? "bg-zinc-700 text-gray-300": " bg-gray-100 text-gray-700"} overflow-y-auto`}>
       <h2 className="text-xl font-bold mb-4">Contacts</h2>

       <div className="mb-6 mt-10">
          <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider"> Management</h3>
          {teamMembers.filter(m => m.isManager).map(member => (
           <div  onClick={()=>handleMemberClick(70701)}
               className={`flex items-center p-3 rounded-lg cursor-pointer ${activeChat.type === 'manager' ? darkMode ? "bg-gray-500": "bg-gray-300" 
                : darkMode ? "hover:bg-zinc-600" : "hover:bg-gray-200" }`}>
            <div className="relative">
                 <div className={`w-10 h-10 rounded-full  flex items-center justify-center ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
                   {member.name.charAt(0)}
                 </div>
                 <div className={`absolute bottom-0 right-0 w-3 h-3  rounded-full border-2 ${darkMode ? " border-gray-500" : "border-gray-300"} 
                     ${member.status === 'online' ? 'bg-green-500': 'bg-gray-400'}`}/>
                </div>
                
            <div className="ml-3">
                  <p className="font-medium">{member.name}</p>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Project Manager
                  </p>
            </div>
          </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider">Team Members</h3>
          <span className="text-sm opacity-75">
            {teamMembers.filter(m => m.status=== 'online').length} online
          </span>

          {teamMembers.filter(m => !m.isManager).map(member => (
            <div key={member.id}
                 onClick={() => handleMemberClick(member.id)}
                 className={`flex items-center p-3 rounded-lg cursor-pointer mb-2${activeChat.type==='member' && activeChat.memberId === member.id 
                   ? darkMode ? "bg-purple-400" : "bg-purple-300" : darkMode ? "hover:bg-zinc-600" : "hover:bg-gray-200"}`}>
               <div className="relative">
                 <div className={`w-10 h-10 rounded-full  flex items-center justify-center ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
                   {member.name.charAt(0)}
                 </div>
                 <div className={`absolute bottom-0 right-0 w-3 h-3  rounded-full border-2 ${darkMode ? " border-gray-500" : "border-gray-300"} 
                     ${member.status === 'online' ? 'bg-green-500': 'bg-gray-400'}`}/>
                </div> 
                 <div className="ml-3 flex-1 ">
                   <p className={`font-semibold ${darkMode ? "text-gray-200": " text-gray-700"}`}>{member.name}</p>
                   <p className={`text-sm ${darkMode ? "text-gray-300": " text-gray-600"}`}>{member.role}</p>
                 </div>
                 {(member.unread &&  member.unread > 0 && !(activeChat.type === 'manager' && activeChat.memberId === member.id))? (
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-400 text-white" : " bg-blue-100 text-blue-800"}`}>
                    {member.unread}
                  </span>
                 ): null}
            </div>
          ))}
        </div>

        
      </div>
         
        <div className={`w-full md:w-2/3  rounded-lg shadow-md p-4 flex flex-col ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          style={{height: 'calc(100vh - 32px'}}>
          {teamMembers.filter(m => m.isManager).map(member => (
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-xl font-bold">
                {activeChat.type === 'manager' ?(
                  <div className="flex items-center">
                    
                    <span>{member.name}</span>
                  </div>
                ) : activeChat.type === 'member' ? (
                  
                   ` ${teamMembers.find(m => m.id === activeChat.memberId)?.name || 'Member'}`
                ) : ('Team Chat')
                }
              </h2>
              {activeChat.type !== 'team' && (
                <button
                  onClick={() => setActiveChat({type: 'team'})}
                  className={`text-sm px-3 py-1 rounded ${
                    darkMode ? "bg-gray-500 hover:bg-gray-500 text-gray-900" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  ← Back to Team Chat
                </button>
              )}
            </div>
          ))}

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 ">
          {getCurrentMessages().map((message)=> (
            <div  key={message.id}
                className={`flex ${message.isSupervisor ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.isSupervisor ? darkMode ? " bg-blue-600 text-white" : "bg-blue-500 text-white" : 
                   darkMode ? "bg-gray-700 text-gray-100": "bg-gray-200 text-gray-700"}`}>
                    {!message.isSupervisor && (
                      <p className="font-semibold"> {message.sender}</p>
                    )}
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isSupervisor ? "text-blue-200" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
              </div>  
            </div>
          ))} 
        </div>

       <div className="sticky bottom-0 mb-16 bg-inherit pt-4"> 
        <div className="flex gap-2">
          <input  type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder="Type a message..."
               className={`flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${darkMode ? "bg-zinc-700 border-gray-600 focus:ring-blue-500 placeholder-gray-400" 
                    : "bg-gray-100 border-gray-300 focus:ring-blue-500 placeholder-gray-500"}`}
               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <button  onClick={handleSendMessage}
                 className={`px-4 py-2 rounded-lg transition ${darkMode ? " bg-blue-600 hover:bg-blue-700 text-white" 
                     : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                      Send
          </button>
        </div>
       </div>
      </div>     
    </div>
   </div>
   </div>
  
 
  
  );
};

export default Team;