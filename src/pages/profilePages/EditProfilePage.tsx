import { useNavigate} from "react-router-dom";
import { ArrowLeft, Camera, Mail, Minus, Phone, Plus, User} from "lucide-react";
import {useState, useRef, useEffect} from "react";


const EditProfilePage = ({darkMode}: {darkMode:boolean}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); 
  const [profileData, setProfileData] = useState({
    image: 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg',
    name: 'Kalkidan Yeshitla',
    primaryEmail: 'kalyeshi1@gmail.com',
    primaryPhone: '+251 923 202 495',
    additionalEmails: [] as string[],
    additionalPhones: [] as string[],
  }); 
  const [newEmail, setNewEmail]= useState('');
  const [newPhone, setNewPhone]= useState('');
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file){
      const reader = new FileReader();
      reader.onload=()=> {
        if(typeof reader.result === 'string'){
          setProfileData({...profileData, image: reader.result});
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const addContact = (type:'email' | 'phone')=> {
    const value = type==='email' ? newEmail : newPhone;
    if (!value) return;
    const field = type ==='email' ? 'additionalEmails' : 'additionalPhones';

    if(!profileData[field].includes(value)) {
      setProfileData({
        ...profileData, [field]: [...profileData[field], value]
      });
      type === 'email' ? setNewEmail(''): setNewPhone('');
    }
  };

  const removeContact = (type: 'email' | 'phone', index:number)=>{
    const field = type==='email' ? 'additionalEmails' : 'additionalPhones';
    setProfileData({...profileData, [field]: profileData[field].filter((_, i) => i !== index)
    });
  };
  const handleSubmit =(e: React.FormEvent)=> {
    e.preventDefault();
    console.log('Saved data:', profileData);
    alert('Profile updated successfully!');
    navigate(-1);
  };

  



  return(

    <div className={`max-w mx-auto mt-16 p-6 rounded-lg min-h-screen overflow-auto scroll-smooth ${darkMode ? 'bg-zinc-800 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button
         onClick={() => navigate(-1)}
         className={`flex items-center gap-2 mb-6 transition-colors ${darkMode ? 'text-purple-300 hover:text-purple-300' : 'text-purple-600 hover:text-purple-400' }`}>
         <ArrowLeft size={20} /> 
      </button>

      <div className={`max-w mx-auto p-6 rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-zinc-700' : 'bg-white'}`}> 
        {/* profile header */}
        <div className={`p-6 flex flex-col rounded-2xl md:flex-row items-center ${darkMode ? 'bg-gradient-to-r from-purple-500 to- ' 
            : 'bg-gradient-to-r from-purple-50 to-blue-50'}`}> 
          <div className='relative group mb-4 md:mb-0 md:mr-6'>
            <img 
               src={profileData.image}
               alt='Profile'
               className='w-24 h-24 md;w-32 md:h-32 rounded-full object-cover border-white shadow-lg'/>
               <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`absolute bottom-0 right-0 p-2 rounded-full transition-opacity duration-300 ${darkMode ? 'bg-zinc-500 text-white' : 'bg-gray-600 text-white'}`}>
                    <Camera size={18} />
               </button>
               <input type='file' ref={fileInputRef} onChange={handleImageUpload} accept='image/*' className='hidden'/>
           </div>
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Edit Your Profile</h1>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Update your personal information</p>
          </div>
       </div>
       
        <form onSubmit={handleSubmit} className="p-6 space-y-6 relative pb-20">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name</label>
            <div className={`flex items-center rounded-lg overflow-hidden ${darkMode ? 'bg-zinc-600 border-gray-500' : 'border'}`}>
              <span className={`px-4 py-2 ${darkMode ? 'bg-zinc-500 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                <User size={18}/>
              </span>
              <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData,name:e.target.value})} 
                    className={`flex-1 px-4 py-2 focus:outline-none focus:ring-1 ${darkMode ? 'bg-zinc-600 text-white focus:ring-purple-400' 
                        : 'focus:ring-purple-300'}`}
                required /> 
            </div>
          </div>
          <div className=" grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
             <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Mail size={16} className="mr-2"/> Primary Email
             </label>
             <div className={`flex items-center rounded-lg overflow-hidden ${darkMode ? 'bg-gray-600 border-gray-500' : 'border'}`}>
               <input type="email" value={profileData.primaryEmail} onChange={(e) => setProfileData({...profileData, primaryEmail: e.target.value})} 
                      className={`flex-1 px-4 py-2 focus:outline-none focus:ring-1 ${darkMode ? 'bg-zinc-600 text-white focus:ring-purple-400' 
                        : 'focus:ring-purple-300'}`}
                required />
             </div>
           </div>
           <div className="space-y-2">
             <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Phone size={16} className="mr-2 "/> Primary Phone
             </label>
             <div className={`flex items-center rounded-lg overflow-hidden ${darkMode ? 'bg-gray-600 border-gray-500' : 'border'}`}>
               <input type="tel"  value={profileData.primaryPhone} 
                onChange={(e) => setProfileData({...profileData, primaryPhone: e.target.value})} 
                className={`flex-1 px-4 py-2 focus:outline-none focus:ring-1 ${darkMode ? 'bg-zinc-600 text-white focus:ring-purple-400' 
                    : 'focus:ring-purple-300'}`}
                required />
             </div>
          </div>
         </div>

         <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Additional Emails
            </label>
            <div className="flex mb-2">
               <input 
                 type="email" 
                 value={newEmail} 
                 onChange={(e)=> setNewEmail(e.target.value)} 
                 className={`flex-1 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 ${darkMode ? 'bg-zinc-600 text-white border-gray-500 focus:ring-purple-600' 
                    : 'border focus:ring-purple-900'}`}
                />
                <button
                 type="button"
                 onClick={() => addContact('email')}
                 className={`px-3 rounded-r-lg transition-colors ${darkMode ? 'bg-purple-900 text-white hover:bg-purple-800' 
                    : 'bg-purple-900 text-white hover:bg-purple-800'}`}>
                  <Plus size={14} />
                 </button>
            </div>
            <ul className="space-y-2">
              {profileData.additionalEmails.map((email, index)=>(
                <li key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-zinc-600' : 'bg-gray-50'}`} > 
                  <span className="text-sm">{email}</span>
                  <button
                    type="button"
                    onClick={()=> removeContact('email', index)}
                    className={`p-1 rounded-full ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}>
                      <Minus size={14}/>
                    </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Additional Phones
            </label>
            <div className="flex mb-2">
               <input 
                 type="tel" 
                 value={newPhone} 
                 onChange={(e)=> setNewPhone(e.target.value)} 
                 className={`flex-1 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 ${darkMode ? 'bg-zinc-600 text-white border-gray-500 focus:ring-purple-600' 
                    : 'border focus:ring-purple-900'}`}
                />
                <button
                 type="button"
                 onClick={() => addContact('phone')}
                 className={`px-3 rounded-r-lg transition-colors ${darkMode ? 'bg-purple-900 text-white hover:bg-purple-800' 
                    : 'bg-purple-900 text-white hover:bg-purple-800'}`}>
                  <Plus size={14} />
                 </button>
            </div>
            <ul className="space-y-2">
              {profileData.additionalPhones.map((phone, index)=>(
                <li key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-zinc-600' : 'bg-gray-50'}`} > 
                  <span className="text-sm">{phone}</span>
                  <button
                    type="button"
                    onClick={()=> removeContact('phone', index)}
                    className={`p-1 rounded-full ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}>
                      <Minus size={14}/>
                    </button>
                </li>
              ))}
            </ul>
          </div>
         </div>
         
          <div className="flex justify-end space-x-4 ">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-4 py-2 rounded-lg transition-colors ${darkMode  ? 'bg-zinc-600 border-gray-500 text-gray-300 hover:bg-zinc-500' 
                  : 'border text-gray-700 hover:bg-gray-300'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg transition-colors ${darkMode ? 'bg-purple-900 text-white hover:bg-purple-900' 
                  : 'bg-purple-900 text-white hover:bg-purple-800'}`}
            >
              Save Changes
            </button>
          </div>  
         
        </form>
       </div>
      
    </div>
  );
}

export default EditProfilePage;